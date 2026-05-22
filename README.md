# HireInfinity Backend

Small Node.js API for HireInfinity lead capture and booking requests.

## Stack

- Express
- MongoDB
- Mongoose
- Zod
- JWT admin auth
- Optional SMTP email notifications

## Setup

```bash
npm install
cp .env.example .env
npm run seed
npm run dev
```

Set `MONGODB_URI`, `JWT_SECRET`, and admin seed values in `.env` before running the app in a real environment.

## Routes

- `GET /api/health`
- `POST /api/leads`
- `GET /api/leads` admin only
- `GET /api/leads/:id` admin only
- `PATCH /api/leads/:id/status` admin only
- `POST /api/bookings`
- `GET /api/bookings` admin only
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me` admin only

## Frontend Env

Point the Vite app at this API with:

```bash
VITE_API_URL=http://localhost:4000/api
```
