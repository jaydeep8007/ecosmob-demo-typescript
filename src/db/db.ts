import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(` MongoDB connection successful`);
  } catch (error) {
    console.error(` Error connecting to MongoDB:`, error);
    process.exit(1);
  }
};

export default connectDB;