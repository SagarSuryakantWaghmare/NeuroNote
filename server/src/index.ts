import express from 'express';
import mongoose from 'mongoose';
import { UserModel } from './db';

// d.ts for the declation file
const app = express();
app.use(express.json());


app.post('/api/v1/signup', async (req, res) => {
    try {
        // Get username and password from request body
        const username = req.body.username;
        const password = req.body.password;
        
        const user = await UserModel.create({
            username: username,
            password: password 
        });
        
        res.status(201).json({
            message: "User signed up successfully",
            userId: user._id
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Error during signup" });
    }
})

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


