from sqlalchemy.orm import Session
from backend.model.domain import User, Location, Appointment, News

def get_user_by_id(db: Session, user_id: str):
    return db.query(User).filter(User.id == user_id).first()

def get_user_appointments(db: Session, user_id: str):
    return db.query(Appointment).filter(Appointment.user_id == user_id).order_by(Appointment.date.desc()).all()

def get_news(db: Session):
    return db.query(News).order_by(News.date.desc()).all()

def get_locations(db: Session):
    return db.query(Location).all()

def create_appointment(db: Session, appointment: Appointment):
    db.add(appointment)
    db.commit()
    db.refresh(appointment)
    return appointment

def get_appointment_by_id(db: Session, appointment_id: str):
    return db.query(Appointment).filter(Appointment.id == appointment_id).first()
