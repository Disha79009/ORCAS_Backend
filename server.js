const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// ✅ Define PORT **before** using it
const PORT = process.env.PORT || 5000;

// ✅ Remove duplicate MongoDB connection (you already have `connectDB();` above)

// Define Mongoose Schema & Model
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Contact = mongoose.model('Contact', contactSchema);

// Contact Form Route
app.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).json({ message: 'Message submitted successfully' });
    } catch (error) {
        console.error("Error saving contact:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ✅ Add a simple route for "/"
app.get("/", (req, res) => {
    res.send("Welcome to the ORCAS API! 🌊🛢️");
});

// ✅ Start Server **after** defining `PORT`
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
