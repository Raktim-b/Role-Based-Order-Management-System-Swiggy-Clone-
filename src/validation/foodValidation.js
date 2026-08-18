const Joi = require("joi");

const createFoodValidation = Joi.object({
  restaurantId: Joi.string().hex().length(24).required().messages({
    "string.empty": "Restaurant ID is required",
    "string.hex": "Invalid restaurant ID",
    "string.length": "Invalid restaurant ID",
    "any.required": "Restaurant ID is required",
  }),

  categoryId: Joi.string().hex().length(24).required().messages({
    "string.empty": "Category ID is required",
    "string.hex": "Invalid category ID",
    "string.length": "Invalid category ID",
    "any.required": "Category ID is required",
  }),

  foodName: Joi.string().trim().required().messages({
    "string.empty": "Food name is required",
    "any.required": "Food name is required",
  }),

  description: Joi.string().trim().allow("", null),

  price: Joi.number().min(0).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price cannot be negative",
    "any.required": "Price is required",
  }),

  image: Joi.string().uri().allow("", null),

  foodType: Joi.string().valid("veg", "non-veg").required().messages({
    "any.only": "Food type must be veg or non-veg",
    "any.required": "Food type is required",
  }),
});

const updateFoodValidation = Joi.object({
  categoryId: Joi.string().hex().length(24),

  foodName: Joi.string().trim(),

  description: Joi.string().trim().allow("", null),

  price: Joi.number().min(0),

  image: Joi.string().uri().allow("", null),

  foodType: Joi.string().valid("veg", "non-veg"),
});

module.exports = {
  createFoodValidation,
  updateFoodValidation,
};
