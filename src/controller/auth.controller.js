const userModel = require("../model/userModel");
const httpStatusCode = require("../utils/httpStatusCode");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const logger = require("../utils/logger");
const emailVerificationModel = require("../model/verificationModel");
const sendEmail = require("../utils/sendEmail");
const {
  registerValidation,
  loginValidation,
} = require("../validation/authValidation");

class AuthController {
  async registerUser(req, res) {
    try {
      const { error, value } = registerValidation.validate(req.body);

      if (error) {
        logger.warn("Validation failed: %s", error.details[0].message);

        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: error.details[0].message,
        });
      }
      const { name, email, password, phone } = value;

      logger.debug("User registration request received for email: %s", email);

      const existUser = await userModel.findOne({ email });

      if (existUser) {
        logger.warn(
          "User registration failed: Email already exists (%s)",
          email,
        );

        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "User already exists",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const userData = new userModel({
        name,
        email,
        password: hashPassword,
        phone,
        role: "user",
      });
      const result = await userData.save();

      await sendEmail(result);

      logger.info("User registered successfully: %s", email);
      logger.info("Verification email sent to: %s", email);

      return res.status(httpStatusCode.CREATED).json({
        success: true,
        message: "user registered successfully. Please verify your email.",
        data: result,
      });
    } catch (error) {
      logger.error("Error while registering user: %s", error.stack);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async registerRestaurantOwner(req, res) {
    try {
      const { error, value } = registerValidation.validate(req.body);

      if (error) {
        logger.warn("Validation failed: %s", error.details[0].message);

        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: error.details[0].message,
        });
      }
      const { name, email, password, phone } = value;

      logger.debug(
        "Restaurant Owner registration request received for email: %s",
        email,
      );

      const existingUser = await userModel.findOne({ email });

      if (existingUser) {
        logger.warn(
          "Restaurant Owner registration failed: Email already exists (%s)",
          email,
        );
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Email already registered",
        });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const restaurantOwner = new userModel({
        name,
        email,
        password: hashPassword,
        phone,
        role: "restaurantOwner",
      });
      await restaurantOwner.save();

      await sendEmail(restaurantOwner);

      logger.info("Recruiter registered successfully: %s", email);
      logger.info("Verification email sent to: %s", email);

      return res.status(httpStatusCode.CREATED).json({
        success: true,
        data: restaurantOwner,
      });
    } catch (error) {
      logger.error("Error while registering user: %s", error.stack);
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async verify(req, res) {
    try {
      const { token } = req.params;

      if (!token) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Invalid verification link",
        });
      }

      const emailVerification = await emailVerificationModel.findOne({
        token,
      });

      if (!emailVerification) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Invalid verification link",
        });
      }

      const existingUser = await userModel.findById(emailVerification.userId);

      if (!existingUser) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "User not found",
        });
      }

      if (existingUser.isVerified) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Email already verified",
        });
      }

      const currentTime = new Date();

      const expirationTime = new Date(
        emailVerification.createdAt.getTime() + 15 * 60 * 1000,
      );

      if (currentTime > expirationTime) {
        await sendEmail(existingUser);

        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message:
            "Verification link expired. A new verification email has been sent.",
        });
      }

      existingUser.isVerified = true;

      await existingUser.save();

      await emailVerificationModel.deleteMany({
        userId: existingUser._id,
      });

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Email verified successfully",
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async login(req, res) {
    try {
      const { error, value } = loginValidation.validate(req.body);

      if (error) {
        logger.warn("Validation failed: %s", error.details[0].message);

        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: error.details[0].message,
        });
      }

      const { email, password } = value;

      const checkUser = await userModel.findOne({ email });

      if (!checkUser) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "invalid credential",
        });
      }

      const checkPassowrd = await bcrypt.compare(password, checkUser.password);

      if (!checkPassowrd) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "invalid credential",
        });
      }

      if (!checkUser.isVerified) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Email is not verified.",
        });
      }

   

      const accessToken = jwt.sign(
        {
          id: checkUser._id,
          name: checkUser.name,
          email: checkUser.email,
          role: checkUser.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "5m" },
      );

      const refreshToken = jwt.sign(
        {
          id: checkUser._id,
          name: checkUser.name,
          email: checkUser.email,
          role: checkUser.role,
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" },
      );
      checkUser.refreshToken = refreshToken;
      await checkUser.save();

      logger.info("User logged in successfully: %s", checkUser.email);

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "User logged in Successfully",
        data: {
          id: checkUser._id,
          name: checkUser.name,
          email: checkUser.email,
          phone: checkUser.phone,
          role: checkUser.role,
        },
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } catch (error) {
      logger.error("Login failed: %s", error.stack);
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async refreshToken(req, res) {
    try {
      const refreshToken = req.headers["refresh-token"];
      if (!refreshToken) {
        return res.status(httpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: "Refresh token missing",
        });
      }
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const user = await userModel.findById(decoded.id);
      if (!user) {
        return res.status(httpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: "User not found",
        });
      }

      if (user.refreshToken !== refreshToken) {
        return res.status(httpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: "Invalid refresh token",
        });
      }
      

      const newAccessToken = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "5m",
        },
      );
      logger.info("Access token refreshed for: %s", user.email);

      return res.status(httpStatusCode.OK).json({
        success: true,
        data: {
          name: user.name,
          email: user.email,
          accessToken: newAccessToken,
        },
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new AuthController();
