const express = require('express');
const mongoose = require('mongoose');
const { blogsRouter } = require('./routes/blogsroute');
const { connection } = require('./config/db');
const cors=require("cors");
const { userRouter } = require('./routes/userroute');
require("dotenv").config()
const app = express();
const path = require('path');
const fs = require('fs');

// Middleware
app.use(cors({
    origin:"*"
}))

app.use(express.json());
// app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.get("/", (req, res) => {
    res.send("Welcome to the server")
})
app.use('/api/users', userRouter);
app.use('/api/blogs', blogsRouter);


app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error)
        console.log("Trouble while connecting to db")
    }
    console.log(`running at ${process.env.port}`)
})
