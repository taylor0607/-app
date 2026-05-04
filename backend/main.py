from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api.router import router as api_router
from backend.core.database import Base, engine

# 確保所有資料表被建立
Base.metadata.create_all(bind=engine)

app = FastAPI(title="LifeLink API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Welcome to LifeLink API"}
