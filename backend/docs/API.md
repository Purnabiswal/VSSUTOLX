# VSSUT OLX API Documentation

Base URL: `/api`

All protected endpoints require `Authorization: Bearer <accessToken>` or the signed auth cookie.

## Auth

### Register

`POST /api/auth/register`

```json
{
  "name": "Student Name",
  "email": "student@vssut.ac.in",
  "password": "Password123",
  "branch": "CSE",
  "year": 3
}
```

### Login

`POST /api/auth/login`

```json
{
  "email": "student@vssut.ac.in",
  "password": "Password123"
}
```

### Logout

`POST /api/auth/logout`

### Refresh Token

`POST /api/auth/refresh`

### Current User

`GET /api/auth/me`

### Forgot Password

`POST /api/auth/forgot-password`

```json
{ "email": "student@vssut.ac.in" }
```

### Reset Password

`POST /api/auth/reset-password`

```json
{
  "token": "reset-token",
  "password": "NewPassword123"
}
```

## Users

`GET /api/users/:id`

`PUT /api/users/profile`

```json
{
  "name": "Updated Name",
  "branch": "Electrical",
  "year": 4
}
```

`PUT /api/users/change-password`

```json
{
  "currentPassword": "Password123",
  "newPassword": "NewPassword123"
}
```

## Products

### List Products

`GET /api/products`

Query parameters:

- `keyword`
- `category`
- `minPrice`
- `maxPrice`
- `sort`: `newest`, `oldest`, `price-low`, `price-high`, `popular`
- `page`
- `limit`

### Product Details

`GET /api/products/:id`

### Create Product

`POST /api/products`

Content type: `multipart/form-data`

Fields:

- `title`
- `description`
- `price`
- `category`
- `location`
- `images`: up to 6 image files, max 3 MB each

### Update Product

`PUT /api/products/:id`

### Delete Product

`DELETE /api/products/:id`

### Mark Sold

`PATCH /api/products/:id/sold`

## Wishlist

`GET /api/wishlist`

`POST /api/wishlist/:productId`

`DELETE /api/wishlist/:productId`

## Chat

`POST /api/chats`

```json
{
  "participantId": "userId",
  "productId": "optionalProductId"
}
```

`GET /api/chats`

`GET /api/chats/:id`

## Messages

`POST /api/messages`

```json
{
  "chatId": "chatId",
  "message": "Is this available?"
}
```

`GET /api/messages/:chatId`

## Reports

`POST /api/reports`

```json
{
  "product": "productId",
  "reason": "Suspicious or duplicate listing"
}
```

`GET /api/reports` requires admin.

## Admin

All admin endpoints require an authenticated `admin` role.

`GET /api/admin/users`

`GET /api/admin/products`

`DELETE /api/admin/products/:id`

`PATCH /api/admin/users/:id/ban`

`GET /api/admin/reports`

`GET /api/admin/analytics`

## Socket.IO Events

Client connects with:

```js
io(API_URL, { auth: { token: accessToken } })
```

Client emits:

- `chat:join` with `{ chatId }`
- `chat:leave` with `{ chatId }`
- `typing:start` with `{ chatId }`
- `typing:stop` with `{ chatId }`
- `message:delivered` with `{ messageId }`
- `message:read` with `{ chatId }`

Server emits:

- `user:online`
- `user:offline`
- `message:new`
- `message:delivered`
- `message:read`
- `typing:start`
- `typing:stop`
- `notification:new`
