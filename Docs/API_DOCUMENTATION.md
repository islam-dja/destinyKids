# Destiny-KIDS API Documentation

Welcome to the Destiny-KIDS backend API documentation. This document is intended for the frontend development department to facilitate seamless integration with the platform.

## Base Information
- **Base URL**: `http://localhost:8000/api/v1` (Development)
- **Version**: `1.0.0`
- **Content-Type**: `application/json`
- **Accept**: `application/json`

## Authentication
The API uses **Laravel Sanctum** for authentication.

### Login
- **Endpoint**: `/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password"
  }
  ```
- **Response**: Returns a Bearer Token.

### Protected Requests
Include the token in the headers:
`Authorization: Bearer {token}`

---

## 🛍️ Products
Endpoints for browsing and searching items.

### List Products
- **Endpoint**: `/products`
- **Method**: `GET`
- **Query Params**:
  - `category` (string): Filter by category slug.
  - `age_group` (string): Filter by age group slug.
  - `featured` (boolean): Show featured items.
  - `search` (string): Search by name/description.
  - `sort` (string): `price`, `created_at`, `name` (default: `created_at`).
  - `direction` (string): `asc`, `desc` (default: `desc`).
  - `per_page` (int): Items per page (default: `12`).

### Product Detail
- **Endpoint**: `/products/{slug}`
- **Method**: `GET`

---

## 🛒 Shopping Cart
Supports both guest and authenticated users.

### Identify Guest Cart
For guests, provide a unique identifier in the headers:
`X-Guest-Token: {guest_id}`

### Get Cart
- **Endpoint**: `/cart`
- **Method**: `GET`

### Add to Cart
- **Endpoint**: `/cart/add`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "product_id": 1,
    "quantity": 2
  }
  ```

### Update Item
- **Endpoint**: `/cart/update/{itemId}`
- **Method**: `PATCH`
- **Body**: `{"quantity": 3}`

### Remove Item
- **Endpoint**: `/cart/remove/{itemId}`
- **Method**: `DELETE`

### Clear Cart
- **Endpoint**: `/cart/clear`
- **Method**: `DELETE`

---

## 💳 Checkout
Placement of orders using Cash on Delivery.

### Place Order
- **Endpoint**: `/checkout`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "phone": "0555000000",
    "wilaya": "Algiers",
    "commune": "Casbah",
    "address": "123 Street Name",
    "postal_code": "16000",
    "notes": "Optional delivery notes"
  }
  ```

---

## 🤝 Wholesale
Endpoints for B2B inquiries and admin management.

### Submit Inquiry (Public)
- **Endpoint**: `/wholesale/inquiry`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "company_name": "Toy Store Inc",
    "contact_person": "Jane Doe",
    "email": "jane@example.com",
    "phone": "0666000000",
    "business_type": "Retailer",
    "message": "Interested in bulk Kabyle dolls."
  }
  ```

### Admin Management (Protected: `admin, manager`)
- **Stats**: `GET /admin/wholesale/stats`
- **List Inquiries**: `GET /admin/wholesale/inquiries`
- **Inquiry Detail**: `GET /admin/wholesale/inquiries/{id}`
- **Update Status**: `PATCH /admin/wholesale/inquiries/{id}`
- **Bulk Update**: `POST /admin/wholesale/inquiries/bulk-update`
- **Export CSV**: `GET /admin/wholesale/inquiries/export`
- **Convert to User**: `POST /admin/wholesale/inquiries/{id}/convert`

---

## 📦 User Orders
Retrieve order history for authenticated users.

### List My Orders
- **Endpoint**: `/orders`
- **Method**: `GET`

### Order Detail
- **Endpoint**: `/orders/{id}`
- **Method**: `GET`

---

## Standard Responses

### Success (200 OK)
```json
{
  "status": "success",
  "data": { ... },
  "message": "Action completed"
}
```

### Error (422 Unprocessable Entity)
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "field": ["Error message"]
  }
}
```

### Not Found (404)
```json
{
  "status": "error",
  "message": "Resource not found"
}
```
