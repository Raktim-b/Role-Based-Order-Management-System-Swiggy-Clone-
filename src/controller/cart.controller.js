const { default: mongoose } = require("mongoose");
const cartModel = require("../model/cartModel");
const foodModel = require("../model/foodModel");
const httpStatusCode = require("../utils/httpStatusCode");
const {
  addCartValidation,
  updateCartValidation,
} = require("../validation/cartValidation");

class CartController {
  // Add Food To Cart
  async addToCart(req, res) {
    try {
      const { error, value } = addCartValidation.validate(req.body);

      if (error) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const { foodId, quantity } = value;

      // Check food
      const food = await foodModel.findOne({
        _id: foodId,
        isDeleted: false,
        isAvailable: true,
      });

      if (!food) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Food not found or unavailable",
        });
      }

      // Find user's cart
      let cart = await cartModel.findOne({
        userId: req.user.id,
      });

      // If cart doesn't exist
      if (!cart) {
        cart = new cartModel({
          userId: req.user.id,
          items: [
            {
              foodId: food._id,
              quantity,
              price: food.price,
            },
          ],
          totalPrice: food.price * quantity,
        });

        await cart.save();

        return res.status(httpStatusCode.CREATED).json({
          success: true,
          message: "Food added to cart",
          data: cart,
        });
      }

      // Check if food already exists
      const item = cart.items.find((item) => item.foodId.toString() === foodId);

      if (item) {
        item.quantity += quantity;
      } else {
        cart.items.push({
          foodId: food._id,
          quantity,
          price: food.price,
        });
      }

      // Calculate total
      cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );

      await cart.save();

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Food added to cart",
        data: cart,
      });
    } catch (error) {
      logger.error("Error while adding food to cart: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // View Cart
  async getCart(req, res) {
    try {
      const cart = await cartModel
        .findOne({
          userId: req.user.id,
        })
        .populate("items.foodId", "foodName price image foodType");

      if (!cart) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Cart is empty",
        });
      }

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Cart fetched successfully",
        data: cart,
      });
    } catch (error) {
      logger.error("Error while fetching cart: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Update Cart Quantity
  async updateCartQuantity(req, res) {
    try {
      const { error, value } = updateCartValidation.validate(req.body);

      if (error) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const { quantity } = value;

      const cart = await cartModel.findOne({
        userId: req.user.id,
      });

      if (!cart) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Cart not found",
        });
      }

      const item = cart.items.find(
        (item) => item.foodId.toString() === req.params.foodId,
      );

      if (!item) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Food not found in cart",
        });
      }

      item.quantity = quantity;

      cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );

      await cart.save();

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Cart quantity updated successfully",
        data: cart,
      });
    } catch (error) {
      logger.error("Error while updating cart quantity: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Remove Cart Item
  async removeCartItem(req, res) {
    try {
      const { foodId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(foodId)) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Invalid food ID",
        });
      }

      const cart = await cartModel.findOneAndUpdate(
        {
          userId: req.user.id,
        },
        {
          $pull: {
            items: {
              foodId: new mongoose.Types.ObjectId(foodId),
            },
          },
        },
        {
          new: true,
        },
      );

      if (!cart) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Cart not found",
        });
      }

      cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );

      await cart.save();

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Food removed from cart",
        data: cart,
      });
    } catch (error) {
      logger.error("Error while removing cart item: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Clear Cart
  async clearCart(req, res) {
    try {
      const cart = await cartModel.findOne({
        userId: req.user.id,
      });

      if (!cart) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Cart not found",
        });
      }

      cart.items = [];
      cart.totalPrice = 0;

      await cart.save();

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Cart cleared successfully",
        data: cart,
      });
    } catch (error) {
      logger.error("Error while clearing cart: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new CartController();
