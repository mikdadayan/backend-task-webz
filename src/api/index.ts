import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/userRouter";
import postRouter from "./routes/postRouter";

import connectDB from "../config/db";
import { errorHandler } from "../utils/errorHandler";

dotenv.config();

connectDB();

const PORT = process.env.NODE_LOCAL_PORT || 8000;
const app: Express = express();
app.use(cors());

app.use(express.json());

app.use("/api", userRouter);
app.use("/api", postRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.NODE_LOCAL_PORT}`
  );
});
