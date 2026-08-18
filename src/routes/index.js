const express = require("express");
const authRouter = require("./auth.routes");
const userRouter = require("./user.routes");
const categoryRouter = require("./category.routes");
const restaurantRouter = require("./restaurant.routes");
const foodRouter = require("./food.routes");
const cartRouter = require("./cart.routes");
const orderRouter = require("./order.routes");

const router = express.Router();

// API Routes (Version 1)
router.use("/api/v1/auth", authRouter);
router.use("/api/v1/user", userRouter);
router.use("/api/v1/category", categoryRouter);
router.use("/api/v1/restaurant", restaurantRouter);
router.use("/api/v1/food", foodRouter);
router.use("/api/v1/cart", cartRouter);
router.use("/api/v1/order", orderRouter);

module.exports = router;
