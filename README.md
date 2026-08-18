# 🍔 Swiggy Clone — Food Ordering Backend

<p align="center">

![Swiggy Clone](https://capsule-render.vercel.app/api?type=waving&color=0:F76B1C,100:FF512F&height=220&section=header&text=Swiggy%20Clone&fontSize=55&fontColor=ffffff&animation=fadeIn&fontAlignY=38)

</p>

**Backend Food Ordering Platform with Role-Based Order Management**

A secure backend-only food ordering platform built using **Node.js, Express.js, MongoDB and Mongoose**, supporting Admin, Restaurant Owner and User roles.

---

## 🛠️ Tech Stack

<p align="center">

![Node.js](https://skillicons.dev/icons?i=nodejs)
![Express.js](https://skillicons.dev/icons?i=express)
![MongoDB](https://skillicons.dev/icons?i=mongodb)
![JavaScript](https://skillicons.dev/icons?i=javascript)
![Git](https://skillicons.dev/icons?i=git)
![Postman](https://skillicons.dev/icons?i=postman)

</p>

<p align="center">

![Node.js](https://img.shields.io/badge/Node.js-Backend-green?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-Framework-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![Mongoose](https://img.shields.io/badge/Mongoose-ODM-red?logo=mongoose)
![JWT](https://img.shields.io/badge/JWT-Authentication-black?logo=jsonwebtokens)
![bcryptjs](https://img.shields.io/badge/bcryptjs-Password%20Hashing-blue)
![Joi](https://img.shields.io/badge/Joi-Validation-orange)
![Postman](https://img.shields.io/badge/Postman-API%20Testing-orange?logo=postman)

</p>

---

## 📌 Project Overview

The **Swiggy Clone Backend** is a food ordering API that provides authentication, restaurant management, food management, cart management and order management.

The system has three different roles:

- 👑 **Admin**
- 🏪 **Restaurant Owner**
- 👤 **User**

Each role has different permissions using **JWT authentication and Role-Based Access Control (RBAC)**.

---

## 👥 User Roles

| Role | Responsibilities |
|------|------------------|
| 👑 Admin | Manage users, restaurants, categories and orders |
| 🏪 Restaurant Owner | Manage restaurant, food items and restaurant orders |
| 👤 User | Browse food, manage cart and place orders |

---

## 🔐 Authentication

The application uses:

- 🔑 JWT Access Token
- 🔄 JWT Refresh Token
- 🔒 bcryptjs password hashing
- 🛡️ Role-Based Access Control
- 🔐 Secret-Key Authorization
- 👤 Ownership Validation
- 🚪 Protected Routes

### Authentication Flow

```text
User
  │
  ▼
Register / Login
  │
  ▼
Password Hashing
  │
  ▼
JWT Access Token
  │
  ▼
Auth Middleware
  │
  ▼
Role Middleware
  │
  ▼
Protected Controller
