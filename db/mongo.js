const mongoose = require("mongoose");
const { MONGO_URI } = require('../utils/db-utils');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    isConnected = false;
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
