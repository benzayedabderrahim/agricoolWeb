// routes/discussionRoutes.js

const express = require('express');
const router = express.Router();
const { Discussion, CommerAgricole } = require("../models");

// Route to create a new discussion
router.post('/discussion', async (req, res) => {
    try {
        const { userId, comMessage, agrMessage } = req.body;

        // Create a new discussion record
        const discussion = await Discussion.create({
            userId,
            comMessage,
            agrMessage
        });

        res.status(201).json({ message: 'Discussion created successfully', discussion });
    } catch (error) {
        console.error('Error creating discussion:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route to get all discussions
router.get('/discussions', async (req, res) => {
    try {
        // Fetch all discussions
        const discussions = await Discussion.findAll();

        res.json(discussions);
    } catch (error) {
        console.error('Error fetching discussions:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route to get all commeragricoles
router.get('/commeragricoles', async (req, res) => {
    try {
        // Fetch all commeragricoles
        const commeragricoles = await CommerAgricole.findAll();

        res.json(commeragricoles);
    } catch (error) {
        console.error('Error fetching commeragricoles:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
