import mongoose from "mongoose";

const dbUrl: string = process.env.DB_URL || "";

export const connectDB = async () => {
  try {
    const data = await mongoose.connect(dbUrl);
    console.log(`database connected on ${data.connection.host}`);
  } catch (error) {
    console.log("databse connection error", error);
    setTimeout(() => {
      connectDB();
    }, 5000);
  }
};
