import "dotenv/config";
import express from "express";
import hotelRouter from "./api/hotel.js";
import connectDB from "./infrastructure/db.js";
import userRouter from "./api/user.js";
import bookingRouter from "./api/booking.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/hotels", hotelRouter);
app.use("/api/users", userRouter);
app.use("/api/bookings", bookingRouter);

const PORT = 8000;
app.listen(PORT, console.log(`Server is running on port ${PORT}...`));