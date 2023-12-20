import mongoose from "mongoose";
const url =
  "mongodb+srv://rajeshkhadkaofficial45:rajeshkhadka@cluster0.qhxah4w.mongodb.net/?retryWrites=true&w=majority";

export const connectDB = async () => {
  try {
    const host = await mongoose.connect(url, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected:`, host.connections[0].host);
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
  }
};
