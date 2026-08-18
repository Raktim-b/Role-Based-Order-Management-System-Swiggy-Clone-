const Joi = require("joi");

const createCategoryValidation = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Category name is required",
    "any.required": "Category name is required",
  }),

  description: Joi.string().trim().allow("", null),
});

const updateCategoryValidation = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Category name is required",
    "any.required": "Category name is required",
  }),

  description: Joi.string().trim().allow("", null),
});

module.exports = {
  createCategoryValidation,
  updateCategoryValidation,
};
