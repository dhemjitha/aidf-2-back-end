import mongoose from "mongoose";

const connectDB = async () => {

    try {
        const MONGODB_URL = process.env.MONGODB_URL;
        if (!MONGODB_URL) {
            throw new Error("MONGODB_URL is not set");
        }

        await mongoose.connect(MONGODB_URL);
        console.log("Connected to the database...");
    } catch (error) {
        console.log("Error connecting to the database...");
        console.log(error);
    }
}

export default connectDB;