# Real Estate Transaction Management System

This project is a full-stack application designed to manage real estate transactions, track lifecycle stages, and automate commission distribution between the agency and agents.

It is built as part of a technical case using NestJS, MongoDB Atlas, and Nuxt 3.

---

## 🚀 Live Demo

Frontend: https://real-estate-web-case.vercel.app/  
Backend API: https://real-estate-case-production.up.railway.app/transactions  

---

## 🧱 Tech Stack

### Backend
- Node.js (LTS)
- TypeScript
- NestJS
- MongoDB Atlas
- Mongoose
- Jest

### Frontend
- Nuxt 3
- Pinia
- Tailwind CSS
- Chart.js

---

## ✨ Features

- Transaction lifecycle management (agreement → earnest_money → title_deed → completed)
- Commission calculation based on business rules
- Dashboard with metrics and stage distribution chart
- Transaction detail view with financial breakdown
- Stage transition actions
- REST API integration
- Backend unit tests

---

## 📦 Project Structure

real-estate-case/  
├── backend/   → NestJS API  
└── frontend/  → Nuxt 3 application  

---

# ⚙️ Backend Setup

## 1. Navigate to backend
```bash
cd backend
```
## 2. Install dependencies
```bash
npm install
```
## 3. Create environment file

Create a `.env` file inside backend folder:

MONGO_URI=your_mongodb_connection_string

MongoDB Atlas is required.

## 4. Run development server
```bash
npm run start:dev
```
## 5. Run production
```bash
npm run build  
npm run start:prod
```
## 6. Run tests
```bash
npm run test
```
## Backend URL

http://localhost:3000

Swagger Docs:

http://localhost:3000/api/docs

---

# 💻 Frontend Setup

## 1. Navigate to frontend
```bash
cd frontend
```
## 2. Install dependencies
```bash
npm install
```
## 3. Create environment file

Create `.env` file inside frontend:

NUXT_PUBLIC_API_BASE=http://localhost:3000

## 4. Run development server
```bash
npm run dev
```
Frontend runs at:

http://localhost:3001

## 5. Production build
```bash
npm run build  
npm run preview
```
---

# 🔁 How It Works

1. Create a transaction from the frontend
2. Assign listing and selling agents
3. Move transaction through stages
4. When completed:
   - Commission is calculated automatically
   - Financial breakdown is stored
5. Dashboard updates accordingly

---

# 🧪 Testing

Backend includes unit tests for:
- Commission calculation
- Stage transitions
- Core business logic

Run:
```bash
npm run test
```
---

# 🌐 Deployment

Backend: Railway  
Frontend: Vercel  
Database: MongoDB Atlas  

---

# 📌 Notes

- Backend must be running before frontend in local setup
- MongoDB Atlas IP whitelist should allow access
- CORS is enabled for frontend communication

---

# 📄 License

This project is created for a technical case evaluation.
