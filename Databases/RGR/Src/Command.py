from abc import ABC, abstractmethod
from Database import Database
from View import View
import psycopg2
from psycopg2 import OperationalError, IntegrityError, ProgrammingError, DatabaseError
from Argument import Argument
import time

global launch_mode

from Global import *

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
            self.db.cur.execute(SQLquery)
        except IntegrityError as e:
            if launch_mode == 'debug':
                self.view.print(f"Integrity error occurred: {e}")
            else:
                self.view.print(f"Integrity error occurred")
            self.db.db.rollback()

        except OperationalError as e:
            if launch_mode == 'debug':
                self.view.print(f"Operational error occurred: {e}")
            else:
                self.view.print(f"Operational error occurred")
            self.db.db.rollback()

        except ProgrammingError as e:
            if launch_mode == 'debug':
                self.view.print(f"Programming error occurred: {e}")
            else:
                self.view.print(f"Programming error occurred")
            self.db.db.rollback()

        except DatabaseError as e:
            if launch_mode == 'debug':
                self.view.print(f"General database error: {e}")
            else:
                self.view.print(f"General database error")
            self.db.db.rollback()
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
            
            self.executeSQL("SELECT * FROM pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')")
            res = self.db.cur.fetchall()
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
table|t - shows all available tables in a database
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
            
            self.executeSQL("SELECT * FROM pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')")
            res = self.db.cur.fetchall()
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

                self.executeSQL(f'SELECT {target1.getTupleString()} FROM public."{self.controller.selectedDB}"')
                res = self.db.cur.fetchall() 

            if len(self.result) == 2 or len(self.result) == 3:
                target2 = Argument(self.view, self.result[1])

                if not target2.isSubcommand:
                    raise Exception()
                
                if len(self.result) == 2:
                    # print(target2.subcommand)
                    self.executeSQL(f'SELECT {target1.getTupleString()} FROM public."{self.controller.selectedDB}" where {target2.subcommand}')
                    res = self.db.cur.fetchall() 
                
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

            if not target1.isSubcommand or not target2.isSubcommand:
                # raise Exception()
                pass

            target1.proccessTuple('')
            target2.proccessTuple('')
            
            self.executeSQL(f'INSERT INTO "{self.controller.selectedDB}" ({target1.getTupleString()}) VALUES({target2.getTupleString()})')
            # res = self.db.cur.fetchall()
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
                self.executeSQL(f'DELETE FROM "{self.controller.selectedDB}"')
                return "The table was cleared" + self.getExecutionTime()

            if len(self.result) == 1:
                target = Argument(self.view, self.result[0])
                self.executeSQL(f'DELETE FROM "{self.controller.selectedDB}" WHERE {target.subcommand}')
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
                self.executeSQL("SELECT * FROM pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')")
                res = self.db.cur.fetchall()
                databases = []

                for row in res:
                    databases.append(row[1])

                if 'User' not in databases:
                    return "User table doesn't exist" + self.getExecutionTime()
                
                count = int(self.result[0])

                self.executeSQL(f'Insert into "Message" ("PostTime", "Content") (SELECT now() + random() * (timestamp \'2014-01-20 20:00:00\' - timestamp \'2014-01-10 10:00:00\') AS "PostTime", substring(md5(random()::text) from 1 for 15) AS "Content" from generate_series(1,{count}))')

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
                self.executeSQL("SELECT * FROM pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')")
                res = self.db.cur.fetchall()
                databases = []

                for row in res:
                    databases.append(row[1])

                if 'User' not in databases:
                    return "User table doesn't exist" + self.getExecutionTime()
                
                count = int(self.result[0])

                self.executeSQL(f'insert into "User" ("FirstName", "LastName", "Gender", "Password", "Email", "Location", "ProfileID") (SELECT substring(md5(random()::text) from 1 for 10) AS "FirstName", substring(md5(random()::text) from 1 for 12) AS "LastName", CASE WHEN random() > 0.5 THEN \'male\' ELSE \'female\' END AS "Gender", substring(md5(random()::text) from 1 for 18) as "Password", CONCAT(SUBSTRING(MD5(random()::text) FROM 1 FOR 8), \'@\', \'example.com\') AS "Email", POINT(random()*180 - 90, random()*180 - 90) AS "Location", null as "ProfileID" from generate_series(1,{count}))')

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
                self.executeSQL("SELECT * FROM pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')")
                res = self.db.cur.fetchall()
                databases = []

                for row in res:
                    databases.append(row[1])

                if 'User' not in databases:
                    return "User table doesn't exist" + self.getExecutionTime()
                
                count = int(self.result[0])

                userID = int(self.result[1])

                messageID = int(self.result[2])

                self.executeSQL(f'insert into "MessageOperation" ("UserID", "MessageID", "Role", "IsRead") select {userID} as "UserID", {messageID} as "MessageID", CASE WHEN random() > 0.8 THEN \'initiator\' ELSE \'reciever\' END AS "Role", CASE WHEN random() > 0.7 THEN \'t\' ELSE \'f\' END AS "IsRead" from generate_series(1,{count})')

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
                
                self.executeSQL(f'SELECT {target1.getTupleString()} FROM public."{self.controller.selectedDB}" group by {target2.getTupleString()}')
                res = self.db.cur.fetchall() 

            if len(self.result) == 3:
                target3 = Argument(self.view, self.result[2])

                if not target3.isSubcommand:
                    raise Exception()
                
                self.executeSQL(f'SELECT {target1.getTupleString()} FROM public."{self.controller.selectedDB}" where {target3.subcommand} group by {target2.getTupleString()}')
                res = self.db.cur.fetchall() 

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