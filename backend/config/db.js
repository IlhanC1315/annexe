const mongoose = require("mongoose")
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected ✅")
    } catch (err) {
        console.error("MongoDB connection failed", err)
        process.exit(1);
    }
};

module.exports = connectDB;