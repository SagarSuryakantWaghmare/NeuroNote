import express from 'express';
import mongoose from 'mongoose';
import { ContentModel, LinkModel, UserModel } from './db';
import jwt from 'jsonwebtoken';
import { JsonWebTokenError } from 'jsonwebtoken';
import { JWT_PASSWORD } from './config';
import { userMiddleware } from './middleware';
import { random } from './utils';
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
app.get("/api/v1/content", userMiddleware, async (req, res) => {
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
app.delete("/api/v1/content", userMiddleware, async (req, res) => {
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
app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
        try {
            const existingLink=await LinkModel.findOne({
                // @ts-ignore
               userId: req.userId

            })
            if(existingLink){
                res.json({
                    hash:existingLink.hash 
                })
                return;
            }
            const hash = random(10);
            await LinkModel.create({
                // @ts-ignore
                userId: req.userId,
                hash: hash
            })
            res.json({
                message: "/share/" + hash,
                shareLink: hash
            })
        } catch (error) {
            
        }
    }
    else {
        await LinkModel.deleteOne({
            // @ts-ignore
            userId: req.userId
        });
        res.json({
            message: "Share link deleted"
        })
    }

    res.json({
        message: "Updated sharable link"
    })
})

// getting the sharelink from the user and server
app.get("/api/v1/brain/:shareLink", userMiddleware, async (req, res) => {
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
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


