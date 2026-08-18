# 🍔 Swiggy Clone — Food Ordering Backend

<p align="center">

![Swiggy Clone](https://capsule-render.vercel.app/api?type=waving&color=0:F76B1C,100:FF512F&height=220&section=header&text=Swiggy%20Clone&fontSize=55&fontColor=ffffff&animation=fadeIn&fontAlignY=38)

</p>

<h3 align="center">

Backend-Only Food Ordering & Role-Based Order Management System

</h3>

<p align="center">

A secure and role-based food ordering backend inspired by Swiggy, built
with Node.js, Express.js, MongoDB and Mongoose.

</p>

<p align="center">

<img src="https://skillicons.dev/icons?i=nodejs,express,mongodb,javascript,git,github,postman,vscode" />{=html}

</p>

<p align="center">

<img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" />{=html}
<img src="https://img.shields.io/badge/Express.js-Framework-000000?style=for-the-badge&logo=express&logoColor=white" />{=html}
<img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />{=html}
<img src="https://img.shields.io/badge/Mongoose-ODM-880000?style=for-the-badge&logo=mongoose&logoColor=white" />{=html}
<img src="https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />{=html}
<img src="https://img.shields.io/badge/Joi-Validation-8E44AD?style=for-the-badge" />{=html}
<img src="https://img.shields.io/badge/Postman-API_Testing-FF6C37?style=for-the-badge&logo=postman&logoColor=white" />{=html}

</p>

📌 Project Overview

This project is a backend-only food ordering platform inspired by
modern food delivery applications such as Swiggy.

The system is designed around three main roles:

👑 Admin

🏪 Restaurant Owner

👤 User

Each role has different permissions and protected APIs.

The backend provides:

🔐 JWT authentication

🔄 Access Token and Refresh Token

🔑 Admin Secret-Key Authorization

🛡️ Role-Based Access Control

👤 User management

🏪 Restaurant management

🍕 Food management

🗂️ Category management

🛒 Cart management

📦 Order management

🔎 Search and filtering

🔗 MongoDB Aggregation and $lookup

✅ Joi request validation

🚨 Error handling

🔒 Ownership validation

🎯 Project Objectives

The main objective is to build a practical REST API for a food ordering
platform while implementing real-world backend concepts.

Core objectives

Implement secure user authentication

Implement JWT Access Token

Implement JWT Refresh Token

Hash passwords using bcryptjs

Implement Role-Based Access Control

Implement Admin Secret-Key Authorization

Validate resource ownership

Manage restaurants

Manage food items

Manage food categories

Manage user carts

Place and manage orders

Implement search and filtering

Use Joi for request validation

Use MongoDB aggregation and $lookup

Use proper HTTP status codes

Implement centralized error handling

Store sensitive configuration using environment variables

✨ Features

🔐 Authentication & Authorization

User registration

User login

User logout

Email verification

JWT Access Token

JWT Refresh Token

Protected routes

Password hashing using bcryptjs

Role-Based Access Control

JWT verification middleware

Bearer Token authentication

Admin Secret-Key Authorization

Ownership validation

Token expiration

Joi request validation

Authentication Flow

                    REGISTER
                       │
                       ▼
                Validate Request
                       │
                       ▼
                Hash Password
                   bcryptjs
                       │
                       ▼
                  Create User
                       │
                       ▼
                Email Verification
                       │
                       ▼
                     LOGIN
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
       Access Token        Refresh Token
             │                   │
             ▼                   ▼
      Protected APIs      Generate New Token

Protected APIs use:

Authorization: Bearer ACCESS_TOKEN

👑 Admin Module

The Admin has access to platform-level management.

Admin can:

View all users

Block users

Unblock users

View all restaurants

View all orders

Create categories

Update categories

Delete categories

View basic platform statistics

View order statistics

View revenue statistics

Admin security

Admin APIs are protected using:

Admin JWT Token
       │
       ▼
Secret Key
       │
       ▼
Role Validation
       │
       ▼
Admin Controller
       │
       ▼
Database

The Admin Secret Key is stored inside .env and should never be
hard-coded.

🏪 Restaurant Owner Module

Restaurant owners can manage their own restaurant and its food items.

Restaurant Management

Restaurant owners can:

Create restaurant

View their own restaurant

Update their own restaurant

Manage restaurant status

Soft-delete their restaurant

Restaurant ownership is checked using the authenticated user's ID.

Logged-in Restaurant Owner
            │
            ▼
       Find Restaurant
            │
            ▼
ownerId === req.user.id
            │
       ┌────┴────┐
       ▼         ▼
      YES        NO
       │         │
       ▼         ▼
    Allow      Deny

A restaurant owner cannot update or access another owner's restaurant.

🍕 Food Management

Restaurant owners can:

Add food items

View food items

Update food items

Delete food items

Manage food availability

Each food item is connected to:

Food
 │
 ├── restaurantId ───► Restaurant
 │
 └── categoryId ─────► Category

Food information can include:

Food name

Description

Price

Image

Food type

Availability

Restaurant ID

Category ID

Delete status

MongoDB aggregation and $lookup are used to display related restaurant
and category information together.

🗂️ Category Management

Categories are managed by the Admin.

Admin

Create category

Read categories

Update category

Delete category

User / Restaurant Owner

View categories

Example categories:

🍛 Biryani
🍕 Pizza
🍔 Burgers
🥘 South Indian
🍜 Chinese
🍰 Desserts

👤 User Module

Users can:

Register

Login

Browse restaurants

Search restaurants

Search food

Filter food

View categories

Add food to cart

Increase cart quantity

Decrease cart quantity

Remove cart items

View cart

Clear cart

Calculate cart total

Place orders

View their own orders

Cancel their own orders

Users cannot:

Manage restaurants

Manage food items

Manage categories

Accept or reject orders

Change restaurant order status

Access another user's orders

🔎 Search & Filter

The food platform supports basic search and filtering.

Search

Restaurant name

Food name

Filter

Category

Veg / Non-Veg

Minimum price

Maximum price

Food availability

Example:

Search        : Biryani
Food Type     : non-veg
Minimum Price : 200
Maximum Price : 500

The backend can use MongoDB query conditions and regular expressions for
flexible searching.

🛒 Cart Management

Each authenticated user has their own cart.

Users can:

Add food to cart

Increase quantity

Decrease quantity

Remove food

View cart

Clear cart

Calculate total price

Cart relationship:

User
 │
 ▼
Cart
 │
 ├── Food Item
 │      └── Quantity
 │
 ├── Food Item
 │      └── Quantity
 │
 └── Total Price

Before creating an order, the backend checks that food items:

Exist

Are not deleted

Are available

📦 Order Management

The order system is role-based.

👤 User

Users can:

Place orders

View their own orders

Cancel their own pending orders

🏪 Restaurant Owner

Restaurant owners can:

View orders belonging to their restaurant

Accept orders

Reject orders

Update order status

👑 Admin

Admins can:

View all orders

Manage platform orders

View order statistics

View revenue statistics

🔄 Order Status Workflow

                    User
                      │
                      ▼
                Add Food to Cart
                      │
                      ▼
                  Place Order
                      │
                      ▼
                   Pending
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
      Cancelled                Accepted
                                  │
                                  ▼
                              Preparing
                                  │
                                  ▼
                           Out for Delivery
                                  │
                                  ▼
                              Delivered

🔗 MongoDB Aggregation & $lookup

MongoDB aggregation is used when related information needs to be
returned together.

Food Example

Food
 │
 ├── $lookup → Restaurant
 │
 └── $lookup → Category

The API can return:

{
  "foodName": "Chicken Biryani",
  "price": 250,
  "restaurant": {
    "restaurantName": "Spice Garden Restaurant"
  },
  "category": {
    "name": "Biryani"
  }
}

Order Example

Order
 │
 ├── $lookup → User
 │
 └── $lookup → Restaurant

This allows the backend to return useful related data without making
separate API calls.

Common aggregation stages

$match
   │
   ▼
$lookup
   │
   ▼
$unwind
   │
   ▼
$lookup
   │
   ▼
$sort
   │
   ▼
$project

🛡️ Ownership Validation

Ownership validation prevents one user from accessing another user's
resources.

Restaurant ownership

ownerId === req.user.id

User order ownership

userId === req.user.id

Cart ownership

userId === req.user.id

This ensures that users and restaurant owners can only access resources
they are authorized to manage.

👥 Role & Permission Matrix

Feature                   👑 Admin   🏪 Restaurant Owner   👤 User

Register / Login             ✅              ✅              ✅
View All Users               ✅              ❌              ❌
Block / Unblock Users        ✅              ❌              ❌
Create Restaurant            ❌              ✅              ❌
View Restaurants             ✅              ✅              ✅
Update Own Restaurant        ❌              ✅              ❌
Manage Own Food              ❌              ✅              ❌
Manage Categories            ✅              ❌              ❌
View Categories              ✅              ✅              ✅
Manage Cart                  ❌              ❌              ✅
Place Order                  ❌              ❌              ✅
View Own Orders              ❌              ❌              ✅
Cancel Own Order             ❌              ❌              ✅
View Restaurant Orders       ❌              ✅              ❌
Accept / Reject Orders       ❌              ✅              ❌
Update Order Status          ❌              ✅              ❌
View All Orders              ✅              ❌              ❌
View Statistics              ✅              ❌              ❌

🏗️ System Architecture

                         ┌───────────────────┐
                         │      Postman      │
                         │     API Client    │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │  Express Router   │
                         │ Validation / RBAC  │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │ Authentication     │
                         │ Middleware         │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │ Role Validation   │
                         │ Ownership Check   │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │    Controller     │
                         │ Business Logic    │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │     Mongoose      │
                         │ CRUD / Aggregation│
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │      MongoDB      │
                         └───────────────────┘

🗄️ Database Structure

Main MongoDB collections:

users
   │
   ├── restaurants
   │      │
   │      └── foods
   │             │
   │             └── categories
   │
   ├── carts
   │      │
   │      └── food items
   │
   └── orders
          ├── user
          ├── restaurant
          └── food items

emailVerifications

Main Models

User

Restaurant

Food

Category

Cart

Order

EmailVerification

📁 Project Structure

Swiggy-Clone/
│
├── config/
│   ├── db.js
│   └── emailVerify.js
│
├── controller/
│   ├── auth/
│   ├── admin/
│   ├── restaurant/
│   ├── food/
│   ├── category/
│   ├── cart/
│   └── order/
│
├── middleware/
│   ├── AuthCheck.js
│   ├── allowRoles.js
│   └── errorHandler.js
│
├── model/
│   ├── userModel.js
│   ├── restaurantModel.js
│   ├── foodModel.js
│   ├── categoryModel.js
│   ├── cartModel.js
│   ├── orderModel.js
│   └── verificationModel.js
│
├── routes/
│   ├── authRouter.js
│   ├── adminRouter.js
│   ├── restaurantRouter.js
│   ├── foodRouter.js
│   ├── categoryRouter.js
│   ├── cartRouter.js
│   └── orderRouter.js
│
├── validation/
│   ├── authValidation.js
│   ├── restaurantValidation.js
│   ├── foodValidation.js
│   └── categoryValidation.js
│
├── utils/
│   ├── httpStatusCode.js
│   └── logger.js
│
├── .env
├── .gitignore
├── app.js
├── server.js
├── package.json
└── README.md

.env must never be committed to GitHub.

🛠️ Technology Stack

Backend

Node.js

Express.js

JavaScript

Database

MongoDB

Mongoose

Authentication & Security

JWT

bcryptjs

Role-Based Access Control

Secret-Key Authorization

Ownership Validation

dotenv

Validation

Joi

Image & File Handling

Multer

Cloudinary

Development & Testing

Git

GitHub

VS Code

Postman

Nodemon

📡 API Modules

The backend is organized into separate API modules.

/api/v1/auth
       │
       ├── Register
       ├── Login
       ├── Logout
       ├── Refresh Token
       └── Verify Email


/api/v1/admin
       │
       ├── Users
       ├── Restaurants
       ├── Categories
       └── Orders


/api/v1/restaurant
       │
       ├── Create Restaurant
       ├── Read Own Restaurant
       └── Update Own Restaurant


/api/v1/food
       │
       ├── Add Food
       ├── View Food
       ├── Update Food
       └── Delete Food


/api/v1/category
       │
       ├── Create Category
       ├── Read Category
       ├── Update Category
       └── Delete Category


/api/v1/cart
       │
       ├── Add Food
       ├── Update Quantity
       ├── Remove Food
       ├── View Cart
       └── Clear Cart


/api/v1/order
       │
       ├── Place Order
       ├── View Own Orders
       ├── Cancel Order
       ├── Restaurant Orders
       ├── Accept Order
       ├── Reject Order
       ├── Update Status
       └── View All Orders

🧪 API Testing with Postman

The APIs can be tested using Postman.

Authentication

1. Register
      ↓
2. Verify Email
      ↓
3. Login
      ↓
4. Receive Access Token
      ↓
5. Send Access Token
      ↓
6. Access Protected API

Authorization header

Authorization: Bearer YOUR_ACCESS_TOKEN

In Postman:

Authorization
    │
    ├── Type: Bearer Token
    │
    └── Token: YOUR_ACCESS_TOKEN

For Admin APIs, the required secret key should also be supplied
according to the API implementation.

⚙️ Installation

1. Clone the Repository

git clone https://github.com/Raktim-b/Role-Based-Order-Management-System-Swiggy-Clone-.git

2. Navigate to the Project

cd Role-Based-Order-Management-System-Swiggy-Clone-

3. Install Dependencies

npm install

4. Create .env

Create a .env file in the project root.

PORT=4036

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_token_secret

ADMIN_SECRET_KEY=your_admin_secret_key

EMAIL_HOST=your_email_host
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password
EMAIL_FROM=your_email

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Never upload real database passwords, JWT secrets, email passwords or
Cloudinary credentials to GitHub.

5. Start Development Server

npm run dev

6. Start Production Server

npm start

Local API

http://localhost:4036

📊 Basic Admin Statistics

The Admin module can provide basic platform information such as:

Total users

Total restaurant owners

Total restaurants

Total food items

Total orders

Total delivered orders

Total cancelled orders

Total revenue

Example:

┌─────────────────────┐
│ Total Users         │
│        120          │
└─────────────────────┘

┌─────────────────────┐
│ Restaurants         │
│         25          │
└─────────────────────┘

┌─────────────────────┐
│ Total Orders        │
│        450          │
└─────────────────────┘

┌─────────────────────┐
│ Total Revenue       │
│     ₹1,25,000       │
└─────────────────────┘

🔒 Security

Security is an important part of this project.

Implemented security concepts

Password hashing with bcryptjs

JWT Access Token

JWT Refresh Token

Token expiration

Protected routes

Role validation

Admin Secret-Key Authorization

Ownership validation

Joi request validation

Environment variables

Proper HTTP status codes

Centralized error handling

Soft deletion for selected resources

Secure request flow

Client
  │
  ▼
Bearer Access Token
  │
  ▼
JWT Verification
  │
  ▼
Role Check
  │
  ▼
Ownership Check
  │
  ▼
Request Validation
  │
  ▼
Controller
  │
  ▼
MongoDB

🚨 Error Handling

The application uses consistent HTTP status codes and JSON responses.

Example:

{
  "success": false,
  "message": "Restaurant not found"
}

Common status codes:

Status   Meaning

200    Success
201    Created
400    Bad Request
401    Unauthorized
403    Forbidden
404    Not Found
409    Conflict
500    Internal Server Error

🔄 Complete Project Workflow

                    USER
                     │
                     ▼
                  Register
                     │
                     ▼
               Email Verify
                     │
                     ▼
                   Login
                     │
                     ▼
              Access Token
                     │
                     ▼
              Browse Food
                     │
                     ▼
               Add to Cart
                     │
                     ▼
                Place Order
                     │
                     ▼
                  Pending
                     │
                     ▼
              Restaurant Owner
                     │
              ┌──────┴──────┐
              ▼             ▼
           Accept         Reject
              │
              ▼
          Preparing
              │
              ▼
       Out for Delivery
              │
              ▼
          Delivered

🧠 Skills Demonstrated

This project demonstrates practical backend development skills in:

Node.js

Express.js

JavaScript

MongoDB

Mongoose

MVC Architecture

REST API Development

JWT Authentication

Access Tokens

Refresh Tokens

Role-Based Access Control

Password Hashing

Joi Validation

MongoDB Aggregation

MongoDB $lookup

CRUD Operations

Ownership Validation

Restaurant Management

Food Management

Category Management

Cart Management

Order Management

Search & Filtering

Error Handling

HTTP Status Codes

Environment Variables

Multer

Cloudinary

Postman API Testing

Git & GitHub

💡 Project Highlights

Area                Implementation

Architecture        MVC
Runtime             Node.js
Framework           Express.js
Database            MongoDB
ODM                 Mongoose
Authentication      JWT
Authorization       RBAC
Password Security   bcryptjs
Validation          Joi
Image Upload        Multer + Cloudinary
Database Queries    Mongoose
Advanced Queries    Aggregation + $lookup
API Testing         Postman
Roles               Admin, Restaurant Owner, User
Cart                User Based
Orders              Role Based
Ownership           User / Restaurant Validation
Admin Security      JWT + Secret Key

🚀 Future Enhancements

The project can be extended with:

💳 Online payment integration

📍 Live order tracking

🚴 Delivery partner module

⭐ Restaurant ratings and reviews

⭐ Food ratings and reviews

❤️ Wishlist

🎟️ Coupons and discounts

📍 Multiple delivery addresses

🔔 Push notifications

⚡ Redis caching

📊 Advanced analytics

📄 Pagination

📚 Swagger API documentation

🧪 Automated unit and integration testing

🔔 Real-time order notifications

🤝 Contributing

Contributions are welcome.

git checkout -b feature/new-feature

git add .

git commit -m "feat: add new feature"

git push origin feature/new-feature

Then create a Pull Request.

📄 License

This project is developed for educational, assessment, portfolio, and
demonstration purposes.

👨‍💻 Author

Raktim Bhattacharya

Backend Developer

Node.js • Express.js • MongoDB • Mongoose • JavaScript • JWT

GitHub

https://github.com/Raktim-b/Role-Based-Order-Management-System-Swiggy-Clone-.git

⭐ Why This Project?

This project goes beyond a simple CRUD application.

It demonstrates a complete backend workflow involving:

👑 Role-Based Access

🔐 JWT Authentication

🔑 Access & Refresh Tokens

🛡️ Ownership Validation

🔒 Admin Secret-Key Authorization

🔐 Password Hashing

🏪 Restaurant Management

🍕 Food Management

🗂️ Category Management

🛒 Cart Management

📦 Order Management

🔎 Search & Filtering

🔗 MongoDB Aggregation

🔍 MongoDB $lookup

📊 Admin Statistics

✅ Joi Validation

🚨 Error Handling

🧪 Postman API Testing

The project follows a practical backend architecture with
authentication, authorization, validation, ownership checks, database
relationships, aggregation and role-based order workflows.

<p align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:FF6B35,50:FF8A4C,100:E85D04&height=120&section=footer" />{=html}

</p>

<p align="center">

<b>{=html}🍔 Swiggy Clone Backend • Built with Node.js &
MongoDB</b>{=html}

</p>
