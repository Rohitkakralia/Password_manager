import express from 'express';
import Password from './models/passwords.js';
// Ensure Password is correctly imported
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse incoming JSON requests

app.post("/", async (req, res) => {
    try {
        const { name, username, userPassword } = req.body; // Rename to avoid keyword conflict

        // Log incoming data
        console.log('Received data:', { name, username, userPassword });

        // Creating the password entry
        try {
            const createPass = await Password.create({ name, username, userPassword });
        console.log("Created entry:", createPass); 
        } catch (error) {
            console.log(error);
        }
        
        // Find the created entry without the password field
        const passCreated = await Password.findById(createPass._id).select("-userPassword");

        if (!passCreated) {
            return res.status(400).json({ message: "Some error occurred" });
        }

        // Send success response with created entry
        res.status(201).json({
            message: "Password entry created",
            data: passCreated,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
});

export default app;