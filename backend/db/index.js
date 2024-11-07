import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect("mongodb+srv://rohitkakraia94:Rohit123@cluster0.s8wtr.mongodb.net/PasswordManager");

        console.log("Database connected");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        throw new Error(error);
    }
}

export { connectDb };
