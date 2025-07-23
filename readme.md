## ✅ User Routes

### `POST /signup`
- Register a new user (buyer, seller, or admin).
- Sends a verification code to the user's email.

### `POST /login`
- Log in an existing user and receive a JWT token.
- Only verified users can log in.

### `POST /logout`
- Log out the current user by clearing the auth token cookie.

### `POST /verify-email`
- Verify a user's email using the verification code sent during signup.

### `GET /check-auth`
- Check if the user is authenticated.
- Returns the user's profile data if logged in.

---

## ✅ Seller Routes (Require Authentication)

### `POST /seller/products`
- Add a new suitcase product to the seller's inventory.

### `GET /seller/products`
- Retrieve all products added by the logged-in seller.

### `PATCH /seller/products/:id`
- Mark a specific product as sold (`isSold: true`).

---

## ✅ Order Routes (Require Authentication)

### `POST /orders`
- Place a new order for a product.

### `GET /orders`
- Retrieve all orders placed by the logged-in buyer.

---

## ✅ Admin Routes

### `GET /admin/users`
- List all users with an optional query filter by role.
- Example: `/admin/users?role=buyer`

### `DELETE /admin/users/:id`
- Permanently delete a user by their ID.

---