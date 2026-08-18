const Joi = require("joi");

const createRestaurantValidation = Joi.object({
  restaurantName: Joi.string().trim().required().messages({
    "string.empty": "Restaurant name is required",
    "any.required": "Restaurant name is required",
  }),

  description: Joi.string().trim().allow("", null),

  address: Joi.string().trim().required().messages({
    "string.empty": "Address is required",
    "any.required": "Address is required",
  }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.empty": "Phone is required",
      "string.pattern.base": "Phone number must contain exactly 10 digits",
      "any.required": "Phone is required",
    }),

  image: Joi.string().uri().allow("", null),
});

const updateRestaurantValidation = Joi.object({
  restaurantName: Joi.string().trim().messages({
    "string.empty": "Restaurant name is required",
    "any.required": "Restaurant name is required",
  }),

  description: Joi.string().trim().allow("", null),

  address: Joi.string().trim().messages({
    "string.empty": "Address is required",
    "any.required": "Address is required",
  }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)

    .messages({
      "string.empty": "Phone is required",
      "string.pattern.base": "Phone number must contain exactly 10 digits",
      "any.required": "Phone is required",
    }),

  image: Joi.string().uri().allow("", null),
});

module.exports = {
  createRestaurantValidation,
  updateRestaurantValidation,
};
