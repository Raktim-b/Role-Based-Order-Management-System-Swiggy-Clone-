const Joi = require("joi");

// Register
const registerValidation = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),

  email: Joi.string().email().trim().lowercase().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email",
    "any.required": "Email is required",
  }),

  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),

  role: Joi.string().valid("restaurantOwner", "user").required().messages({
    "any.only": "Role must be restaurantOwner or user",
    "any.required": "Role is required",
  }),

  profileImage: Joi.string().uri().allow("", null),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .allow("", null)
    .messages({
      "string.pattern.base": "Phone number must contain exactly 10 digits",
    }),
});

//  Login

const loginValidation = Joi.object({
  email: Joi.string().email().trim().lowercase().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email",
    "any.required": "Email is required",
  }),

  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

module.exports = {
  registerValidation,
  loginValidation,
};
