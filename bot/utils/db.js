import mongoose from "mongoose";
const url =
  "mongodb+srv://rajeshkhadkaofficial45:rajeshkhadka@cluster0.qhxah4w.mongodb.net/?retryWrites=true&w=majority";

export const connectDB = async () => {
  try {
    await mongoose.connect(url, {});
    console.log(`🤖 bot connected to database`);
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
  }
};
