import psycopg2

class Database:
    def __init__(self, dbname, user, password, host, port):
        connectionString = f"dbname={dbname} user={user} password={password} host={host} port={port}"
        self.db =  psycopg2.connect(connectionString)
        self.cur = self.db.cursor()

    def __del__(self):
        self.cur.close()
        self.db.close()