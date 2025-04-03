const express = require('express');
const Contact = require('../models/Inquiry');
const router = express.Router();
const Inquiry = require("../models/Inquiry");  // Make sure this is correct

router.post('/', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(200).json({ message: 'Inquiry submitted successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET all inquiries
router.get("/", async (req, res) => {
  try {
    const inquiries = await Inquiry.find(); // Fetch all inquiries from MongoDB
    res.status(200).json(inquiries); // Return inquiries as JSON
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
