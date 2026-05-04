from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from backend.core.database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True) # ID e.g., 8829-4501-LL
    name = Column(String, nullable=False)
    blood_type = Column(String, nullable=False)
    hero_points = Column(Integer, default=0)
    level = Column(String, default="Bronze")
    health_status = Column(String, default="良好")
    next_eligible_date = Column(DateTime, nullable=True)
    avatar_url = Column(String, nullable=True)
    
    appointments = relationship("Appointment", back_populates="user")

class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    address = Column(String, nullable=False)
    
    appointments = relationship("Appointment", back_populates="location")

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(String, primary_key=True, index=True) # e.g., BK-20250917
    user_id = Column(String, ForeignKey("users.id"))
    location_id = Column(Integer, ForeignKey("locations.id"))
    date = Column(DateTime, nullable=False)
    type = Column(String, nullable=False) # e.g., 全血, 分離術
    volume = Column(String, nullable=False) # e.g., 250ml, 500ml
    status = Column(String, nullable=False) # 已確認, 已完成, 已取消
    points_awarded = Column(Integer, default=0)
    report_available = Column(Boolean, default=False)
    
    user = relationship("User", back_populates="appointments")
    location = relationship("Location", back_populates="appointments")

class News(Base):
    __tablename__ = "news"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String, nullable=False) # 緊急, 活動
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    date = Column(DateTime, default=datetime.utcnow)
    image_url = Column(String, nullable=True)
