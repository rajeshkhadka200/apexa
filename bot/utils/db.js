import mongoose from "mongoose";
const url = process.env.MONGO_URI;


export const connectDB = async () => {
  try {
    await mongoose.connect(url, {});
    console.log(`🤖 Bot connected to database`);
    return true;
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
    return false;
  }
};
