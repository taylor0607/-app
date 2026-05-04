from backend.core.database import SessionLocal, engine, Base
from backend.model.domain import User, Location, Appointment, News
from datetime import datetime, timedelta

def seed_data():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Seed User
        user = User(
            id="8829-4501-LL",
            name="林小明",
            blood_type="A",
            hero_points=1250,
            level="Gold",
            health_status="良好",
            next_eligible_date=datetime.now() + timedelta(days=14),
            avatar_url="https://lh3.googleusercontent.com/aida/ADBb0uiN7EtECCUvrMM2qKjYULx6Io5KYUlXxJ3Jj9cDglvgOzQkLnqNRfdLLVruFkSJtO0W8MOjW22s77XYFuxsA0kx8-zN_Ur64grgYYMImQVkdRSSM-y2pFPKop4wuEixOsR1WIYPOgKoCJyhkWvoz-xqB-cnLEuhl_JP3N07e--gLcHs8D8BCceypRRS1tARJZjoBsrEEbcEaGbIHUsI5lwvAspc6xmwo2A3rqZ6hEGgP19D84N9RF3s484siDGAnfNSlVgsLqaRSw"
        )
        db.add(user)

        # Seed Locations
        loc1 = Location(id=1, name="台北捐血中心", address="台北市大同區承德路一段1號2樓")
        loc2 = Location(id=2, name="中心診所捐血站", address="台北市大安區忠孝東路四段77號")
        loc3 = Location(id=3, name="西門捐血車", address="台北市萬華區峨眉街1號")
        db.add_all([loc1, loc2, loc3])

        # Seed Appointments
        app1 = Appointment(
            id="BK-20250917",
            user_id=user.id,
            location_id=1,
            date=datetime(2025, 9, 17, 14, 0),
            type="全血",
            volume="250ml",
            status="已確認",
            points_awarded=0,
            report_available=False
        )
        app2 = Appointment(
            id="BK-20241217",
            user_id=user.id,
            location_id=1,
            date=datetime(2024, 12, 17, 10, 30),
            type="全血",
            volume="250ml",
            status="已完成",
            points_awarded=150,
            report_available=True
        )
        app3 = Appointment(
            id="BK-20240912",
            user_id=user.id,
            location_id=2,
            date=datetime(2024, 9, 12, 15, 0),
            type="全血",
            volume="500ml",
            status="已完成",
            points_awarded=300,
            report_available=True
        )
        db.add_all([app1, app2, app3])

        # Seed News
        news1 = News(
            id=1,
            type="緊急",
            title="台北捐血中心：O型血庫存告急",
            content="因近期寒流，捐血人數銳減，誠邀各位熱血青年踴躍捐血。",
            date=datetime.now() - timedelta(hours=2),
            image_url="https://lh3.googleusercontent.com/aida/ADBb0uiLhtMOMG37H-QVSqMmCFlYZW6tZB3Z4gJBtRwZD6geIWTUPJmkDKcNI_i7rAoV2Q92-BTJlF-oFY7IL3wQIna5MK21Raf8ZywRV9HEktDW-nPxuRMWVVkxodAyz_5iEr9-thWABiAoYbBJAQhGakjVRuBVecxnaGrQYAmZr81ouEA2AKBOLoqwqHC7VyIjdgOk085nKCNwM0O5_KOxD7vQYBm1vAekk_Rj_nFPKiPCwTw_KbDzwELSsAU6PQ4E3uhNXJR4Bw5Q8g"
        )
        news2 = News(
            id=2,
            type="活動",
            title="「熱血馬拉松」活動開跑",
            content="本週末於信義區舉辦，前100名可獲得精美禮品。",
            date=datetime.now() - timedelta(days=1),
            image_url="https://lh3.googleusercontent.com/aida/ADBb0ugyrT66uWiJVoWuoi2G23_tyldcuPixXZPar7g15AqOKNeqAPDqHpHeDwZyD88Hgo-Sx2PKCULabRLjsvu2oF6MyU5aC2RG7Z0U0HOH0-BXx9YfdHuxjLa5FdcChFhzwZRf5i-Bq5fVhEc3yClr8UsYqf5USHxVhnP5Ii5gsxfr_OmR6euKuWV4MkriVP4T8Sg9hP6E6NTxNYAw4mEiHMynLxeN4MVLuAt0y6UxBIcb0atA7LqL1Lh4up2MaSUn4024wTPiq_tXCA"
        )
        db.add_all([news1, news2])

        db.commit()
        print("資料庫初始化與假資料建立完成！")
    except Exception as e:
        db.rollback()
        print(f"錯誤：{e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
