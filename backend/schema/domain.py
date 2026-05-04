from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# --- Location ---
class LocationBase(BaseModel):
    name: str
    address: str

class LocationResponse(LocationBase):
    id: int
    class Config:
        from_attributes = True

# --- Appointment ---
class AppointmentBase(BaseModel):
    date: datetime
    type: str
    volume: str
    status: str
    points_awarded: int = 0
    report_available: bool = False

class AppointmentCreate(AppointmentBase):
    location_id: int

class AppointmentResponse(AppointmentBase):
    id: str
    location: LocationResponse
    class Config:
        from_attributes = True

# --- User ---
class UserBase(BaseModel):
    name: str
    blood_type: str
    hero_points: int
    level: str
    health_status: str
    next_eligible_date: Optional[datetime] = None
    avatar_url: Optional[str] = None

class UserResponse(UserBase):
    id: str
    appointments: List[AppointmentResponse] = []
    class Config:
        from_attributes = True

# --- News ---
class NewsBase(BaseModel):
    type: str
    title: str
    content: str
    date: datetime
    image_url: Optional[str] = None

class NewsResponse(NewsBase):
    id: int
    class Config:
        from_attributes = True
