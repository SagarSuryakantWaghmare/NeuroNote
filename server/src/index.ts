import express from 'express';
import mongoose from 'mongoose';
import { ContentModel, UserModel } from './db';
import jwt from 'jsonwebtoken';
import { JsonWebTokenError } from 'jsonwebtoken';
import { JWT_PASSWORD } from './config';
import { userMiddleware } from './middleware';
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

// Sign In
app.post('/api/v1/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await UserModel.findOne({
        username,
        password
    })
    if (existingUser) {
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD);
        res.json({
            message: "User signed in successfully",
            token: token
        })
    } else {
        res.status(401).json({
            message: "Invalid username or password"
        })
    }
})

// Content api
app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
        link,
        type,
        //@ts-ignore
        userId: req.userId,
        tags: []
    })
    res.json({
        message: "Content Added"
    })

})

// Give content
app.get("/api/v1/content",userMiddleware,async(req,res)=>{
    // @ts-ignore
    const userId=req.userId;
    const content= await ContentModel.find({
        userId:userId
    }).populate("userId","username")
    // It is used to get the specific data from the given 
    res.json({
        content
    })

})

// Delete content
app.delete("/api/v1/content",userMiddleware,async(req,res)=>{
    const contentId=req.body.contentId;
    await ContentModel.deleteMany({
        contentId,
        // @ts-ignore
        userId:req.userId
    })
    res.json({
        message:"Deleted"
    })
})



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


