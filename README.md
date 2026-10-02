# Token Management API

Backend of the token management system, built with Node.js, Express and PostgreSQL.

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

## Swagger

```
http://localhost:3000/api-docs
```

## Frontend

https://github.com/MarthajCaro/token-management

## Author
Martha Caro – Junior Full Stack Developer