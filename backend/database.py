from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# 1. The Database URL
# We are using SQLite, which stores the entire database in a single file called 'karigar.db'
# in the current folder. This is perfect for development and hackathons.
SQLALCHEMY_DATABASE_URL = "sqlite:///./karigar.db"

# 2. The Engine
# The engine is responsible for actually talking to the database.
# 'check_same_thread=False' is needed for SQLite to work well with FastAPI.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# 3. The Session Local
# A 'Session' is a temporary workspace for your database. You open a session, make changes 
# (like adding an influencer), and then commit the changes.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 4. The Base
# We will use this 'Base' class in our models.py file. Any model that inherits from this Base
# will automatically be converted into a database table by SQLAlchemy.
Base = declarative_base()

# 5. Dependency
# This is a helper function we will use in our FastAPI endpoints to get a database session.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
