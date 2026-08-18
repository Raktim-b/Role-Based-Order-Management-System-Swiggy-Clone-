const express = require("express");
const AuthCheck = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");
const restaurantController = require("../controller/restaurant.controller");

const restaurantRouter = express.Router();

// Create restaurant
restaurantRouter.post(
  "/",
  AuthCheck,
  allowRoles("restaurantOwner"),
  restaurantController.createRestaurant,
);

// Read own restaurant
restaurantRouter.get(
  "/my-restaurant",
  AuthCheck,
  allowRoles("restaurantOwner"),
  restaurantController.getOwnRestaurant,
);

// Update own restaurant
restaurantRouter.put(
  "/:id",
  AuthCheck,
  allowRoles("restaurantOwner"),
  restaurantController.updateOwnRestaurant,
);

// Get All Restaurants
restaurantRouter.get(
  "/",
  AuthCheck,
  allowRoles("admin"),
  restaurantController.getAllRestaurants,
);

module.exports = restaurantRouter;
