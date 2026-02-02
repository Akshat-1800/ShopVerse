
# 🛒 ShopVerse – Full Stack E-Commerce Web Application

ShopVerse is a full-stack e-commerce web application built using **Next.js (App Router)**, **MongoDB**, and **NextAuth.js**.  
The project is developed **for learning and demonstration purposes**, focusing on real-world application architecture, authentication, role-based access control, cart & order flow, and payment integration.

---

## 🚀 Features

### 👤 Authentication & Authorization
- User authentication using **NextAuth.js**
- Role-based access:
  - **Customer**
  - **Seller**
  - **Admin**
- Secure session handling with JWT
- Auto-login after successful registration
- Protected routes using **Next.js Middleware**

---

### 🛍️ Customer Features
- Browse products
- Add products to cart
- Update and remove cart items
- Checkout with delivery address
- View order history
- Secure online payment using **Razorpay**
- Stock updates after successful payment

---

### 🏪 Seller Features
- Seller-specific dashboard
- Add new products
- Manage own listed products
- Role-based redirection after login

---

### 🛠️ Admin Features
- Admin-only access
- View all users
- View all products
- Delete products
- Basic administrative control

---

### 💳 Payment Integration
- Integrated **Razorpay (Test Mode)**
- Secure payment verification
- Order status updated only after successful payment
- Stock reduced only after payment verification

---

## 🧑‍💻 Tech Stack

### Frontend
- **Next.js 13+ (App Router)**
- **React**
- **Tailwind CSS**

### Backend
- **Next.js API Routes**
- **MongoDB Atlas**
- **Mongoose**

### Authentication
- **NextAuth.js**
- Credentials Provider
- JWT-based sessions

### Payments
- **Razorpay**

---

## 📂 Project Structure (Simplified)

```

app/
├── api/
│   ├── auth/
│   ├── register/
│   ├── cart/
│   ├── orders/
│   ├── payment/
│   └── admin/
├── login/
├── register/
├── products/
├── cart/
├── checkout/
├── payment/
├── orders/
└── seller/
models/
├── User.js
├── Product.js
└── Orders.js
lib/
└── db.js
middleware.js

````

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
````

⚠️ **Do not commit `.env.local` to GitHub.**

---

## ▶️ How to Run Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open 👉 `http://localhost:3000`

---

## 🧪 Demo Notes

* Razorpay is used in **test mode**
* Images are hosted on **Cloudinary** 
* Orders, users, and products are stored in MongoDB Atlas

---

## ⚠️ Limitations (Intentional – Demo Purpose)

This project is built for **learning and demonstration**, not full production use.

### Current Limitations:

* ❌ Product ratings and reviews are **not implemented**
* ❌ Limited number of products (demo data only)
* ❌ Shipping and delivery status tracking is **not available**
* ❌ No order cancellation or refund flow
* ❌ Admin controls are basic (no analytics/dashboard)
* ❌ No email notifications
* ❌ No password reset or email verification


---

## 📌 Future Enhancements

* Product reviews & ratings
* Order shipping lifecycle (Shipped / Delivered)
* Advanced admin dashboard
* Email notifications
* Password reset & email verification
* Better seller analytics
* Webhooks for payment reliability
* Performance optimizations

---

## 🎓 Project Purpose

This project was created as a **learning-oriented full-stack application** to understand:

* Real-world authentication flows
* Role-based authorization
* Secure payments
* Backend-driven order lifecycle
* Clean Next.js architecture

---

## 👨‍💻 Author

**Akshat Jaiswal**
Full-Stack Developer | Computer Science Student

---

## 📜 License

This project is for **educational purposes only**.


```
