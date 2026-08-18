const Joi = require("joi");

const addCartValidation = Joi.object({
  foodId: Joi.string().hex().length(24).required().messages({
    "string.empty": "Food ID is required",
    "any.required": "Food ID is required",
    "string.hex": "Invalid food ID",
    "string.length": "Invalid food ID",
  }),

  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is required",
  }),
});

const updateCartValidation = Joi.object({
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is required",
  }),
});

module.exports = {
  addCartValidation,
  updateCartValidation,
};
