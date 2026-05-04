# LifeLink 捐血 App

這是一個使用 React + Vite 作為前端，FastAPI + PostgreSQL 作為後端，並整合 Supabase 的全端應用程式。

## 系統架構
*   **前端**：React, TailwindCSS, Vite
*   **後端**：FastAPI, SQLAlchemy
*   **資料庫**：Supabase (PostgreSQL)

## 開發指南

### 1. 安裝依賴
```bash
npm install
cd backend && pip install -r requirements.txt
```

### 2. 環境變數設定
請複製 `.env.example` 並更名為 `.env`，填入 Supabase 的連線資訊。
前端需要 `.env.local`。

### 3. 啟動服務
**前端 (Terminal 1):**
```bash
npm run dev
```

**後端 (Terminal 2):**
```bash
.\venv\Scripts\activate
uvicorn backend.main:app --reload --port 8000
```
