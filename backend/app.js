import express from 'express'
import mongoose from 'mongoose'
import password from './models/passwords.js' // Ensure you have the correct path to your model

const app = express()

// Middleware to parse incoming JSON requests
app.use(express.json());

app.post("/", async (req, res) => {
    try {
        const {name, username, password: userPassword} = req.body; // `password` renamed to avoid conflict

        // Log incoming data
        console.log('Received data:', {name, username, userPassword });

        // Creating the password entry
        const createPass = await password.create({ name, username, password: userPassword });

        // Find the created entry without the password field
        const passCreated = await password.findById(createPass._id).select("-password");

        if (!passCreated) return res.status(400).json({ message: "Some error occurred" });

        // Send success response with created entry
        res.status(201).json({ message: "Password entry created", data: passCreated, success: true });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

export default app;
