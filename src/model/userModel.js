const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: ["admin", "restaurantOwner", "user"],
      required: true,
    },

    profileImage: {
      type: String,
      default:
        "https://res.cloudinary.com/dnwjxnsv0/image/upload/v1776073343/samples/man-portrait.jpg",
    },

    phone: {
      type: String,
      default: "8776251781",
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
