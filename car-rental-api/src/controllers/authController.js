const { db } = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
    const { fullName, email, username, password } = req.body;
    if (!fullName || !email || !username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const usersCollection = db.collection("users");
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { fullName, email, username, password: hashedPassword };

    await usersCollection.insertOne(newUser);
    res.status(201).json({ message: "User registered successfully" });
};

const login = async (req, res) => {
    const { username, password } = req.body;
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
};

const myProfile = async (req, res) => {
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ _id: req.user.userId });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ fullName: user.fullName, username: user.username, email: user.email });
};

module.exports = { register, login, myProfile };
