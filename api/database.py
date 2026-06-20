import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

import shutil

# Use /tmp on Vercel because the rest of the filesystem is read-only
# If we're not on Vercel, use the absolute path to api/karigar.db
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if os.environ.get("VERCEL"):
    source_db = os.path.join(BASE_DIR, 'karigar.db')
    target_db = '/tmp/karigar.db'
    # Copy pre-populated DB to /tmp if it doesn't exist yet
    if not os.path.exists(target_db) and os.path.exists(source_db):
        shutil.copyfile(source_db, target_db)
    db_path = "sqlite:////tmp/karigar.db"
else:
    db_path = f"sqlite:///{os.path.join(BASE_DIR, 'karigar.db')}"

engine = create_engine(
    db_path, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
