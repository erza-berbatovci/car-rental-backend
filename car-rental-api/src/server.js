const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();
const { connectDB, mongodb } = require("./rent");

const app = express();
app.use(express.json());
app.use(cors());

const usersCollection = mongodb.collection("users");
const carsCollection = mongodb.collection("cars");

// User Registration
app.post("/register", async (req, res) => {
    try {
        const { fullName, email, username, password } = req.body;

        // Validate input
        if (!fullName || !email || !username || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if the user already exists
        const existingUser = await usersCollection.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: "Username or Email already in use" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user in the database
        await usersCollection.insertOne({ fullName, email, username, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// User Login
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await usersCollection.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Middleware for Authentication
const authenticate = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ error: "Unauthorized" });

    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = decoded;
        next();
    });
};

// Get User Profile (Authenticated)
app.get("/my-profile", authenticate, async (req, res) => {
    try {
        const user = await usersCollection.findOne(
            { id: req.user._id },
            { projection: { password: 0 } } // Exclude password from response
        );
        res.json(user);
    } catch (error) {
        console.error("Profile Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get Rental Cars (Filtered & Sorted)
app.get("/rental-cars", async (req, res) => {
    try {
        const { year, color, steering_type, number_of_seats } = req.query;
        let query = {};

        if (year) query.year = parseInt(year);
        if (color) query.color = color;
        if (steering_type) query.steering_type = steering_type;
        if (number_of_seats) query.number_of_seats = parseInt(number_of_seats);

        const cars = await carsCollection.find(query).sort({ price_per_day: 1 }).toArray();
        res.json(cars);
    } catch (error) {
        console.error("Car Fetch Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start Server
connectDB().then(() => {
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
});
