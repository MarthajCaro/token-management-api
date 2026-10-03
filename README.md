# Token Management API

Backend of the token management system, built with Node.js, Express and PostgreSQL.

## Live API

| Piece | Service | URL |
| --- | --- | --- |
| API | Render | https://token-management-api.onrender.com/api |
| Health check | Render | https://token-management-api.onrender.com/api/health |
| Swagger docs | Render | https://token-management-api.onrender.com/api-docs/ |
| Frontend | GitHub Pages | https://marthajcaro.github.io/token-management/ |
| Database | Neon (PostgreSQL) | managed, no public URL |

The API runs on Render's free tier, so it sleeps after 15 minutes of
inactivity and needs about 30 seconds to wake up on the next request.

## Features
- REST API for users, services and tokens
- JWT authentication (user login)
- Client credentials grant for machine-to-machine access
- Sequelize ORM with PostgreSQL
- Swagger documentation at `/api-docs`

## Technologies
- Node.js
- Express 5
- PostgreSQL
- Sequelize
- jsonwebtoken
- Swagger

## Installation

1. Clone the repository:
```bash
git clone https://github.com/MarthajCaro/token-management-api.git
cd token-management-api
```

2. Install dependencies:
```bash
npm install
```

3. Create the database:
```bash
createdb -U postgres token_management
```

4. Create your `.env` from the example and fill in the values:
```bash
cp .env.example .env
```

5. Start the server:
```bash
npm start
```

The API runs on `http://localhost:3000` and the tables are created
automatically with `sequelize.sync()` on first start.

## Authentication

| Endpoint | Purpose | Credentials |
| --- | --- | --- |
| `POST /api/auth/login` | User login for the web app | email + password |
| `POST /api/auth/token` | Client credentials grant for Postman or other services | client_id + client_secret |

`POST /api/auth/token` is meant for machine-to-machine consumers. The
client secret lives only in `.env` and must never be shipped to a browser.

All other routes require an `Authorization: Bearer <token>` header.

## Deployment

The API is deployed on Render and the database runs on Neon. Required
environment variables, all set in the Render dashboard and none of them
committed to this repository:

| Variable | Purpose |
| --- | --- |
| `DB_NAME`, `DB_USER`, `DB_PASS`, `DB_HOST`, `DB_PORT`, `DB_SSL` | PostgreSQL connection |
| `JWT_SECRET` | Signs and verifies the access tokens |
| `CLIENT_ID`, `CLIENT_SECRET` | Client credentials grant |
| `CORS_ORIGIN` | The single browser origin allowed to call this API |
| `PORT` | Assigned automatically by Render |

Render runs `npm install` on build and `npm start` on boot.

To load the demo data:

```bash
npm run seed
```

## Swagger

Locally:

```
http://localhost:3000/api-docs
```

Deployed:

```
https://token-management-api.onrender.com/api-docs/
```

## Frontend

https://github.com/MarthajCaro/token-management

## Author
Martha Caro – Junior Full Stack Developer