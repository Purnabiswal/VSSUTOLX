# VSSUT OLX Backend

Production-ready Express/MongoDB backend for the VSSUT OLX campus marketplace.

## Stack

- Node.js + Express.js
- MongoDB Atlas + Mongoose
- JWT access and refresh tokens
- bcryptjs password hashing
- Cloudinary image uploads
- Socket.IO real-time chat
- express-validator validation
- Helmet, CORS, cookie-parser, rate limiting, Morgan

## Structure

```text
backend/
  src/
    config/
    controllers/
    models/
    routes/
    middlewares/
    validators/
    services/
    utils/
    socket/
    jobs/
```

## Setup

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Update `.env` with MongoDB Atlas, JWT, Cloudinary, and frontend URL values.

## Scripts

- `npm run dev` starts the API with Nodemon.
- `npm start` starts the API in production mode.
- `npm run lint` checks backend source.
- `npm run seed:admin` creates an initial admin user.

## Authentication

The API issues access and refresh tokens. Tokens are returned in the JSON response and also set as signed, HTTP-only cookies. Protected routes accept either:

```http
Authorization: Bearer <accessToken>
```

or the signed `accessToken` cookie.

## Docs

- API documentation: [docs/API.md](docs/API.md)
- Deployment instructions: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
