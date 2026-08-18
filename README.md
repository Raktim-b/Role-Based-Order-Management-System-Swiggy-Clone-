# 🍔 Swiggy Clone — Food Ordering Backend

<p align="center">

![Swiggy Clone](https://capsule-render.vercel.app/api?type=waving&color=0:F76B1C,100:FF512F&height=220&section=header&text=Swiggy%20Clone&fontSize=55&fontColor=ffffff&animation=fadeIn&fontAlignY=38)

</p>

<h3 align="center">

Backend-Only Food Ordering & Role-Based Order Management System

</h3>

<p align="center">
  <b>Backend-Only Food Ordering & Role-Based Order Management System</b>
</p>

<p align="center">
A secure food-ordering backend inspired by Swiggy, built with Node.js, Express.js, MongoDB and Mongoose.
</p>

<p align="center">
  <a href="https://nodejs.org/"><img src="https://skillicons.dev/icons?i=nodejs" alt="Node.js"></a>
  <a href="https://expressjs.com/"><img src="https://skillicons.dev/icons?i=express" alt="Express.js"></a>
  <a href="https://www.mongodb.com/"><img src="https://skillicons.dev/icons?i=mongodb" alt="MongoDB"></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://skillicons.dev/icons?i=js" alt="JavaScript"></a>
  <a href="https://git-scm.com/"><img src="https://skillicons.dev/icons?i=git" alt="Git"></a>
  <a href="https://github.com/"><img src="https://skillicons.dev/icons?i=github" alt="GitHub"></a>
  <a href="https://www.postman.com/"><img src="https://skillicons.dev/icons?i=postman" alt="Postman"></a>
  <a href="https://code.visualstudio.com/"><img src="https://skillicons.dev/icons?i=vscode" alt="VS Code"></a>
</p>

<p align="center">









</p>

📌 Project Overview

This project is a backend-only food ordering platform inspired by applications such as Swiggy.

The system provides three different user roles:

👑 Admin

🏪 Restaurant Owner

👤 User

Each role has different permissions and protected APIs.

The backend provides:

🔐 JWT Authentication

♻️ Access Token & Refresh Token

🔑 Role-Based Access Control

🛡️ Secret-Key Authorization

🔒 Ownership Validation

🔐 Password Hashing using bcrypt

🏪 Restaurant Management

🍕 Food Management

🗂️ Category Management

🛒 Cart Management

📦 Order Management

🔎 Search & Filtering

✅ Joi Request Validation

⚠️ Error Handling

📊 Basic Admin Statistics

✨ Main Features

🔐 Authentication

User registration

Restaurant owner registration

Login

Email verification

Password hashing

JWT access token

JWT refresh token

Token refresh

Logout

Protected routes

👑 Admin

Admin can:

View all users

Block users

Unblock users

View all restaurants

View all orders

Create categories

Update categories

Delete categories

View basic order/revenue statistics

Admin APIs are protected using:

JWT Access Token
        +
Admin Role
        +
Secret Key

🏪 Restaurant Owner

Restaurant owners can:

Create their restaurant

View their restaurant

Update their restaurant

Manage restaurant status

Add food items

Update food items

Delete food items

Manage food availability

View their restaurant orders

Accept/reject orders

Update order status

Owners cannot access another owner's restaurant or food data.

👤 User

Users can:

Register

Login

Browse restaurants

Search food

Filter food

View categories

Add food to cart

Update cart quantity

Remove cart items

Clear cart

Place orders

View own orders

Cancel own orders

Users cannot:

Manage restaurants

Manage food items

Change order status

🧩 Order Flow

User
 │
 ├── Browse Restaurant
 │
 ├── Select Food
 │
 ├── Add Food to Cart
 │
 ├── Update Quantity
 │
 ├── Place Order
 │
 ▼
Restaurant Owner
 │
 ├── View Restaurant Orders
 │
 ├── Accept / Reject
 │
 ├── Preparing
 │
 ├── Out for Delivery
 │
 ▼
Delivered

Order Status

Pending
   ↓
Accepted
   ↓
Preparing
   ↓
Out for Delivery
   ↓
Delivered

A user can cancel their own order according to the implemented cancellation rules.

🏗️ Project Architecture

Client / Postman
       │
       ▼
     Routes
       │
       ▼
   Middleware
       │
       ├── JWT Authentication
       ├── Role Validation
       ├── Secret-Key Validation
       └── Ownership Validation
       │
       ▼
   Controller
       │
       ▼
     Model
       │
       ▼
    MongoDB

📁 Project Structure

Role-Based-Order-Management-System-Swiggy-Clone/
│
├── config/
│   ├── db.js
│   └── emailVerify.js
│
├── controller/
│   ├── authController.js
│   ├── userController.js
│   ├── categoryController.js
│   ├── restaurantController.js
│   ├── foodController.js
│   ├── cartController.js
│   └── orderController.js
│
├── middleware/
│   ├── authCheck.js
│   ├── roleCheck.js
│   └── secretKey.js
│
├── model/
│   ├── userModel.js
│   ├── verificationModel.js
│   ├── categoryModel.js
│   ├── restaurantModel.js
│   ├── foodModel.js
│   ├── cartModel.js
│   └── orderModel.js
│
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── categoryRoutes.js
│   ├── restaurantRoutes.js
│   ├── foodRoutes.js
│   ├── cartRoutes.js
│   └── orderRoutes.js
│
├── validation/
│   ├── authValidation.js
│   ├── categoryValidation.js
│   ├── restaurantValidation.js
│   └── foodValidation.js
│
├── utils/
│   ├── httpStatusCode.js
│   ├── logger.js
│   └── sendEmail.js
│
├── uploads/
├── .env
├── .gitignore
├── package.json
└── server.js

🗄️ Database Models

👤 User

User
├── name
├── email
├── password
├── role
├── profileImage
├── phone
├── isBlocked
├── isVerified
├── refreshToken
├── createdAt
└── updatedAt

🏪 Restaurant

Restaurant
├── ownerId
├── restaurantName
├── description
├── address
├── phone
├── image
├── isDeleted
├── createdAt
└── updatedAt

🍕 Food

Food
├── ownerId
├── restaurantId
├── categoryId
├── foodName
├── description
├── price
├── image
├── foodType
├── isAvailable
├── isDeleted
├── createdAt
└── updatedAt

🗂️ Category

Category
├── name
├── description
├── isDeleted
├── createdAt
└── updatedAt

🛒 Cart

Cart
├── userId
├── items
│   ├── foodId
│   ├── quantity
│   └── price
├── totalPrice
├── createdAt
└── updatedAt

📦 Order

Order
├── userId
├── restaurantId
├── items
│   ├── foodId
│   ├── foodName
│   ├── quantity
│   └── price
├── totalPrice
├── status
├── createdAt
└── updatedAt

🔐 Authentication Flow

Register
   ↓
Password Hashing
   ↓
Save User
   ↓
Email Verification
   ↓
Login
   ↓
Access Token + Refresh Token
   ↓
Protected API
   ↓
JWT Verification
   ↓
Role Check
   ↓
Controller

Access Token

The access token is used for protected API requests.

Example:

Authorization: Bearer <accessToken>

Refresh Token

The refresh token is used to generate a new access token when the access token expires.

🛡️ Role-Based Access Control

Feature

Admin

Restaurant Owner

User

Register/Login

✅

✅

✅

View Users

✅

❌

❌

Block/Unblock Users

✅

❌

❌

Manage Categories

✅

❌

❌

Create Restaurant

❌

✅

❌

Update Own Restaurant

❌

✅

❌

Add Food

❌

✅

❌

Update Own Food

❌

✅

❌

Delete Own Food

❌

✅

❌

Browse Restaurants

✅

✅

✅

Browse Food

✅

✅

✅

Cart

❌

❌

✅

Place Order

❌

❌

✅

View Own Orders

❌

❌

✅

Cancel Own Order

❌

❌

✅

View Restaurant Orders

❌

✅

❌

Accept/Reject Orders

❌

✅

❌

Update Order Status

❌

✅

❌

View All Orders

✅

❌

❌

🔎 MongoDB Aggregation & Lookup

The project uses MongoDB aggregation for APIs where related information is required.

Example:

const orders = await orderModel.aggregate([
  {
    $match: {
      userId: new mongoose.Types.ObjectId(req.user.id),
    },
  },
  {
    $lookup: {
      from: "restaurants",
      localField: "restaurantId",
      foreignField: "_id",
      as: "restaurant",
    },
  },
  {
    $unwind: "$restaurant",
  },
  {
    $sort: {
      createdAt: -1,
    },
  },
]);

This allows order data to be returned together with restaurant information.

🔍 Search & Filter

Food can be searched and filtered by:

🍕 Food name

🗂️ Category

🥗 Veg / Non-Veg

💰 Price

🏪 Restaurant

Restaurant search supports:

Restaurant name

Location/address

🛒 Cart Management

The cart belongs to the authenticated user.

Supported operations:

Add Food
   ↓
Increase Quantity
   ↓
Decrease Quantity
   ↓
Remove Food
   ↓
Clear Cart
   ↓
Place Order

The backend calculates the cart total using:

price × quantity

📦 Order Management

User APIs

POST   /orders
GET    /orders/my-orders
PATCH  /orders/:id/cancel

Restaurant Owner APIs

GET    /orders/restaurant
PATCH  /orders/:id/accept
PATCH  /orders/:id/reject
PATCH  /orders/:id/status

Admin APIs

GET    /orders

👑 Admin User Management

Admin can view all users:

GET /api/v1/users

Admin can block a user:

PATCH /api/v1/users/:id/block

Admin can unblock a user:

PATCH /api/v1/users/:id/unblock

The isBlocked field controls whether a user can access the platform.

🔒 Ownership Validation

Ownership validation prevents one restaurant owner from modifying another owner's data.

Example:

const food = await foodModel.findOne({
  _id: req.params.id,
  ownerId: req.user.id,
  isDeleted: false,
});

If the food does not belong to the logged-in owner, the API returns an error.

This same concept is used for:

Restaurants

Food items

Restaurant orders

User carts

User orders

✅ Request Validation

Joi is used to validate incoming request data.

Example:

const { error, value } = registerValidation.validate(req.body);

if (error) {
  return res.status(400).json({
    success: false,
    message: error.details[0].message,
  });
}

Validation is implemented for:

Registration

Login

Category

Restaurant

Food

Other required request bodies

🛡️ Security Features

The project implements:

JWT authentication

Refresh token authentication

Password hashing using bcrypt

Role-based authorization

Secret-key authorization

Ownership validation

Joi validation

Protected routes

Environment variables

Proper HTTP status codes

Centralized error responses

Soft deletion for applicable resources

📡 API Modules

Authentication

POST /api/v1/auth/register
POST /api/v1/auth/register-owner
POST /api/v1/auth/login
GET  /api/v1/auth/verify/:token
POST /api/v1/auth/refresh-token
POST /api/v1/auth/logout

Users

GET   /api/v1/users
PATCH /api/v1/users/:id/block
PATCH /api/v1/users/:id/unblock

Categories

POST   /api/v1/categories
GET    /api/v1/categories
PUT    /api/v1/categories/:id
DELETE /api/v1/categories/:id

Restaurants

POST /api/v1/restaurants
GET  /api/v1/restaurants
GET  /api/v1/restaurants/my
PUT  /api/v1/restaurants/:id

Food

POST   /api/v1/foods
GET    /api/v1/foods
PUT    /api/v1/foods/:id
DELETE /api/v1/foods/:id

Cart

POST   /api/v1/cart
GET    /api/v1/cart
PATCH  /api/v1/cart/:foodId
DELETE /api/v1/cart/:foodId
DELETE /api/v1/cart/clear

Orders

POST  /api/v1/orders
GET   /api/v1/orders/my-orders
PATCH /api/v1/orders/:id/cancel

GET   /api/v1/orders/restaurant
PATCH /api/v1/orders/:id/accept
PATCH /api/v1/orders/:id/reject
PATCH /api/v1/orders/:id/status

GET   /api/v1/orders

Adjust route paths according to the final route files in the project.

🧪 API Testing

The APIs were tested using Postman.

Typical protected request:

Authorization: Bearer YOUR_ACCESS_TOKEN

For admin APIs, the request also requires the configured secret key.

Example:

x-secret-key: YOUR_ADMIN_SECRET_KEY

⚙️ Installation

1. Clone the repository

git clone https://github.com/Raktim-b/Role-Based-Order-Management-System-Swiggy-Clone.git

2. Move into the project

cd Role-Based-Order-Management-System-Swiggy-Clone

3. Install dependencies

npm install

4. Create .env

Example:

PORT=4036

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_access_token_secret

JWT_REFRESH_SECRET=your_refresh_token_secret

ADMIN_SECRET_KEY=your_admin_secret_key

EMAIL_FROM=your_email

EMAIL_USER=your_email

EMAIL_PASSWORD=your_email_password

5. Start the server

npm start

For development:

npm run dev

📦 Main Dependencies

express
mongoose
jsonwebtoken
bcrypt / bcryptjs
joi
dotenv
nodemailer
winston
cookie-parser
cors

🚨 HTTP Status Codes

The project uses proper HTTP status codes.

200 → Success
201 → Created
400 → Bad Request
401 → Unauthorized
403 → Forbidden
404 → Not Found
500 → Internal Server Error

🎯 Project Objectives Completed

JWT Authentication

Access Token

Refresh Token

Password Hashing

Role-Based Access Control

Email Verification

Restaurant Management

Food Management

Category Management

Cart Management

Order Management

Ownership Validation

Search & Filtering

Admin User Management

Block/Unblock Users

Aggregation & $lookup

Joi Validation

Error Handling

HTTP Status Codes

Environment Variables

Postman API Testing

🚀 Future Improvements

Possible future improvements include:

💳 Online payment integration

📍 Live order tracking

⭐ Restaurant and food reviews

🔔 Real-time notifications using Socket.IO

📱 Frontend using React.js

🗺️ Google Maps integration

📊 Advanced admin dashboard

📈 Detailed revenue analytics

🧾 Invoice generation

☁️ Cloudinary image upload

🚚 Delivery partner management

👨‍💻 Author

Raktim Bhattacharya

Backend Developer | Node.js | Express.js | MongoDB

<p align="center">

⭐ If you find this project useful, consider giving it a star!

</p>

<p align="center">



</p>

<p align="center">

<b>{=html}🍔 Swiggy Clone Backend • Built with Node.js &
MongoDB</b>{=html}

</p>
