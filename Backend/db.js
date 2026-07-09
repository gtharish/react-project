import mongoose from "mongoose";
import "dotenv/config";
export default async function connectTo() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
}