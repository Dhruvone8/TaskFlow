require("dotenv").config();
const mongoose = require("mongoose");

let cachedConnection = null;

async function connectDB() {
    if (cachedConnection) {
        console.log("Using cached database connection");
        return cachedConnection;
    }

    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/TaskFlow`, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        cachedConnection = conn;
        console.log("MongoDB Connection Established!! ✅");
        return conn;
    } catch (err) {
        console.error("MongoDB Error:", err);
        throw err;
    }
}

module.exports = connectDB;