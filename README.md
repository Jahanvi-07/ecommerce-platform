# 🧵 Niche E-Commerce Platform for Handmade Products (Desi-Etsy)

## Project Overview

A  mini e-commerce platform where **local artisans** can register, list handmade products, and customers can purchase them online, similar to Etsy but focused on niche, cultural, or local crafts.

## Key Features

**1. Artisan Features**

* Register and manage profile
* Add, edit, or delete handmade products
* Track orders for their products
* Dashboard to view sales and pending approvals

**2. Customer Features**

* Browse products by category
* Smart filters (price, category, popularity)
* Add products to cart
* Checkout via **Razorpay**
* Track order status

**3. Admin Features**

* Approve artisan registrations
* Approve or reject products
* Manage users and orders
* View sales analytics

## Tech Stack

| Layer          | Technology                        |
| -------------- | --------------------------------- |
| Frontend       | React.js, Vite, Tailwind CSS      |
| Backend        | Node.js, Express.js               |
| Database       | MongoDB with Mongoose             |
| Authentication | JWT-based login/registration      |
| Payment        | Razorpay (Test Mode for dev)      |
| Deployment     | Frontend: Vercel, Backend: Render |


## Functional Flow

1. Artisan registers → Admin approves → Artisan can add products
2. Customers browse products → Add to cart → Checkout → Payment via Razorpay
3. Orders stored in database → Artisan sees orders → Admin monitors platform


## Benefits

* Provides a **platform for local artisans** to sell online
* Supports **secure online payments**
* Lightweight and **mobile-responsive** for users
* Extensible to add new features like reviews, wishlist, or coupons


## 🔗 API Routes Overview

### 📦 Products
- `GET /api/products`
- `POST /api/products` _(artisan only)_
- `GET /api/products/:id`

### 🧾 Orders
- `POST /api/orders`
- `GET /api/orders/user/:id`
- `PUT /api/orders/:id/cancel`

### 💳 Payments (Razorpay)
- `POST /api/payment/order`


## 🔧 Environment Variables

Create a `.env` file in the backend:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<your-cluster>.mongodb.net/desi-etsy
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

## 🚀 How to Run Locally

git clone https://github.com/your-username/niche-ecommerce-platform.git
cd frontend && npm install
cd ../backend && npm install


Run
frontend
>> npm start
Backend
>> npx nodemon server.js
npm run dev
