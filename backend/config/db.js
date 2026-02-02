require("dotenv").config();
const mongoose = require("mongoose");

async function connectDB() {
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/TaskFlow`, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        console.log("MongoDB Connection Established!! ✅");
        return conn;
    } catch (err) {
        console.error("MongoDB Error:", err);
        throw err;
    }
}

module.exports = connectDB;