# SkillBridge NG production migration

This version keeps the existing React MVP and adds a separate Express/Prisma/MySQL API under `server/`.

## First local setup

1. Create a MySQL database named `skillbridge_ng` in XAMPP/phpMyAdmin.
2. Copy `server/.env.example` to `server/.env` and set `DATABASE_URL`, `APP_ORIGIN`, and Paystack test keys.
3. From `server/`: `npm install`
4. Run `npx prisma generate`
5. Run `npx prisma migrate dev --name initial_backend`
6. Start the API with `npm run dev`.
7. The health endpoint is `http://localhost:4000/api/health`.

## Important

The React app is not yet switched over to the API. That is intentional. The next migration step is to replace the browser-only auth/store functions with API clients, starting with registration/login/session restoration.

## Payments

The API contains the secure Paystack pattern: initialize on the server, store the reference, and verify with the secret key before activating Premium. Do not put `PAYSTACK_SECRET_KEY` in the React `.env`.

## Seed/content migration

The existing `src/data/Data.js` and `src/data/deepDives.js` remain the source content for now. We will add an explicit seed/import script after the database connection is tested, so content IDs remain stable and no existing lesson/project data is silently changed.
