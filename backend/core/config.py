import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "LifeLink API"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./lifelink.db")

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
