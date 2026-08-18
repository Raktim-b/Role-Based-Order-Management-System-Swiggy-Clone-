const express = require("express");

const categoryController = require("../controller/category.controller");
const AuthCheck = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");
const categoryRouter = express.Router();

// Admin - Create category
categoryRouter.post(
  "/",
  AuthCheck,
  allowRoles("admin"),
  categoryController.createCategory,
);

//  View categories
categoryRouter.get(
  "/",
  AuthCheck,
  allowRoles("admin", "restaurantOwner", "user"),
  categoryController.getAllCategories,
);

// View one category
categoryRouter.get(
  "/:id",
  AuthCheck,
  allowRoles("admin", "restaurantOwner", "user"),
  categoryController.getCategoryById,
);

// Update category
categoryRouter.put(
  "/:id",
  AuthCheck,
  allowRoles("admin"),
  categoryController.updateCategory,
);

// Delete category
categoryRouter.delete(
  "/:id",
  AuthCheck,
  allowRoles("admin"),
  categoryController.deleteCategory,
);

module.exports = categoryRouter;
