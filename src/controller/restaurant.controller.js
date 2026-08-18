const restaurantModel = require("../model/restaurantModel");
const httpStatusCode = require("../utils/httpStatusCode");
const logger = require("../utils/logger");
const {
  createRestaurantValidation,
  updateRestaurantValidation,
} = require("../validation/restaurantValidation");

class RestaurantController {
  // Create Restaurant
  async createRestaurant(req, res) {
    try {
      const { error, value } = createRestaurantValidation.validate(req.body);

      if (error) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const { restaurantName, description, address, phone, image } = value;

      // Check if owner already has a restaurant
      const existingRestaurant = await restaurantModel.findOne({
        ownerId: req.user.id,
        isDeleted: false,
      });

      if (existingRestaurant) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "You already have a restaurant",
        });
      }

      const restaurant = new restaurantModel({
        ownerId: req.user.id,
        restaurantName,
        description,
        address,
        phone,
        image,
      });

      const result = await restaurant.save();

      logger.info("Restaurant created successfully: %s", result.restaurantName);

      return res.status(httpStatusCode.CREATED).json({
        success: true,
        message: "Restaurant created successfully",
        data: result,
      });
    } catch (error) {
      logger.error("Error while creating restaurant: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Read Own Restaurant
  async getOwnRestaurant(req, res) {
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

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Restaurant fetched successfully",
        data: restaurant,
      });
    } catch (error) {
      logger.error("Error while fetching restaurant: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Update Own Restaurant
  async updateOwnRestaurant(req, res) {
    try {
      const { error, value } = updateRestaurantValidation.validate(req.body);

      if (error) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const { restaurantName, description, address, phone, image } = value;

      const restaurant = await restaurantModel.findOne({
        _id: req.params.id,
        ownerId: req.user.id,
        isDeleted: false,
      });

      if (!restaurant) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Restaurant not found or you are not the owner",
        });
      }

      const updatedRestaurant = await restaurantModel.findByIdAndUpdate(
        req.params.id,
        {
          restaurantName,
          description,
          address,
          phone,
          image,
        },
        {
          new: true,
          runValidators: true,
        },
      );

      logger.info("Restaurant updated successfully: %s", req.params.id);

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Restaurant updated successfully",
        data: updatedRestaurant,
      });
    } catch (error) {
      logger.error("Error while updating restaurant: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Get All Restaurants
  async getAllRestaurants(req, res) {
    try {
      const restaurants = await restaurantModel
        .find({
          isDeleted: false,
        })
        .populate("ownerId", "name email phone");

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Restaurants fetched successfully",
        count: restaurants.length,
        data: restaurants,
      });
    } catch (error) {
      logger.error("Error while fetching all restaurants: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new RestaurantController();
