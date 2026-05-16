# Ribe Boys Senior School System

A complete, production-ready Full-Stack School Management System (ERP) and Public School Website specifically tailored for **Ribe Boys Senior School**, Kilifi County, Kenya.

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, Recharts.
- **Backend**: NestJS, TypeScript, Prisma ORM.
- **Database**: PostgreSQL (Prisma).
- **Security**: JWT, RBAC, Password Hashing (Bcrypt).
- **Integrations**: M-Pesa Daraja API, OpenAI (GPT-3.5), Africa's Talking (SMS).
- **Infrastructure**: Docker, Docker Compose, Nginx.

---

## 📁 Project Structure

```text
ribe-boys-system/
├── client/
│   ├── public-website/    # Next.js App (Public facing)
│   └── dashboard/         # Next.js App (Admin/Internal ERP)
├── server/                # NestJS Backend API
├── shared/                # Shared types and validation schemas (Zod)
├── docker/                # Dockerfiles and Nginx configs
├── database/              # Prisma schema and migrations
└── docker-compose.yml     # Unified deployment configuration
```

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: v20 or higher.
- **Docker & Docker Compose**: (Recommended for production).
- **PostgreSQL**: (If running without Docker).

### 1. Environment Configuration

You must create `.env` files in both the `server/` and root directories.

**Server (`server/.env`):**
```env
DATABASE_URL="postgresql://admin:password@localhost:5432/ribe_boys?schema=public"
JWT_SECRET="your_very_secure_secret_key"

# Integrations
OPENAI_API_KEY="sk-..."
AT_USERNAME="sandbox"
AT_API_KEY="your_africastalking_key"
AT_SHORTCODE="12345"

# M-Pesa
MPESA_CONSUMER_KEY="your_key"
MPESA_CONSUMER_SECRET="your_secret"
MPESA_PASSKEY="your_passkey"
MPESA_SHORTCODE="174379"
MPESA_CALLBACK_URL="https://your-domain.com/api/finance/callback"
```

### 2. Running with Docker (Recommended)

To spin up the entire system including the database, cache, and all applications:

```bash
docker-compose up --build
```

- **Public Website**: [http://localhost:3000](http://localhost:3000)
- **Dashboard Portal**: [http://localhost:3002](http://localhost:3002)
- **Backend API**: [http://localhost:3001](http://localhost:3001)

### 3. Manual Installation (Development)

If you prefer to run services individually:

**Backend:**
```bash
cd server
npm install
npx prisma generate
npm run start:dev
```

**Frontend (Public & Dashboard):**
```bash
cd client/public-website # or client/dashboard
npm install
npm run dev
```

---

## 📊 Core Features

- **Institutional Presence**: Modern public website with Online Admissions and Gallery.
- **Smart Analytics**: Real-time Recharts dashboards for school performance and finance.
- **AI-Powered Remarks**: Automated teacher feedback using OpenAI GPT-3.5.
- **M-Pesa Integration**: Secure fee payments via STK Push.
- **SMS Alerts**: Automatic payment confirmations and school announcements via Africa's Talking.
- **Comprehensive ERP**: Modules for CBC Grade 10-12, Exams, Boarding, and Staff management.

---

## 📜 Official Contacts

- **Location**: Rabai Sub-county, Kilifi County, Kenya
- **KNEC Code**: 04100002
- **Motto**: “Pamoja Tutashinda” (Together We Shall Win)
- **Email**: ribeboys@gmail.com
- **Postal**: P.O. Box 198 - 80105, Kaloleni

---

## 🛡️ License
This system is developed for the exclusive use of Ribe Boys Senior School. All rights reserved.
