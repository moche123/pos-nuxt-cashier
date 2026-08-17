# POS

A point-of-sale (cash register) app — manage categories, products, customers, sales, and
receipts. Nuxt 4 frontend at the repo root; optional AdonisJS 7 backend in `server/`.

Data access goes through a repository layer (`app/repositories/`) that's swappable via
environment variable, so the frontend runs standalone with no backend at all, or against
the real one:

- `NUXT_PUBLIC_DATA_MODE=local` (default): in-memory data, no backend or DB needed.
- `NUXT_PUBLIC_DATA_MODE=api`: hits the real backend over HTTP.

## Quick start — without backend

Fastest way to try the app. No DB needed, no `server/` setup.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`, sign in with the demo login: `demo@example.com` / `demo1234`.
Data lives in memory and resets on dev server restart.

## Quick start — with the real backend

```bash
# 1. Backend — from server/
cd server
npm install
node ace migration:run
npm run dev                              # http://localhost:3333

# 2. Frontend — from repo root, in another terminal
cd ..
NUXT_PUBLIC_DATA_MODE=api npm run dev    # http://localhost:3000
```

Before `migration:run`, add DB credentials to `server/.env` (create it from
`server/.env.example` if it doesn't exist yet):

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_DATABASE=pos
```

No MySQL installed? Use `DB_CONNECTION=sqlite` instead — zero setup, no server to run.

Open `http://localhost:3000` and register a new account from `/register` — the real
backend has no seeded demo user.

## How the data modes work

The expected REST contract (routes, request/response shapes) for `api` mode is defined
by `app/repositories/api.ts` — `server/` implements it, but you can point `api` mode at
any backend that does. To add a different data source (another backend, another DB),
implement the `Repository` interface (`app/repositories/types.ts`) and wire it up in
`app/composables/useRepository.ts` — pages and the auth store never depend on a concrete
implementation.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
