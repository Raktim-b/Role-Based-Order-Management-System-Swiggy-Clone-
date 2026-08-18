const express = require("express");
const AuthCheck = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");
const orderController = require("../controller/order.controller");

const orderRouter = express.Router();

//  USER

// Place Order
orderRouter.post("/", AuthCheck, allowRoles("user"), orderController.placeOrder);

// View Own Orders
orderRouter.get(
  "/my-orders",
  AuthCheck,
  allowRoles("user"),
  orderController.getOwnOrders,
);

// Cancel Own Order
orderRouter.patch(
  "/:id/cancel",
  AuthCheck,
  allowRoles("user"),
  orderController.cancelOrder,
);

//  RESTAURANT OWNER

// View Restaurant Orders
orderRouter.get(
  "/restaurant-orders",
  AuthCheck,
  allowRoles("restaurantOwner"),
  orderController.getRestaurantOrders,
);

// Accept Order
orderRouter.patch(
  "/:id/accept",
  AuthCheck,
  allowRoles("restaurantOwner"),
  orderController.acceptOrder,
);

// Reject Order
orderRouter.patch(
  "/:id/reject",
  AuthCheck,
  allowRoles("restaurantOwner"),
  orderController.rejectOrder,
);

// Update Order Status
orderRouter.patch(
  "/:id/status",
  AuthCheck,
  allowRoles("restaurantOwner"),
  orderController.updateOrderStatus,
);

//  ADMIN

// View All Orders
orderRouter.get(
  "/all",
  AuthCheck,
  allowRoles("admin"),
  orderController.getAllOrders,
);

module.exports = orderRouter;
