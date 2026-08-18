const userModel = require("../model/userModel");
const httpStatusCode = require("../utils/httpStatusCode");
const logger = require("../utils/logger");

class UserController {
  // View all users
  async getAllUsers(req, res) {
    try {
      const users = await userModel
        .find({ role: "user" })
        .select("-password -refreshToken");

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Users fetched successfully",
        count: users.length,
        data: users,
      });
    } catch (error) {
      logger.error("Error while fetching users: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Block user
  async blockUser(req, res) {
    try {
      const { id } = req.params;

      const user = await userModel.findById(id);

      if (!user) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "User not found",
        });
      }

      if (user.role === "admin") {
        return res.status(httpStatusCode.FORBIDDEN).json({
          success: false,
          message: "Admin cannot be blocked",
        });
      }

      if (user.isBlocked) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "User is already blocked",
        });
      }

      const updatedUser = await userModel
        .findByIdAndUpdate(
          id,
          {
            isBlocked: true,
          },
          {
            new: true,
          },
        )
        .select("-password -refreshToken");

      logger.info("User blocked successfully: %s", id);

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "User blocked successfully",
        data: updatedUser,
      });
    } catch (error) {
      logger.error("Error while blocking user: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Unblock user
  async unblockUser(req, res) {
    try {
      const { id } = req.params;

      const user = await userModel.findById(id);

      if (!user) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "User not found",
        });
      }

      if (user.role === "admin") {
        return res.status(httpStatusCode.FORBIDDEN).json({
          success: false,
          message: "Admin cannot be unblocked",
        });
      }

      if (!user.isBlocked) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "User is already unblocked",
        });
      }

      const updatedUser = await userModel
        .findByIdAndUpdate(
          id,
          {
            isBlocked: false,
          },
          {
            new: true,
          },
        )
        .select("-password -refreshToken");

      logger.info("User unblocked successfully: %s", id);

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "User unblocked successfully",
        data: updatedUser,
      });
    } catch (error) {
      logger.error("Error while unblocking user: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new UserController();
