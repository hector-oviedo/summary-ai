import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # OpenAI API key for ChatOpenAI
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
    # NewsAPI API key
    NEWS_API_KEY = os.getenv("NEWS_API_KEY", "")
    # Base URL for NewsAPI
    NEWS_API_BASE_URL = "https://newsapi.org/v2"
    # Debug mode flag
    DEBUG = "true"
