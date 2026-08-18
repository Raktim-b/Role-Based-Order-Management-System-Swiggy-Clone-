const express = require("express");
const AuthCheck = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");
const userController = require("../controller/user.controller");

const userRouter = express.Router();

userRouter.get(
  "/",
  AuthCheck,
  allowRoles("admin"),
  userController.getAllUsers,
);

userRouter.patch(
  "/block/:id",
  AuthCheck,
  allowRoles("admin"),
  userController.blockUser,
);

userRouter.patch(
  "/unblock/:id",
  AuthCheck,
  allowRoles("admin"),
  userController.unblockUser,
);

module.exports = userRouter;
