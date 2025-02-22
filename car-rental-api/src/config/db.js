const { MongoClient } = require("mongodb");
require("dotenv").config();

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(mongoUri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB Connection Failed", error);
        process.exit(1);
    }
}

const db = client.db("carRental");

module.exports = { db, connectDB };
