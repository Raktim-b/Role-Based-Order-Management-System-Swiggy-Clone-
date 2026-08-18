const rateLimit = require("express-rate-limit");

// Register Rate Limiter
const registerRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many registration attempts. Please try again after 15 minutes.",
  },
});

// Login Rate Limiter
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
});

// Refresh Token Rate Limiter
const refreshTokenRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many refresh token requests. Please try again later.",
  },
});

module.exports = {
  registerRateLimiter,
  loginRateLimiter,
  refreshTokenRateLimiter,
};
