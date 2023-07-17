import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_CONTAINER_URI as string,
      {
        // dbName: process.env.MONGODB_DATABASE,
        auth: {
          username: process.env.MONGODB_USER,
          password: process.env.MONGODB_PASSWORD,
        },
      }
    );
    console.log(`MongoDB connected: ${await conn.connection.host}`);
  } catch (error) {
    let err = error as Error;
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
