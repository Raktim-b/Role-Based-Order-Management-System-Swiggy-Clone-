const mongoose = require("mongoose");
const {
  createFoodValidation,
  updateFoodValidation,
} = require("../validation/foodValidation");
const httpStatusCode = require("../utils/httpStatusCode");
const restaurantModel = require("../model/restaurantModel");
const categoryModel = require("../model/categoryModel");
const logger = require("../utils/logger");
const foodModel = require("../model/foodModel");

class FoodController {
  // Add Food
  async createFood(req, res) {
    try {
      const { error, value } = createFoodValidation.validate(req.body);

      if (error) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const {
        restaurantId,
        categoryId,
        foodName,
        description,
        price,
        image,
        foodType,
      } = value;

      // Check restaurant
      const restaurant = await restaurantModel.findOne({
        _id: restaurantId,
        ownerId: req.user.id,
        isDeleted: false,
      });

      if (!restaurant) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Restaurant not found or you are not the owner",
        });
      }

      // Check category
      const category = await categoryModel.findOne({
        _id: categoryId,
        isDeleted: false,
      });

      if (!category) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Category not found",
        });
      }

      const food = new foodModel({
        restaurantId,
        categoryId,
        ownerId: req.user.id,
        foodName,
        description,
        price,
        image,
        foodType,
      });

      const result = await food.save();

      logger.info("Food created successfully: %s", result.foodName);

      return res.status(httpStatusCode.CREATED).json({
        success: true,
        message: "Food created successfully",
        data: result,
      });
    } catch (error) {
      logger.error("Error while creating food: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // View All Food
  async getAllFood(req, res) {
    try {
      const foods = await foodModel.aggregate([
        {
          $match: {
            isDeleted: false,
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
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },

        {
          $unwind: "$category",
        },

        {
          $project: {
            _id: 1,
            foodName: 1,
            description: 1,
            price: 1,
            image: 1,
            foodType: 1,
            isAvailable: 1,

            restaurant: {
              _id: "$restaurant._id",
              restaurantName: "$restaurant.restaurantName",
              address: "$restaurant.address",
            },

            category: {
              _id: "$category._id",
              name: "$category.name",
            },
          },
        },
      ]);

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Food items fetched successfully",
        count: foods.length,
        data: foods,
      });
    } catch (error) {
      logger.error("Error while fetching foods: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // View Own Restaurant Food
  async getOwnFood(req, res) {
    try {
      const foods = await foodModel.find({
        ownerId: req.user.id,
        isDeleted: false,
      });

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Your food items fetched successfully",
        count: foods.length,
        data: foods,
      });
    } catch (error) {
      logger.error("Error while fetching own foods: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Update Own Food
  async updateFood(req, res) {
    try {
      const { error, value } = updateFoodValidation.validate(req.body);

      if (error) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: error.details[0].message,
        });
      }

      // Check food ownership
      const food = await foodModel.findOne({
        _id: req.params.id,
        ownerId: req.user.id,
        isDeleted: false,
      });

      if (!food) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Food not found or you are not the owner",
        });
      }

      // Check category only if categoryId is being updated
      if (value.categoryId) {
        const category = await categoryModel.findOne({
          _id: value.categoryId,
          isDeleted: false,
        });

        if (!category) {
          return res.status(httpStatusCode.NOT_FOUND).json({
            success: false,
            message: "Category not found",
          });
        }
      }

      const updatedFood = await foodModel.findByIdAndUpdate(
        req.params.id,
        value,
        {
          new: true,
          runValidators: true,
        },
      );

      logger.info("Food updated successfully: %s", req.params.id);

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Food updated successfully",
        data: updatedFood,
      });
    } catch (error) {
      logger.error("Error while updating food: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Delete Own Food
  async deleteFood(req, res) {
    try {
      const food = await foodModel.findOne({
        _id: req.params.id,
        ownerId: req.user.id,
        isDeleted: false,
      });

      if (!food) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Food not found or you are not the owner",
        });
      }

      const deletedFood = await foodModel.findByIdAndUpdate(
        req.params.id,
        {
          isDeleted: true,
          isAvailable: false,
        },
        {
          new: true,
        },
      );

      logger.info("Food deleted successfully: %s", req.params.id);

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Food deleted successfully",
        data: deletedFood,
      });
    } catch (error) {
      logger.error("Error while deleting food: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new FoodController();
