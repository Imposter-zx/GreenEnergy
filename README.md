# GreenEnergy Management Platform

A modern, production-grade Energy Management Platform that analyzes electric consumption and provides intelligent, data-driven recommendations to reduce energy waste.

## 🚀 Recent Architecture Upgrades

The platform has been recently refactored to meet industry standards for security and performance:

- **Zero-Reload SPA Architecture**: Migrated all data fetching to **TanStack Query (React Query)**, eliminating `window.location.reload()` and providing instant UI updates.
- **Enhanced Security**:
  - Migrated JWT storage from localStorage to **HttpOnly, SameSite cookies**.
  - Implemented **CSRF Protection** (Custom Header Strategy).
  - Integrated **Helmet** middleware for security headers.
- **Performance Optimization**: Optimized database queries with Supabase-level aggregations.
- **Global Error Handling**: Centralized error management in the Express backend.
- **Database Migration**: Migrated from Prisma ORM to **Supabase** for improved developer experience and real-time capabilities.

## 🌟 Key Features

- **Smart Dashboard**: Real-Time energy consumption visualizations.
- **AI-Powered Analytics**: Consumption prediction and anomaly detection.
- **Eco-Metrics**: Carbon footprint tracking and "Trees Equivalent" savings.
- **Multi-User Support**: Tailored experiences for Companies and Individuals.
- **Budget Tracking**: Financial thresholding and smart alerts.
- **PDF Reporting**: Professional automated reports for energy audits.

## 🏗️ Project Structure

```
GreenEnergy/
├── frontend/          # React 19 + TypeScript + Vite
│   ├── src/
│   │   ├── api/      # Centralized Axios instance
│   │   ├── context/  # Cookie-based Auth state
│   │   └── pages/    # Modernized with React Query
├── backend/           # Node.js + Express + Supabase + PostgreSQL
│   ├── src/
│   │   ├── middleware/# Security & Auth logic
│   │   ├── controllers/# Refactored with Global Error Handling
│   │   ├── lib/      # Supabase client initialization
│   │   └── services/ # Supabase data access layer
├── supabase_schema.sql # Database schema for Supabase
└── package.json       # Monorepo task runner
```

## 🛠️ Tech Stack

### Frontend

- **React 19**
- **TanStack Query (React Query)** - Server state management
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Axios** - HTTP client (with credentials)

### Backend

- **Node.js**
- **Express**
- **Supabase** - PostgreSQL database with real-time capabilities
- **PostgreSQL** (via Supabase)
- **JWT + HttpOnly Cookies** - Secure authentication
- **Helmet & Cookie-Parser** - Middleware

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL instance

### Installation

1. **Clone & Install**:

    ```bash
    git clone https://github.com/Imposter-zx/GreenEnergy.git
    cd GreenEnergy
    npm install        # Installs backend dependencies
    cd frontend && npm install # Installs frontend dependencies
    ```

2. **Environment Setup**:
   Create a `.env` file in the root:

   ```env
   SUPABASE_URL="your-supabase-project-url"
   SUPABASE_ANON_KEY="your-supabase-anon-key"
   JWT_SECRET="your-secure-secret"
   FRONTEND_URL="http://localhost:5173"
   PORT=5000
   NODE_ENV=development
   ```

3. **Database Initialization**:
   ```bash
   # Execute the SQL in supabase_schema.sql in your Supabase dashboard
   npm run seed       # Populate with initial demo data
   ```

### Running the Platform

**Full Stack (Simultaneous)**:

```bash
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 🌐 Deployment

The platform is deployment-ready:

- **Frontend**: Optimized for Vercel/Netlify.
- **Backend**: Configured for Render/Railway/Heroku.
- **CI/CD**: `render.yaml` and `vercel.json` included.

## 📄 License

ISC

## 👥 Authors

GreenEnergy Team
