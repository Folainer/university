from abc import ABC, abstractmethod
from Database import Database
from View import View
import psycopg2
from psycopg2 import OperationalError, IntegrityError, ProgrammingError, DatabaseError
from Argument import Argument
import time
from sqlalchemy import text
import operator
from sqlalchemy.orm import Session
from sqlalchemy import inspect
from sqlalchemy import delete

# global launch_mode

launch_mode = "debug"

from Global import *

operations_map = {
    '>': operator.gt,
    '>=': operator.ge,
    '<': operator.lt,
    '<=': operator.le,
    '==': operator.eq,
    '!=': operator.ne,
}

def table_mapping(tableName):
    if tableName == 'User':
        return User
    elif tableName == 'Post':
        return Post
    elif tableName == 'Message':
        return Message
    elif tableName == 'MessageOperation':
        return MessageOperation
    elif tableName == 'Profile':
        return Profile
    
def field_mapping(tableName, fields):
    res = []
    for field in fields:
        res.append(getattr(tableName, field))

    return res

def printing_preparation(results):
    formatted_results = []
    for result in results:
        row_data = []
        for column_name in result.__dict__:
            if not column_name.startswith('_'):
                row_data.append(getattr(result, column_name))
        formatted_results.append(row_data)
    return formatted_results

# def printing_preparation(results):
#     for user in results:
#         user_data = []
#         for column in user.__dict__:
#             if not column.startswith('_'):
#                 user_data.append(getattr(user, column))
#     return user_data

# def dynamic_insert(session: Session, model):
#     data_dict = dict(zip(field_names, field_values))
    
#     # Validate fields exist in the model
#     model_columns = [c.key for c in inspect(model_class).columns]
#     for field in field_names:
#         if field not in model_columns:
#             raise ValueError(f"Field {field} does not exist in the {model_class.__name__} model")

def is_convertible_to_number(input_str):
    try:
        float(input_str)
        return True
    except ValueError:
        return False

def prepare_model_data(model_class, field_names, field_values):   
    data_dict = {}
    for field, value in zip(field_names, field_values):
        valueS = value.replace("'", "")
        # print(field, value)
        if is_convertible_to_number(valueS):
            data_dict[field] = float(valueS)
        else:
            data_dict[field] = valueS
    
    return data_dict

class CommandFactory:
    @staticmethod
    def createCommand(commandString: str, controller):
        tokens = commandString.lower().lstrip().split()
        commandName = tokens[0]
        res = None
        argString = commandString[len(commandName):len(commandString)]
        
        if commandName == 'tables' or commandName == 't':
            res = databasesCommand(argString, controller.db, controller.view, controller)
        elif commandName == 'help' or commandName == 'h':
            res = helpCommand(argString, controller.db, controller.view, controller)
        elif commandName == 'quit' or commandName == 'q':
            res = quitCommand(argString, controller.db, controller.view, controller)
        elif commandName == 'choose' or commandName == 'c':
            res = chooseCommand(argString, controller.db, controller.view, controller)
        elif commandName == 'select' or commandName == 's':
            res = selectCommand(argString, controller.db, controller.view, controller)
        elif commandName == 'insert' or commandName == 'i':
            res = insertCommand(argString, controller.db, controller.view, controller)
        elif commandName == 'delete' or commandName == 'd':
            res = deleteCommand(argString, controller.db, controller.view, controller)
        elif commandName == 'generatemessage' or commandName == 'gm':
            res = generateMessageCommand(argString, controller.db, controller.view, controller)
        elif commandName == 'generateuser' or commandName == 'gu':
            res = generateUserCommand(argString, controller.db, controller.view, controller)
        elif commandName == 'generatemessageoperation' or commandName == 'gmo':
            res = generateMessageOperationCommand(argString, controller.db, controller.view, controller)
        elif commandName == 'group' or commandName == 'g':
            res = groupCommand(argString, controller.db, controller.view, controller)
        else:
            controller.view.print("The command doesn't exist")
            return None

        return res

