from sqlalchemy.orm import declarative_base, relationship, mapped_column
from sqlalchemy import Column, Integer, String, Text, CHAR, create_engine, ForeignKey, DateTime
# from sqlalchemy.dialects.postgresql import POINT
from geoalchemy2 import Geometry

Base = declarative_base()

class User(Base):
    __tablename__ = 'User'
    UserID = Column(Integer, primary_key=True)
    FirstName = Column(String, nullable=False)
    LastName = Column(String, nullable=False)
    Gender = Column(String, nullable=False)
    Password = Column(String, nullable=False)
    Email = Column(String, nullable=False)
    Location = Column(String, nullable=True)
    ProfilePicture = Column(Text, nullable=True)
    ProfileID = Column(
        Integer,
        ForeignKey('Profile.ProfileID', use_alter=True),
        nullable=True
    )

    # Profile = relationship(
    #     'Profile',
    #     uselist=False,
    #     back_populates='profile'
    # )

class Profile(Base):
    __tablename__ = 'Profile'
    ProfileID = Column(Integer, primary_key=True)
    RelationshipStatus = Column(String, nullable=True)
    Occupation = Column(String, nullable=True)
    Hobbies = Column(String, nullable=True)
    UserID = Column(
        Integer,
        ForeignKey('User.UserID', use_alter=True),
        nullable=False,
    )

    # User = relationship(
    #     "User",
    #     uselist=False,
    #     back_populates='user'
    # )

class Post(Base):
    __tablename__ =  'Post'
    PostID = Column(Integer, primary_key=True)
    ProfileID = Column(
        Integer,
        ForeignKey('Profile.ProfileID'),
        nullable=False
    )
    Content = Column(Text, nullable=False)
    PostedTime = Column(DateTime(timezone=True), nullable=False)

class MessageOperation(Base):
    __tablename__ = 'MessageOperation'
    MessageOperationID = Column(Integer, primary_key=True)
    UserID = Column(
        Integer,
        ForeignKey('User.UserID'),
        nullable=False
    )
    MessageID = Column(
        Integer,
        ForeignKey('Message.MessageID'),
        nullable=False
    )
    Role = Column(String, nullable=False)
    IsRead = Column(CHAR, nullable=False)

class Message(Base):
    __tablename__ = 'Message'
    MessageID = Column(Integer, primary_key=True)
    PostTime = Column(DateTime(timezone=True), nullable=False)
    Content = Column(Text, nullable=False)
    

# launch_mode : str = 'release'
launch_mode : str = 'debug'