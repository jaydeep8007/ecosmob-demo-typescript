import mongoose from "mongoose";
import logger from "./utils.logger";

const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    logger.info("MongoDB connection established");
  } catch (err) {
    logger.error("MongoDB connection error", err);
    process.exit(1);
  }
};

export default connectDatabase;
