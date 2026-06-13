# Deployment Guide

## Required Services

1. MongoDB Atlas cluster
2. Cloudinary account
3. Node.js hosting provider such as Render, Railway, Fly.io, or AWS
4. Frontend origin URL for CORS

## Environment Variables

Set these variables in the host dashboard:

```text
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=<long-random-secret>
JWT_REFRESH_SECRET=<long-random-secret>
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
COOKIE_SECRET=<long-random-secret>
CLOUDINARY_NAME=<cloud-name>
CLOUDINARY_KEY=<api-key>
CLOUDINARY_SECRET=<api-secret>
CLIENT_URL=https://your-frontend-domain.com
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=<strong-password>
```

## Build And Start

```bash
npm install --omit=dev
npm start
```

## Seed Admin

Run once after deployment:

```bash
npm run seed:admin
```

## MongoDB Atlas

1. Create a database user with read/write access.
2. Add your backend host IP to the Atlas network access list.
3. Use the Atlas connection URI as `MONGODB_URI`.

## Cloudinary

1. Copy cloud name, API key, and API secret.
2. Set the three Cloudinary environment variables.
3. Product images upload to `vssut-olx/products`.

## Security Checklist

- Use HTTPS in production.
- Set strong JWT and cookie secrets.
- Keep `CLIENT_URL` restricted to your frontend domain.
- Keep MongoDB Atlas network access restricted.
- Monitor rate-limit logs for abuse.
- Rotate secrets after accidental exposure.
