# Smart Leads Dashboard

A full-stack Lead Management Dashboard built with the MERN stack and TypeScript.

## Tech Stack

**Frontend:** React.js, TypeScript, TailwindCSS, Vite

**Backend:** Node.js, Express.js, TypeScript, MongoDB, Mongoose

## Features

- JWT Authentication (Register/Login)
- Role Based Access Control (Admin/Sales)
- Leads CRUD (Create, Read, Update, Delete)
- Advanced Filtering by Status, Source
- Search by Name or Email (Debounced)
- Sort by Latest/Oldest
- Backend Pagination
- CSV Export
- Docker Setup

## Project Structure
smart-leads-dashboard/
├── backend/          # Express + TypeScript API
├── frontend/         # React + TypeScript UI
└── docker-compose.yml
## Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Docker (optional)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Fill in your .env values
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Docker Setup
```bash
docker-compose up --build
```

## Environment Variables

See `backend/.env.example` for required variables.

## API Documentation

### Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login user |

### Leads Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/leads | Get all leads (with filters) |
| POST | /api/leads | Create a lead |
| GET | /api/leads/:id | Get single lead |
| PUT | /api/leads/:id | Update a lead |
| DELETE | /api/leads/:id | Delete a lead (admin only) |
| GET | /api/leads/export/csv | Export leads as CSV (admin only) |

## Query Parameters for GET /api/leads

| Parameter | Description |
|-----------|-------------|
| status | Filter by status (New/Contacted/Qualified/Lost) |
| source | Filter by source (Website/Instagram/Referral) |
| search | Search by name or email |
| sort | Sort by latest or oldest |
| page | Page number (default: 1) |
| limit | Records per page (default: 10) |