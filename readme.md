# 👤 User API Routes

This section documents all user-related routes in the Suitcase Marketplace API.

---

## ✅ Public Routes

### `POST /signup`
- Register a new user (buyer, seller, or admin).

### `POST /login`
- Log in an existing user and receive a JWT token.

### `POST /verify-email`
- Verify a user's email using a code sent via email.

### `POST /resend-verification-code`
- Resend the email verification code to the user.

---

## 🔒 Authenticated User Routes

### `GET /profile`
- Get the logged-in user's profile information.

### `PATCH /profile`
- Update the logged-in user's profile (e.g., email, password).

---

## 🛡️ Admin Routes

### `GET /admin/users`
- View a list of all registered users (optional `?role=` filter).

### `DELETE /admin/users/:id`
- Permanently delete a user by their ID.

### `PATCH /admin/users/:id/verify`
- Manually verify a user's account (`isVerified: true`).

---
