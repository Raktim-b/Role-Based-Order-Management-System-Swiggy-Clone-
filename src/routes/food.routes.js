const express = require("express");
const AuthCheck = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");
const foodController = require("../controller/food.controller");

const foodRouter = express.Router();

//  Add Food
foodRouter.post(
  "/",
  AuthCheck,
  allowRoles("restaurantOwner"),
  foodController.createFood,
);

//  View All Food
foodRouter.get(
  "/",
  AuthCheck,
  allowRoles("admin", "restaurantOwner", "user"),
  foodController.getAllFood,
);

// View Own Food
foodRouter.get(
  "/my-food",
  AuthCheck,
  allowRoles("restaurantOwner"),
  foodController.getOwnFood,
);

//  Update Own Food
foodRouter.put(
  "/:id",
  AuthCheck,
  allowRoles("restaurantOwner"),
  foodController.updateFood,
);

// Delete Own Food
foodRouter.delete(
  "/:id",
  AuthCheck,
  allowRoles("restaurantOwner"),
  foodController.deleteFood,
);

module.exports = foodRouter;