class Command(ABC):
    def __init__(self, argString: str, db, view, controller):
        super().__init__()
        self.start_time = time.time()
        self.argString = argString
        self.db = db
        self.view = view
        self.controller = controller
        isOpened = False
        bracketCount = 0
        result = []
        current_word = []

        self.result = []

        try:
            for char in argString:
                if char == '(':
                    bracketCount = bracketCount + 1
                    if bracketCount > 1:
                        current_word.append(char)
                elif char == ')':
                    bracketCount = bracketCount - 1
                    if bracketCount >= 1:
                        current_word.append(char)
                elif char == ' ' and bracketCount == 0:
                    if current_word: 
                        result.append(''.join(current_word))
                        current_word = []
                else:
                    current_word.append(char)


            if current_word:
                result.append(''.join(current_word))

            if bracketCount != 0:
                raise Exception()
            
            self.result = result

        except Exception as e:
            self.view.print("Incorect command syntax")
            
    def execute(self):
        pass

    def executeSQL(self, SQLquery: str):
        try:
            # self.db.cur.execute(SQLquery)
            self.db.execute(text(SQLquery))
        except IntegrityError as e:
            if launch_mode == 'debug':
                self.view.print(f"Integrity error occurred: {e}")
            else:
                self.view.print(f"Integrity error occurred")
            # self.db.db.rollback()
            self.db.rollback()

        except OperationalError as e:
            if launch_mode == 'debug':
                self.view.print(f"Operational error occurred: {e}")
            else:
                self.view.print(f"Operational error occurred")
            # self.db.db.rollback()
            self.db.rollback()

        except ProgrammingError as e:
            if launch_mode == 'debug':
                self.view.print(f"Programming error occurred: {e}")
            else:
                self.view.print(f"Programming error occurred")
            # self.db.db.rollback()
            self.db.rollback()

        except DatabaseError as e:
            if launch_mode == 'debug':
                self.view.print(f"General database error: {e}")
            else:
                self.view.print(f"General database error")
            # self.db.db.rollback()
            self.db.rollback()

    def getExecutionTime(self):
        diff_time = time.time() - self.start_time
        return f" {diff_time * 1000:.3f} ms"


class databasesCommand(Command): 
    def __init__(self, argString: str, db, view, controller):
        super().__init__(argString, db, view, controller)

    def execute(self):
        super().execute()

        try:
            if len(self.argString.strip()) > 0:
                raise Exception()
            
            # self.executeSQL("SELECT * FROM pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')")
            # res = self.executeSQL("SELECT * FROM pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')")
            # res = self.db.cur.fetchall()
            res = self.db.session.execute(text("SELECT * FROM pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')"))
            databases = []

            for row in res:
                databases.append(row[1])

        except Exception as e:
            return "Incorect command syntax"

        return "Available tables in the database: " + ", ".join(databases) + self.getExecutionTime()
        

class helpCommand(Command): 
    def __init__(self, argString: str, db, view, controller):
        super().__init__(argString, db, view, controller)

    def execute(self):
        super().execute()

        try:
            if len(self.argString.strip()) > 0:
                raise Exception()
            
        except Exception as e:
            return "Incorect command syntax"

        return '''Available commands:
tables|t - shows all available tables in a database
help|h - shows all available command in this app
quit|q - quits the app
choose|c <table> - chooses a current table
select|s <(targets)> [(condition)] - retrieves data from a current table(can be used condition)
insert|i <(targets)> <(values)> - inserts one record into a current table
delete|d [(condition)] - deletes all rows or with a specific condition from a current table
generatemessage|gm <number> - generates random row with specified number into Message table
generateuser|gu <number> - generates random row with specified number into User table
generatemessageoperation|gmo <number> <UserID> <MessageID> - generates random row with specified number into MessageOperationTable with specified UserID and MessageID foreign keys
group|g <(targets)> <(gropping rows)> [(condition)] - groups data with a specific columns'''
        
