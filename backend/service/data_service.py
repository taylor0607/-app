from sqlalchemy.orm import Session
from backend.repository import data_repository
from backend.schema.domain import AppointmentCreate
from backend.model.domain import Appointment
from datetime import datetime
import uuid

def get_user_dashboard(db: Session, user_id: str):
    user = data_repository.get_user_by_id(db, user_id)
    if not user:
        return None
    appointments = data_repository.get_user_appointments(db, user_id)
    return {
        "user": user,
        "appointments": appointments
    }

def get_latest_news(db: Session):
    return data_repository.get_news(db)

def get_all_locations(db: Session):
    return data_repository.get_locations(db)

def book_appointment(db: Session, user_id: str, appointment_data: AppointmentCreate):
    appointment_id = f"BK-{datetime.now().strftime('%Y%m%d')}-{str(uuid.uuid4())[:4].upper()}"
    new_appointment = Appointment(
        id=appointment_id,
        user_id=user_id,
        location_id=appointment_data.location_id,
        date=appointment_data.date,
        type=appointment_data.type,
        volume=appointment_data.volume,
        status="已確認",
        points_awarded=0,
        report_available=False
    )
    return data_repository.create_appointment(db, new_appointment)

def get_appointment_detail(db: Session, appointment_id: str):
    return data_repository.get_appointment_by_id(db, appointment_id)
