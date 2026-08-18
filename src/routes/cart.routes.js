const express = require("express");
const AuthCheck = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");
const cartController = require("../controller/cart.controller");

const cartRouter = express.Router();

// Add food
cartRouter.post("/", AuthCheck, allowRoles("user"), cartController.addToCart);

// View cart
cartRouter.get("/", AuthCheck, allowRoles("user"), cartController.getCart);

// Update quantity
cartRouter.patch(
  "/:foodId",
  AuthCheck,
  allowRoles("user"),
  cartController.updateCartQuantity,
);

// Remove food
cartRouter.delete(
  "/:foodId",
  AuthCheck,
  allowRoles("user"),
  cartController.removeCartItem,
);

// Clear cart
cartRouter.delete("/", AuthCheck, allowRoles("user"), cartController.clearCart);

module.exports = cartRouter;
