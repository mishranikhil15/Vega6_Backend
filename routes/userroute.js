const express = require("express");
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const { registerUser, loginUser } = require("../controllers/usercontroller");

const userRouter = express.Router();

// Ensure 'uploads/' directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Save files to 'uploads/' directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Routes
userRouter.post("/signup", upload.single('profileImage'), registerUser);
userRouter.post("/login", loginUser);

module.exports = { userRouter };
