require("dotenv").config();
const bcrypt = require("bcrypt");

const connectDB = require("../src/config/db");
const User = require("../src/model/userModel");
const logger = require("../src/utils/logger");

const createAdmin = async () => {
  try {
    await connectDB();

    const admin = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (admin) {
      logger.warn("Admin already exists.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    await User.create({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
      isVerified: true,
      isActive: true,
    });

    logger.info("Admin created successfully.");
    process.exit(0);
  } catch (error) {
    logger.error(`Failed to create admin: ${error.message}`);
    process.exit(1);
  }
};

createAdmin();