class quitCommand(Command): 
    def __init__(self, argString: str, db, view, controller):
        super().__init__(argString, db, view, controller)

    def execute(self):
        super().execute()

        try:
            if len(self.argString.strip()) > 0:
                raise Exception()
            
        except Exception as e:
            if launch_mode == "debug":
                return e
            return "Incorect command syntax"

        return 'exit'
    

class chooseCommand(Command): 
    def __init__(self, argString: str, db, view, controller):
        super().__init__(argString, db, view, controller)

    def execute(self):
        super().execute()

        try:
            if len(self.result) != 1:
                raise Exception()
            
            # self.executeSQL("SELECT * FROM pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')")
            # res = self.db.cur.fetchall()
            res = self.db.session.execute(text("SELECT * FROM pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')"))
            databases = []

            for row in res:
                databases.append(row[1])

            if self.result[0] not in databases:
                return "This table doesn't exist" + self.getExecutionTime()
            else:
                self.controller.selectedDB = self.result[0]

        except Exception as e:
            if launch_mode == "debug":
                return e
            return "Incorect command syntax" 
        
        return 'Current table has been changed' + self.getExecutionTime()
    
class selectCommand(Command): 
    def __init__(self, argString: str, db, view, controller):
        super().__init__(argString, db, view, controller)

    def execute(self):
        super().execute()

        try:
            if len(self.result) < 1 or len(self.result) > 2:
                raise Exception()

            target1 = Argument(self.view, self.result[0])

            if target1.isSubcommand:
                raise Exception()
            
            if len(self.result) == 1:
                if self.controller.selectedDB == 'unspecified':
                    return "The table is not selected" + self.getExecutionTime()
                

                # self.executeSQL(f'SELECT {target1.getTupleString()} FROM public."{self.controller.selectedDB}"')
                # res = self.db.cur.fetchall() 

                table = table_mapping(self.controller.selectedDB)
                fields = field_mapping(table, target1.getPlainTuple())
                # print(fields)
                res = self.db.session.query(*fields).limit(50).all()

                # getattr()

            if len(self.result) == 2:
                target2 = Argument(self.view, self.result[1])

                if not target2.isSubcommand:
                    raise Exception()
                
                print(target2.subcommand)

                table = table_mapping(self.controller.selectedDB)
                fields = field_mapping(table, target1.getPlainTuple())

                condtion = target2.subcommand.split()

                condtion[0] = condtion[0].replace('"', '')

                res = self.db.session.query(*fields).filter(operations_map[condtion[1]](getattr(table, condtion[0]), condtion[2])).all()

                    # self.executeSQL(f'SELECT {target1.getTupleString()} FROM public."{self.controller.selectedDB}" where {target2.subcommand}')
                    # res = self.db.cur.fetchall() 
                
                # if len(self.result) == 3:
                #     self.executeSQL(f'SELECT {target1.getTupleString()} FROM public."{self.result[2]}" where {target2.subcommand}')
                #     res = self.db.cur.fetchall() 


        except Exception as e:
            if launch_mode == "debug":
                return e
            return "Incorect command syntax"

        return res
    

class insertCommand(Command): 
    def __init__(self, argString: str, db, view, controller):
        super().__init__(argString, db, view, controller)

    def execute(self):
        super().execute()

        try:
            if len(self.result) != 2:
                return "The number of params is wrong"

            target1 = Argument(self.view, self.result[0])
            target2 = Argument(self.view, self.result[1])
            table = table_mapping(self.controller.selectedDB)

            if not target1.isSubcommand or not target2.isSubcommand:
                # raise Exception()
                pass

            target1.proccessTuple('')
            target2.proccessTuple('')
            
            # self.executeSQL(f'INSERT INTO "{self.controller.selectedDB}" ({target1.getTupleString()}) VALUES({target2.getTupleString()})')
            # res = self.db.cur.fetchall()
            fields = target1.getPlainTuple()
            values = target2.getPlainTuple()

            raw_data = prepare_model_data(table, fields, values)
            data = table(**raw_data)
            self.db.session.add(data)
            self.db.session.commit()

            return "Data was added into the table" + self.getExecutionTime()

        except Exception as e:
            if launch_mode == "debug":
                return e
            return "Incorect command syntax"


