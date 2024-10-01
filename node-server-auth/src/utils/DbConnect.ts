import { MongoClient } from "mongodb";
import Env from "../env";
import mongoose from "mongoose";


let client: MongoClient | null = null;

export default async function connectToDB() {
    const url = Env.MONGO_URI 

    if (!url) {
        throw new Error("MongoDB URI is not defined in the environment variables.");
    }

    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB");
        return client;
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        throw error; 
    }
}
