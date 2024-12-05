import mongoose from "mongoose";

const connectDB = async () => {
  try {
    //이미 연결된 상태인지 확인
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }
    //아니라면 새로 연결
    return await mongoose.connect(
      `${process.env.NEXT_MONGODB_URL}/padoReviews`
    );
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

export default connectDB;