class deleteCommand(Command): 
    def __init__(self, argString: str, db, view, controller):
        super().__init__(argString, db, view, controller)

    def execute(self):
        super().execute()

        try:
            if len(self.result) == 0:
                # self.executeSQL(f'DELETE FROM "{self.controller.selectedDB}"')
                table = table_mapping(self.controller.selectedDB)
                # results = self.db.session.query(table).all().delete()
                # result = printing_preparation(results)

                deletion = delete(table)
                self.db.session.execute(deletion)
                self.db.session.commit()
                
                return "The table was cleared" + self.getExecutionTime()

            if len(self.result) == 1:
                # table = table_mapping(self.controller.selectedDB)
                # fields = field_mapping(table, target1.getPlainTuple())

                # condtion = target2.subcommand.split()

                # condtion[0] = condtion[0].replace('"', '')

                # res = self.db.session.query(*fields).filter(operations_map[condtion[1]](getattr(table, condtion[0]), condtion[2])).all()

                target = Argument(self.view, self.result[0])
                table = table_mapping(self.controller.selectedDB)
                condtion = target.subcommand.split()
                condtion[0] = condtion[0].replace('"', '')

                deletion = delete(table).where(operations_map[condtion[1]](getattr(table, condtion[0]), condtion[2]))
                self.db.session.execute(deletion)
                self.db.session.commit()

                # self.executeSQL(f'DELETE FROM "{self.controller.selectedDB}" WHERE {target.subcommand}')
                return "The data was deleted" + self.getExecutionTime()

            return "The number of params is wrong"
        
        except Exception as e:
            if launch_mode == "debug":
                return e
            return "Incorect command syntax"
        

class generateMessageCommand(Command): 
    def __init__(self, argString: str, db, view, controller):
        super().__init__(argString, db, view, controller)

    def execute(self):
        super().execute()

        try:
            if len(self.result) == 1:
                res = self.db.session.execute(text("SELECT * FROM pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')"))
                # self.executeSQL("SELECT * FROM pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')")
                # res = self.db.cur.fetchall()
                databases = []

                for row in res:
                    databases.append(row[1])

                if 'User' not in databases:
                    return "User table doesn't exist" + self.getExecutionTime()
                
                count = int(self.result[0])

                self.db.session.execute(text(f'Insert into "Message" ("PostTime", "Content") (SELECT now() + random() * (timestamp \'2014-01-20 20:00:00\' - timestamp \'2014-01-10 10:00:00\') AS "PostTime", substring(md5(random()::text) from 1 for 15) AS "Content" from generate_series(1,{count}))'))
                
                # self.executeSQL(f'Insert into "Message" ("PostTime", "Content") (SELECT now() + random() * (timestamp \'2014-01-20 20:00:00\' - timestamp \'2014-01-10 10:00:00\') AS "PostTime", substring(md5(random()::text) from 1 for 15) AS "Content" from generate_series(1,{count}))')

                return f"It was generetated {self.result[0]} items" + self.getExecutionTime()

            return "The number of params is wrong"
        
        except Exception as e:
            if launch_mode == "debug":
                return e
            return "Incorect command syntax"

