# DOLLÉRIA – Backend Architecture & Project Phases

## 🎯 Project Goal
Build a secure, scalable ecommerce backend for an Algerian toy brand:
- B2C (retail customers)
- B2B (wholesale partners)
- Cash on Delivery (initial phase)
- API-first architecture

---

## 🧱 Tech Stack

### Backend
- Framework: Laravel (PHP 8.2+)
- API Style: REST
- Authentication: Laravel Sanctum
- Validation: Laravel Form Requests

### Database
- MySQL / MariaDB
- Eloquent ORM

### Frontend (Consumer)
- Next.js (separate repo)
- Communicates via REST API

---

## 🗂 Core Modules

### 1. Products
- Products
- Categories
- Collections
- Age groups
- Stock & pricing

### 2. Cart
- Guest cart (session-based)
- User cart (authenticated)
- Quantity updates
- Cart persistence

### 3. Orders
- Checkout
- Order creation
- Order items
- Order statuses

### 4. Wholesale (B2B)
- Wholesale inquiry form
- Admin review
- Future: wholesale accounts & pricing

---

## 🗃 Database Entities (High Level)

### products
- id
- name
- slug
- description
- price
- category_id
- age_group
- stock
- is_featured
- created_at

### categories
- id
- name
- slug

### carts
- id
- user_id (nullable)
- session_id

### cart_items
- id
- cart_id
- product_id
- quantity

### orders
- id
- user_id (nullable)
- total_price
- status
- payment_method
- shipping_address

### order_items
- order_id
- product_id
- quantity
- price

### wholesale_inquiries
- id
- company_name
- email
- phone
- message
- status

---

## 🔌 API Endpoints (Draft)

### Products
- GET /api/products
- GET /api/products/{slug}

### Cart
- POST /api/cart/add
- PATCH /api/cart/update
- DELETE /api/cart/remove

### Checkout
- POST /api/checkout

### Wholesale
- POST /api/wholesale-inquiry

---

## 🚀 Project Phases

### Phase 1 – Core Ecommerce
- Product API
- Cart logic
- Checkout
- Orders
- Cash on Delivery

### Phase 2 – Wholesale
- Inquiry management
- B2B workflows
- Admin review

### Phase 3 – Growth
- Admin dashboard
- Inventory alerts
- Payments integration
- Multi-language support

---

## 🧩 Architecture Principles
- API-first
- Separation of concerns
- Stateless requests
- Secure-by-default
