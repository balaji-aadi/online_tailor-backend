// config/db.js
import mongoose from "mongoose";
import logger from "../utils/logger.js";

const connectDB = async (retries = 5, delay = 5000) => {
  const mongoURI = process.env.MONGODB_URI;
  if (!mongoURI) {
    logger.error("MONGODB_URI environment variable not set");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI, {
      maxPoolSize: 10, // replaces poolSize
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    logger.info("✅ MongoDB connected successfully.");
  } catch (err) {
    logger.error(`❌ MongoDB connection error: ${err.message}`);

    if (retries > 0) {
      logger.info(`Retrying connection in ${delay / 1000}s... (${retries} retries left)`);
      setTimeout(() => connectDB(retries - 1, delay * 2), delay); // exponential backoff
    } else {
      logger.error("Exhausted all retries. Exiting process.");
      process.exit(1);
    }
  }

  // Connection events
  mongoose.connection.on("disconnected", () => {
    logger.warn("⚠️ MongoDB disconnected. Attempting reconnection...");
    connectDB();
  });

  mongoose.connection.on("error", (err) => {
    logger.error(`⚠️ MongoDB connection error: ${err}`);
  });
};

export default connectDB;