class generateUserCommand(Command): 
    def __init__(self, argString: str, db, view, controller):
        super().__init__(argString, db, view, controller)

    def execute(self):
        super().execute()

        try:
            if len(self.result) == 1:
                res = self.db.session.execute(text("SELECT * FROM pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')"))
                # self.executeSQL("SELECT * FROM pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')")
                # res = self.db.cur.fetchall()
                databases = []

                for row in res:
                    databases.append(row[1])

                if 'User' not in databases:
                    return "User table doesn't exist" + self.getExecutionTime()
                
                count = int(self.result[0])

                self.db.session.execute(text(f'insert into "User" ("FirstName", "LastName", "Gender", "Password", "Email", "Location", "ProfileID") (SELECT substring(md5(random()::text) from 1 for 10) AS "FirstName", substring(md5(random()::text) from 1 for 12) AS "LastName", CASE WHEN random() > 0.5 THEN \'male\' ELSE \'female\' END AS "Gender", substring(md5(random()::text) from 1 for 18) as "Password", CONCAT(SUBSTRING(MD5(random()::text) FROM 1 FOR 8), \'@\', \'example.com\') AS "Email", POINT(random()*180 - 90, random()*180 - 90) AS "Location", null as "ProfileID" from generate_series(1,{count}))'))
                # self.executeSQL(f'insert into "User" ("FirstName", "LastName", "Gender", "Password", "Email", "Location", "ProfileID") (SELECT substring(md5(random()::text) from 1 for 10) AS "FirstName", substring(md5(random()::text) from 1 for 12) AS "LastName", CASE WHEN random() > 0.5 THEN \'male\' ELSE \'female\' END AS "Gender", substring(md5(random()::text) from 1 for 18) as "Password", CONCAT(SUBSTRING(MD5(random()::text) FROM 1 FOR 8), \'@\', \'example.com\') AS "Email", POINT(random()*180 - 90, random()*180 - 90) AS "Location", null as "ProfileID" from generate_series(1,{count}))')

                return f"It was generetated {self.result[0]} items" + self.getExecutionTime()

            return "The number of params is wrong"
        
        except Exception as e:
            if launch_mode == "debug":
                return e
            return "Incorect command syntax"
        
class generateMessageOperationCommand(Command): 
    def __init__(self, argString: str, db, view, controller):
        super().__init__(argString, db, view, controller)

    def execute(self):
        super().execute()

        try:
            if len(self.result) == 3:
                res = self.db.session.execute(text("SELECT * FROM pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')"))
                # self.executeSQL("SELECT * FROM pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')")
                # res = self.db.cur.fetchall()
                databases = []

                for row in res:
                    databases.append(row[1])

                if 'User' not in databases:
                    return "User table doesn't exist" + self.getExecutionTime()
                
                count = int(self.result[0])

                userID = int(self.result[1])

                messageID = int(self.result[2])

                self.db.session.execute(text(f'insert into "MessageOperation" ("UserID", "MessageID", "Role", "IsRead") select {userID} as "UserID", {messageID} as "MessageID", CASE WHEN random() > 0.8 THEN \'initiator\' ELSE \'reciever\' END AS "Role", CASE WHEN random() > 0.7 THEN \'t\' ELSE \'f\' END AS "IsRead" from generate_series(1,{count})'))

                # self.executeSQL(f'insert into "MessageOperation" ("UserID", "MessageID", "Role", "IsRead") select {userID} as "UserID", {messageID} as "MessageID", CASE WHEN random() > 0.8 THEN \'initiator\' ELSE \'reciever\' END AS "Role", CASE WHEN random() > 0.7 THEN \'t\' ELSE \'f\' END AS "IsRead" from generate_series(1,{count})')

                return f"It was generetated {self.result[0]} items" + self.getExecutionTime()

            return "The number of params is wrong"
        
        except Exception as e:
            if launch_mode == "debug":
                return e
            return "Incorect command syntax"

