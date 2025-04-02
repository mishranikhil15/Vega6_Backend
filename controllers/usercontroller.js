// controllers/usercontroller.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Usermodel } = require("../models/usermodel");
const path = require("path");

// Register a new user
const registerUser = async (req, res) => {
    console.log("Incoming Request Body: ", req.body);
    console.log("Incoming File: ", req.file);

    const { email, password } = req.body;
    const profileImage = req.file ? req.file.path : null;

    try {
        // Check if the email already exists
        const existingUser = await Usermodel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const user = new Usermodel({ email, password: hashedPassword, profileImage });
        await user.save();

        res.status(201).json({ message: "User registered successfully", profileImage: user.profileImage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error in registering the user" });
    }
};

// User login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if the user exists
        const user = await Usermodel.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, "unique", { expiresIn: "7d" });

        res.json({ message: "Login successful", token, userId: user._id, profileImage: user.profileImage });
    } catch (error) {
        res.status(500).json({ error: "Error in logging in the user" });
    }
};

module.exports = {
    registerUser,
    loginUser
};
