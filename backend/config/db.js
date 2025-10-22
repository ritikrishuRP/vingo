import mongoose from 'mongoose';


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB connected successfully")
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        console.log("Retrying in 5 seconds...");
    }
}

export default connectDB;