class groupCommand(Command): 
    def __init__(self, argString: str, db, view, controller):
        super().__init__(argString, db, view, controller)

    def execute(self):
        super().execute()

        try:
            if len(self.result) <= 1 or len(self.result) > 3:
                raise Exception()

            target1 = Argument(self.view, self.result[0])
            target2 = Argument(self.view, self.result[1])

            if target1.isSubcommand:
                raise Exception()
            
            if self.controller.selectedDB == 'unspecified':
                return "The table is not selected" + self.getExecutionTime()
            
            if len(self.result) == 2:
                
                results = self.db.session.execute(text(f'SELECT {target1.getTupleString()} FROM public."{self.controller.selectedDB}" group by {target2.getTupleString()}'))
                # self.executeSQL(f'SELECT {target1.getTupleString()} FROM public."{self.controller.selectedDB}" group by {target2.getTupleString()}')
                # res = self.db.cur.fetchall() 
                res = []
                for result in results:
                    res.append(result)


            if len(self.result) == 3:
                target3 = Argument(self.view, self.result[2])

                if not target3.isSubcommand:
                    raise Exception()
                
                results = self.db.session.execute(text(f'SELECT {target1.getTupleString()} FROM public."{self.controller.selectedDB}" where {target3.subcommand} group by {target2.getTupleString()}'))
                # self.executeSQL(f'SELECT {target1.getTupleString()} FROM public."{self.controller.selectedDB}" where {target3.subcommand} group by {target2.getTupleString()}')
                # res = self.db.cur.fetchall() 

                res = []
                for result in results:
                    res.append(result)


        except Exception as e:
            if launch_mode == "debug":
                return e
            return "Incorect command syntax"
        
        return res























# (Message) SELECT DATE '2000-01-01' + INTERVAL '1 day' * FLOOR(RANDOM() * 1000) AS "PostTime", substring(md5(random()::text) from 1 for 15) AS "Content" from generate_series(1,20);
# (User) SELECT substring(md5(random()::text) from 1 for 10) AS "FirstName", substring(md5(random()::text) from 1 for 12) AS "LastName", CASE WHEN random() > 0.5 THEN 'male' ELSE 'female' END AS "Gender", substring(md5(random()::text) from 1 for 18) as "Password", CONCAT(SUBSTRING(MD5(random()::text) FROM 1 FOR 8), '@', 'example.com') AS "Email", (random() * 90, random() * 90) AS "Location", 7 as "ProfileID" from generate_series(1,20);
# (MessageOperation) select 4 as "UserID", 11 as "MessageID", CASE WHEN random() > 0.8 THEN 'initiator' ELSE 'reciever' END AS "Role", CASE WHEN random() > 0.7 THEN 't' ELSE 'f' END AS "IsRead" from generate_series(1,20)

#  (Message query) Insert into "Message" ("PostTime", "Content") (SELECT now() + random() * (timestamp '2014-01-20 20:00:00' - timestamp '2014-01-10 10:00:00') AS "PostTime", substring(md5(random()::text) from 1 for 15) AS "Content" from generate_series(1,5));
# (User query) insert into "User" ("FirstName", "LastName", "Gender", "Password", "Email", "Location", "ProfileID") (SELECT substring(md5(random()::text) from 1 for 10) AS "FirstName", substring(md5(random()::text) from 1 for 12) AS "LastName", CASE WHEN random() > 0.5 THEN 'male' ELSE 'female' END AS "Gender", substring(md5(random()::text) from 1 for 18) as "Password", CONCAT(SUBSTRING(MD5(random()::text) FROM 1 FOR 8), '@', 'example.com') AS "Email", POINT(random()*180 - 90, random()*180 - 90) AS "Location", null as "ProfileID" from generate_series(1,2))
# (MessageOpeation queary) insert into "MessageOperation" ("UserID", "MessageID", "Role", "IsRead") select 4 as "UserID", 11 as "MessageID", CASE WHEN random() > 0.8 THEN 'initiator' ELSE 'reciever' END AS "Role", CASE WHEN random() > 0.7 THEN 't' ELSE 'f' END AS "IsRead" from generate_series(1,2)