# import psycopg2
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from Global import *
from datetime import datetime, timezone

class Database:
    def __init__(self, dbname, user, password, host, port):
        connectionString = f"dbname={dbname} user={user} password={password} host={host} port={port}"
        DATABASE_URL = f"postgresql+psycopg2://{user}:{password}@{host}:{port}/{dbname}"
        engine = create_engine(DATABASE_URL)
        # self.db = psycopg2.connect(connectionString)
        # self.cur = self.db.cursor()
        Session = sessionmaker(bind=engine)
        self.session = Session()
        self.db = self.session

        # profile = Profile(RelationshipStatus='married', Occupation='student', Hobbies='sports', UserID='12')
        # session.add(profile)

        # user = User(FirstName='Mark', LastName='Rober', Gender='male', Password='1234', Email='rober.mark@gmail.com')
        # session.add(user)

        utc_now = datetime.now(timezone.utc)
        # post = Post(ProfileID=7, Content='Hello world', PostedTime=utc_now)
        # session.add(post)

        # msg_op = MessageOperation(UserID=4, MessageID=13, Role='initator', IsRead='f')
        # session.add(msg_op)

        msg = Message(PostTime=utc_now, Content='<p>Today, it is a good weather</p>')
        self.session.add(msg)

        self.session.commit()


    def __del__(self):
        pass
        self.session.close()
        # self.cur.close()
        # self.db.close()

    def execute(self, query):
        self.session.execute(query)