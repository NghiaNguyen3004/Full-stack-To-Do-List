# Deployment Quick Guide

This project includes a backend (Node/Express) and a frontend (Vite/React). Below are minimal, convenient steps to deploy both and set environment variables.

## Required env vars (see `.env.example`)
- `PORT` (optional)
- `DATABASE_URL` (Postgres connection string: `postgres://user:pass@host:5432/db`)
- `FRONTEND_URL` (frontend URL for CORS)
- `JWT_SECRET` (strong random string)

## Quick deploy options

- Heroku / Railway (backend):
  1. Create app on the platform.
  2. Provision a Postgres database (platform add-on) and copy the provided `DATABASE_URL`.
  3. In app settings, set `JWT_SECRET` and `FRONTEND_URL` (and `PORT` if needed).
  4. Push the repo (e.g., `git push heroku main`).

- Vercel / Netlify (frontend):
  1. Connect the `frontend` folder to Vercel/Netlify.
  2. Set `VITE_BACKEND_URL` or application-specific env vars in the platform if the frontend needs them.

## Local testing
1. Copy `.env.example` to `.env` in the project root and fill values.
2. From the repo root run:

```bash
# install backend deps (if not installed)
npm install
# from project root
npm run dev
```

## Notes
- If your Postgres host requires SSL, update `src/models/db.js` to enable SSL for the `pg` Pool.
- Never commit a real `.env` with secrets to source control.
