import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ContentModel, LinkModel, UserModel } from './db';
import jwt from 'jsonwebtoken';
import { JsonWebTokenError } from 'jsonwebtoken';
import { JWT_PASSWORD, PORT, FRONTEND_URL } from './config';
import { userMiddleware } from './auth';
import { random } from './utils';
import cors from 'cors';
import connectDB from './dbConnect';

// Initialize Express app
const app = express();

// CORS configuration for production
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));

app.use(express.json());

app.post('/api/v1/signup', async (req: Request, res: Response) => {
    try {
        // Get username and password from request body
        const { username, password } = req.body;
        
        // Validate input
        if (!username || !password) {
            res.status(400).json({ 
                message: "Username and password are required" 
            });
            return;
        }
        
        // Check if user already exists
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            res.status(409).json({ 
                message: "Username already exists" 
            });
            return;
        }

        const user = await UserModel.create({
            username,
            password
        });

        // Create token for immediate login
        const token = jwt.sign({
            id: user._id
        }, JWT_PASSWORD);

        res.status(201).json({
            message: "User signed up successfully",
            userId: user._id,
            token
        });
    } catch (error) {
        console.error("Signup error:", error);
        // More detailed error message
        const errorMessage = error instanceof Error ? 
            `Error during signup: ${error.message}` : 
            "Error during signup";
        res.status(500).json({ message: errorMessage });
    }
})

// Sign In
app.post('/api/v1/signin', async (req: Request, res: Response) => {
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
app.post("/api/v1/content", userMiddleware, async (req: Request, res: Response) => {
    try {
        const link=req.body.link;
        const title=req.body.title;
        const type=req.body.type;
        if (!link || !type) {
            res.status(400).json({ message: "Link and type are required" });
            return;
        }
        
        const content = await ContentModel.create({
            link,
            type,
            title ,
            //@ts-ignore
            userId: req.userId,
            tags: []
        });
        
        res.json({
            message: "Content Added",
            content
        });
    } catch (error) {
        console.error("Error adding content:", error);
        res.status(500).json({ message: "Error adding content" });
    }
})

// Give content
app.get("/api/v1/content", userMiddleware, async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")
    // It is used to get the specific data from the given 
    res.json({
        content
    })

})

// Delete content
app.delete("/api/v1/content", userMiddleware, async (req: Request, res: Response) => {
    const contentId = req.body.contentId;
    await ContentModel.deleteMany({
        contentId,
        // @ts-ignore
        userId: req.userId
    })
    res.json({
        message: "Deleted"
    })
})

// Sharing to the other user
app.post("/api/v1/brain/share", userMiddleware, async (req: Request, res: Response) => {
    try {
        const share = req.body.share;
        
        if (share) {
            // Check if user already has a share link
            const existingLink = await LinkModel.findOne({
                // @ts-ignore
                userId: req.userId
            });
            
            if (existingLink) {
                res.json({
                    hash: existingLink.hash,
                    message: "Share link already exists"
                });
                return;
            }
            
            // Create new share link
            const hash = random(10);
            await LinkModel.create({
                // @ts-ignore
                userId: req.userId,
                hash: hash
            });
            
            res.json({
                hash: hash,
                message: "Share link created successfully"
            });
        } else {
            // Delete existing share link
            await LinkModel.deleteOne({
                // @ts-ignore
                userId: req.userId
            });
            
            res.json({
                message: "Share link deleted"
            });
        }
    } catch (error) {
        console.error("Error in share endpoint:", error);
        res.status(500).json({
            message: "Error processing share request"
        });
    }
})

// Get all active share links for a user (MUST BE BEFORE the :shareLink route)
app.get("/api/v1/brain/shares", userMiddleware, async (req: Request, res: Response) => {
    try {
        console.log("GET /api/v1/brain/shares called");
        console.log("User ID from middleware:", req.userId);
        
        // Since userId is unique in LinkModel, use findOne instead of find
        const shareLink = await LinkModel.findOne({
            // @ts-ignore
            userId: req.userId
        }).populate("userId", "username");
        
        console.log("Found share link:", shareLink);
        
        if (!shareLink) {
            console.log("No share link found for user:", req.userId);
            res.json({
                shareLinks: [],
                message: "No active share links found"
            });
            return;
        }
        
        res.json({
            shareLinks: [{
                id: shareLink._id,
                hash: shareLink.hash,
                createdAt: (shareLink as any).createdAt || new Date(),
                shareUrl: `${req.protocol}://${req.get('host')}/share/${shareLink.hash}`
            }],
            message: "Share links retrieved successfully"
        });
    } catch (error) {
        console.error("Error fetching share links:", error);
        res.status(500).json({
            message: "Error fetching share links",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
})

// getting the sharelink from the user and server
app.get("/api/v1/brain/:shareLink", async (req: Request, res: Response) => {
    try {
        const hash = req.params.shareLink;
        if (!hash) {
            res.status(400).json({
                message: "Share link parameter is required"
            });
            return;
        }

        const link = await LinkModel.findOne({
            hash: hash
        });
        if (!link) {
            res.status(404).json({
                message: "Link not found"
            });
            return;
        }

        // UserId is the user who shared the link
        if (!link.userId) {
            res.status(400).json({
                message: "Invalid link: missing user ID"
            });
            return;
        }

        const content = await ContentModel.find({
            userId: link.userId
        });

        const user = await UserModel.findOne({
            _id: link.userId
        });
        if (!user) {
            res.status(404).json({
                message: "User not found"
            });
            return;
        }

        res.json({
            username: user.username,
            content: content
        });
    } catch (error) {
        console.error("Error in brain share link route:", error);
        res.status(500).json({
            message: "Server error processing share link"
        });
    }
})
// Add health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Start the server with database connection
// Connect to MongoDB first, then start the server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    });

