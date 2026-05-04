from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend.core.database import get_db
from backend.service import data_service
from backend.schema import domain as schemas

router = APIRouter()

# 暫時固定 USER ID 用於測試
TEST_USER_ID = "8829-4501-LL"

@router.get("/dashboard", response_model=schemas.UserResponse)
def read_dashboard(db: Session = Depends(get_db)):
    data = data_service.get_user_dashboard(db, TEST_USER_ID)
    if not data:
        raise HTTPException(status_code=404, detail="User not found")
    
    # 組合回應資料
    user = data["user"]
    user.appointments = data["appointments"]
    return user

@router.get("/news", response_model=List[schemas.NewsResponse])
def read_news(db: Session = Depends(get_db)):
    return data_service.get_latest_news(db)

@router.get("/locations", response_model=List[schemas.LocationResponse])
def read_locations(db: Session = Depends(get_db)):
    return data_service.get_all_locations(db)

@router.post("/appointments", response_model=schemas.AppointmentResponse)
def create_appointment(appointment: schemas.AppointmentCreate, db: Session = Depends(get_db)):
    return data_service.book_appointment(db, TEST_USER_ID, appointment)

@router.get("/appointments", response_model=List[schemas.AppointmentResponse])
def read_appointments(db: Session = Depends(get_db)):
    data = data_service.get_user_dashboard(db, TEST_USER_ID)
    if not data:
         raise HTTPException(status_code=404, detail="User not found")
    return data["appointments"]
