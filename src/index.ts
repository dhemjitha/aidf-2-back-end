import "dotenv/config";
import express from "express";
import hotelRouter from "./api/hotel";
import connectDB from "./infrastructure/db";
import userRouter from "./api/user";
import bookingRouter from "./api/booking";
import cors from "cors";
import globalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware";
const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/hotels", hotelRouter);
app.use("/api/users", userRouter);
app.use("/api/bookings", bookingRouter);

app.use(globalErrorHandlingMiddleware);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));