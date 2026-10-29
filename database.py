
import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")

if not MONGODB_URI:
    raise ValueError("MONGODB_URI is missing. Check your .env file.")

client = MongoClient(
    MONGODB_URI,
    serverSelectionTimeoutMS=10000
)

db = client["credora"]
predictions_collection = db["predictions"]


def test_database_connection():
    client.admin.command("ping")
    print("MongoDB connected successfully!")
    print("Database:", db.name)
