-- 啟用 uuid-ossp 擴充功能 (以防未來需要產生 UUID)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. 建立資料表 (Tables)
-- ==========================================

-- Users 表
CREATE TABLE users (
    id VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    blood_type VARCHAR NOT NULL,
    hero_points INTEGER DEFAULT 0,
    level VARCHAR DEFAULT 'Bronze',
    health_status VARCHAR DEFAULT '良好',
    next_eligible_date TIMESTAMP WITH TIME ZONE,
    avatar_url VARCHAR
);

-- Locations 表
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    address VARCHAR NOT NULL
);

-- Appointments 表
CREATE TABLE appointments (
    id VARCHAR PRIMARY KEY,
    user_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
    location_id INTEGER REFERENCES locations(id) ON DELETE SET NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    type VARCHAR NOT NULL,
    volume VARCHAR NOT NULL,
    status VARCHAR NOT NULL,
    points_awarded INTEGER DEFAULT 0,
    report_available BOOLEAN DEFAULT FALSE
);

-- News 表
CREATE TABLE news (
    id SERIAL PRIMARY KEY,
    type VARCHAR NOT NULL,
    title VARCHAR NOT NULL,
    content TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    image_url VARCHAR
);

-- ==========================================
-- 2. 寫入初始種子資料 (Seed Data)
-- ==========================================

-- 寫入 User
INSERT INTO users (id, name, blood_type, hero_points, level, health_status, next_eligible_date, avatar_url)
VALUES (
    '8829-4501-LL', 
    '林小明', 
    'A', 
    1250, 
    'Gold', 
    '良好', 
    CURRENT_TIMESTAMP + INTERVAL '14 days', 
    'https://lh3.googleusercontent.com/aida/ADBb0uiN7EtECCUvrMM2qKjYULx6Io5KYUlXxJ3Jj9cDglvgOzQkLnqNRfdLLVruFkSJtO0W8MOjW22s77XYFuxsA0kx8-zN_Ur64grgYYMImQVkdRSSM-y2pFPKop4wuEixOsR1WIYPOgKoCJyhkWvoz-xqB-cnLEuhl_JP3N07e--gLcHs8D8BCceypRRS1tARJZjoBsrEEbcEaGbIHUsI5lwvAspc6xmwo2A3rqZ6hEGgP19D84N9RF3s484siDGAnfNSlVgsLqaRSw'
);

-- 寫入 Locations
INSERT INTO locations (id, name, address) VALUES 
(1, '台北捐血中心', '台北市大同區承德路一段1號2樓'),
(2, '中心診所捐血站', '台北市大安區忠孝東路四段77號'),
(3, '西門捐血車', '台北市萬華區峨眉街1號');

-- 重置 locations 的自增 ID (以防未來新增衝突)
SELECT setval('locations_id_seq', (SELECT MAX(id) FROM locations));

-- 寫入 Appointments
INSERT INTO appointments (id, user_id, location_id, date, type, volume, status, points_awarded, report_available)
VALUES 
('BK-20250917', '8829-4501-LL', 1, '2025-09-17 14:00:00', '全血', '250ml', '已確認', 0, FALSE),
('BK-20241217', '8829-4501-LL', 1, '2024-12-17 10:30:00', '全血', '250ml', '已完成', 150, TRUE),
('BK-20240912', '8829-4501-LL', 2, '2024-09-12 15:00:00', '全血', '500ml', '已完成', 300, TRUE);

-- 寫入 News
INSERT INTO news (id, type, title, content, date, image_url)
VALUES 
(1, '緊急', '台北捐血中心：O型血庫存告急', '因近期寒流，捐血人數銳減，誠邀各位熱血青年踴躍捐血。', CURRENT_TIMESTAMP - INTERVAL '2 hours', 'https://lh3.googleusercontent.com/aida/ADBb0uiLhtMOMG37H-QVSqMmCFlYZW6tZB3Z4gJBtRwZD6geIWTUPJmkDKcNI_i7rAoV2Q92-BTJlF-oFY7IL3wQIna5MK21Raf8ZywRV9HEktDW-nPxuRMWVVkxodAyz_5iEr9-thWABiAoYbBJAQhGakjVRuBVecxnaGrQYAmZr81ouEA2AKBOLoqwqHC7VyIjdgOk085nKCNwM0O5_KOxD7vQYBm1vAekk_Rj_nFPKiPCwTw_KbDzwELSsAU6PQ4E3uhNXJR4Bw5Q8g'),
(2, '活動', '「熱血馬拉松」活動開跑', '本週末於信義區舉辦，前100名可獲得精美禮品。', CURRENT_TIMESTAMP - INTERVAL '1 day', 'https://lh3.googleusercontent.com/aida/ADBb0ugyrT66uWiJVoWuoi2G23_tyldcuPixXZPar7g15AqOKNeqAPDqHpHeDwZyD88Hgo-Sx2PKCULabRLjsvu2oF6MyU5aC2RG7Z0U0HOH0-BXx9YfdHuxjLa5FdcChFhzwZRf5i-Bq5fVhEc3yClr8UsYqf5USHxVhnP5Ii5gsxfr_OmR6euKuWV4MkriVP4T8Sg9hP6E6NTxNYAw4mEiHMynLxeN4MVLuAt0y6UxBIcb0atA7LqL1Lh4up2MaSUn4024wTPiq_tXCA');

-- 重置 news 的自增 ID
SELECT setval('news_id_seq', (SELECT MAX(id) FROM news));
