import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB подключен");
  } catch (error) {
    console.log(`Ошибка: ${error.message}`);
    process.exit(1);
  }
};
