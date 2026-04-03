# GigShield: Hybrid Income Protection for Gig Workers

**AI Risk Forecast, verified income-drop settlement, and micro-relief for the modern delivery partner.**

## 📖 Overview
GigShield is a hybrid micro-insurance platform that provides weekly-priced coverage exclusively for **Loss of Income**. In the Indian gig economy, delivery partners face unpredictable income shocks due to extreme weather, regional demand drops, or disruptions. GigShield combines proactive AI risk forecasting with an automated, parametric settlement system to protect daily wage stability.

## ✨ Key Features (MVP)
- **AI Shift Risk Forecast**: Predictive risk score (1-10) guiding workers on safe and profitable shift zones before logging in.
- **Micro-Relief Vouchers**: Instant QR voucher claims for essentials (chai/water) during high-stress environmental events, like Severe AQI alerts.
- **Automated Parametric Settlement**: End-of-week cron job that assesses income drops against a 4-week historical average. If drops exceed 30%, the gap is automatically settled.
- **Fraud & Fairness Engine**: Advanced algorithms scoring claims based on GPS teleporting, location spoofing, and activity proof.

## 🛠️ Tech Stack
- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js App Router (API Routes)
- **Database**: SQLite (via Prisma ORM)
- **Styling & UI**: Framer Motion, Recharts, Lucide React

## 📂 Project Structure
- `/app`: Next.js application routes (Worker app, Admin dashboard, API endpoints)
- `/components`: Reusable UI components
- `/prisma`: Database schema and SQLite database file

## 🚀 Local Development Setup

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18+) and npm installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup the Database
Push the Prisma schema to create the local SQLite database (`dev.db`).
```bash
npx prisma db push
```

### 4. Run the Development Server
```bash
npm run dev
```

### 5. Seed the Database
Wait for the application to be running, then visit `http://localhost:3000/api/seed` in your browser. This populates the database with mock workers, zones, policies, and test data.

## 🎮 Demo Flow

- **Worker App** (`http://localhost:3000/worker`): Explore the persona of "Ravi", a Delhi delivery partner. Check the AI forecast, buy a weekly policy, and mock a Micro-Relief claim during an active event.
- **Admin Control Center** (`http://localhost:3000/admin`): View the real-time portfolio metrics, active triggers, and the live claims/fraud adjudication feed. Monitor loss ratios and auto-approval rates.
- **System Simulator** (`http://localhost:3000/admin/events`): Inject mocked severe weather/AQI triggers into the global system, or manually fast-forward the end-of-week settlement batch cron.

---
**DEVTrails 2026 Phase 3 Submission**
*Built by AntiGravity Execution Team*
