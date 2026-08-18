const express = require("express");
const authController = require("../controller/auth.controller");
const AuthCheck = require("../middleware/auth");
const {
  registerRateLimiter,
  refreshTokenRateLimiter,
  loginRateLimiter,
} = require("../middleware/authRateLimiter");

const authRouter = express.Router();

authRouter.post(
  "/register",
  // registerRateLimiter,
  authController.registerUser,
);
authRouter.post(
  "/register/restaurant-owner",
  // registerRateLimiter,
  authController.registerRestaurantOwner,
);
authRouter.post(
  "/login",
  // loginRateLimiter,
  authController.login,
);
authRouter.post(
  "/refresh-token",
  // refreshTokenRateLimiter,
  authController.refreshToken,
);
authRouter.get("/verify/:token", authController.verify);

module.exports = authRouter;
