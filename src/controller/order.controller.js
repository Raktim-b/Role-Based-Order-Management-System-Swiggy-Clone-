const { default: mongoose } = require("mongoose");
const foodModel = require("../model/foodModel");
const orderModel = require("../model/orderModel");
const httpStatusCode = require("../utils/httpStatusCode");
const logger = require("../utils/logger");
const restaurantModel = require("../model/restaurantModel");
const cartModel = require("../model/cartModel");

class OrderController {
  // USER - PLACE ORDER
  async placeOrder(req, res) {
    try {
      const cart = await cartModel.findOne({
        userId: req.user.id,
      });

      if (!cart || cart.items.length === 0) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Cart is empty",
        });
      }

      const foodIds = cart.items.map((item) => item.foodId);

      const foods = await foodModel.find({
        _id: { $in: foodIds },
        isDeleted: false,
        isAvailable: true,
      });

      if (foods.length !== cart.items.length) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Some food is unavailable",
        });
      }

      const restaurantId = foods[0].restaurantId;

      const items = cart.items.map((item) => {
        const food = foods.find(
          (food) => food._id.toString() === item.foodId.toString(),
        );

        return {
          foodId: food._id,
          foodName: food.foodName,
          quantity: item.quantity,
          price: food.price,
        };
      });

      const totalPrice = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );

      const order = await orderModel.create({
        userId: req.user.id,
        restaurantId,
        items,
        totalPrice,
      });

      cart.items = [];
      cart.totalPrice = 0;

      await cart.save();

      return res.status(httpStatusCode.CREATED).json({
        success: true,
        message: "Order placed successfully",
        data: order,
      });
    } catch (error) {
      logger.error("Place order error: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // USER - VIEW OWN ORDERS
  async getOwnOrders(req, res) {
    try {
      const orders = await orderModel.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(req.user.id),
          },
        },

        {
          $lookup: {
            from: "restaurants",
            localField: "restaurantId",
            foreignField: "_id",
            as: "restaurant",
          },
        },

        {
          $unwind: "$restaurant",
        },

        {
          $sort: {
            createdAt: -1,
          },
        },

        {
          $project: {
            _id: 1,
            items: 1,
            totalPrice: 1,
            status: 1,
            createdAt: 1,

            restaurant: {
              _id: "$restaurant._id",
              restaurantName: "$restaurant.restaurantName",
              address: "$restaurant.address",
              phone: "$restaurant.phone",
            },
          },
        },
      ]);

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Orders fetched successfully",
        data: orders,
      });
    } catch (error) {
      logger.error("Get own orders error: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // USER - CANCEL ORDER
  async cancelOrder(req, res) {
    try {
      const order = await orderModel.findOne({
        _id: req.params.id,
        userId: req.user.id,
      });

      if (!order) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Order not found",
        });
      }

      if (order.status !== "Pending") {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Order cannot be cancelled",
        });
      }

      const updatedOrder = await orderModel.findByIdAndUpdate(
        req.params.id,
        {
          status: "Cancelled",
        },
        {
          new: true,
        },
      );

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Order cancelled successfully",
        data: updatedOrder,
      });
    } catch (error) {
      logger.error("Cancel order error: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // OWNER - VIEW RESTAURANT ORDERS
  async getRestaurantOrders(req, res) {
    try {
      const restaurant = await restaurantModel.findOne({
        ownerId: req.user.id,
        isDeleted: false,
      });

      if (!restaurant) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Restaurant not found",
        });
      }

      const orders = await orderModel.aggregate([
        {
          $match: {
            restaurantId: restaurant._id,
          },
        },

        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },

        {
          $unwind: "$user",
        },

        {
          $sort: {
            createdAt: -1,
          },
        },

        {
          $project: {
            _id: 1,
            items: 1,
            totalPrice: 1,
            status: 1,
            createdAt: 1,

            user: {
              _id: "$user._id",
              name: "$user.name",
              email: "$user.email",
              phone: "$user.phone",
            },
          },
        },
      ]);

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Restaurant orders fetched successfully",
        data: orders,
      });
    } catch (error) {
      logger.error("Get restaurant orders error: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // OWNER - ACCEPT ORDER
  async acceptOrder(req, res) {
    try {
      const restaurant = await restaurantModel.findOne({
        ownerId: req.user.id,
        isDeleted: false,
      });

      if (!restaurant) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Restaurant not found",
        });
      }

      const order = await orderModel.findOne({
        _id: req.params.id,
        restaurantId: restaurant._id,
      });

      if (!order) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Order not found",
        });
      }

      if (order.status !== "Pending") {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Only pending orders can be accepted",
        });
      }

      const updatedOrder = await orderModel.findByIdAndUpdate(
        req.params.id,
        { status: "Accepted" },
        { new: true },
      );

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Order accepted",
        data: updatedOrder,
      });
    } catch (error) {
      logger.error("Accept order error: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // OWNER - REJECT ORDER
  async rejectOrder(req, res) {
    try {
      const restaurant = await restaurantModel.findOne({
        ownerId: req.user.id,
        isDeleted: false,
      });

      if (!restaurant) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Restaurant not found",
        });
      }

      const order = await orderModel.findOne({
        _id: req.params.id,
        restaurantId: restaurant._id,
      });

      if (!order) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Order not found",
        });
      }

      if (order.status !== "Pending") {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Only pending orders can be rejected",
        });
      }

      const updatedOrder = await orderModel.findByIdAndUpdate(
        req.params.id,
        { status: "Rejected" },
        { new: true },
      );

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Order rejected",
        data: updatedOrder,
      });
    } catch (error) {
      logger.error("Reject order error: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // OWNER - UPDATE STATUS
  async updateOrderStatus(req, res) {
    try {
      const { status } = req.body;

      const allowedStatus = ["Preparing", "Out for Delivery", "Delivered"];

      if (!allowedStatus.includes(status)) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Invalid order status",
        });
      }

      const restaurant = await restaurantModel.findOne({
        ownerId: req.user.id,
        isDeleted: false,
      });

      if (!restaurant) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Restaurant not found",
        });
      }

      const order = await orderModel.findOne({
        _id: req.params.id,
        restaurantId: restaurant._id,
      });

      if (!order) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Order not found",
        });
      }

      const updatedOrder = await orderModel.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true },
      );

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Order status updated",
        data: updatedOrder,
      });
    } catch (error) {
      logger.error("Update order status error: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ADMIN - VIEW ALL ORDERS
  async getAllOrders(req, res) {
    try {
      const orders = await orderModel.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },

        {
          $unwind: "$user",
        },

        {
          $lookup: {
            from: "restaurants",
            localField: "restaurantId",
            foreignField: "_id",
            as: "restaurant",
          },
        },

        {
          $unwind: "$restaurant",
        },

        {
          $sort: {
            createdAt: -1,
          },
        },

        {
          $project: {
            _id: 1,
            items: 1,
            totalPrice: 1,
            status: 1,
            createdAt: 1,

            user: {
              _id: "$user._id",
              name: "$user.name",
              email: "$user.email",
              phone: "$user.phone",
            },

            restaurant: {
              _id: "$restaurant._id",
              restaurantName: "$restaurant.restaurantName",
              address: "$restaurant.address",
              phone: "$restaurant.phone",
            },
          },
        },
      ]);

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "All orders fetched successfully",
        data: orders,
      });
    } catch (error) {
      logger.error("Get all orders error: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new OrderController();
