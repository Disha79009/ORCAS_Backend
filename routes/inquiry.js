const express = require('express');
const Contact = require('../models/Inquiry');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(200).json({ message: 'Inquiry submitted successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
