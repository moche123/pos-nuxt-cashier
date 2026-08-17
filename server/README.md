# POS API

AdonisJS 7 backend for the POS app (`../`). MySQL via Lucid ORM, bearer-token auth
(`@adonisjs/auth` access tokens). Implements the REST contract the frontend's
`app/repositories/api.ts` expects — English routes, `{ data: ... }` response envelopes.

## Setup

```bash
npm install
cp .env.example .env   # then add DB_* vars below, and set APP_KEY (node ace generate:key)
node ace migration:run
npm run dev             # http://localhost:3333
```

Add to `.env` (or omit `DB_CONNECTION` / set it to `sqlite` for a zero-setup local DB):

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_DATABASE=pos
```

## Routes (all under `/api`)

- `POST /login`, `POST /register`, `GET /me` (auth required)
- `GET|POST /categories`, `PATCH|DELETE /categories/:id`
- `GET|POST /products`, `PATCH|DELETE /products/:id`
- `GET|POST /customers`, `GET /customers/document/:documentId`
- `GET|POST /sales`, `PATCH|DELETE /sales/:id`
- `GET|POST /receipts`, `DELETE /receipts/:id`

Everything except `/login` and `/register` requires `Authorization: Bearer <token>`.

## Layout

- `app/models/` — Lucid models (`Category`, `Product`, `Customer`, `Sale`, `Receipt`, `User`),
  composed from `database/schema.ts` (auto-generated from migrations — don't edit by hand,
  run `node ace migration:run` or `node ace schema:generate` to refresh it).
- `app/controllers/`, `app/validators/` — one pair per domain.
- `database/migrations/` — one file per table.
