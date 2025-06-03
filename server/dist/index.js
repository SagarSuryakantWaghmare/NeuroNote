"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const dbConnect_1 = __importDefault(require("./dbConnect"));
// d.ts for the declation file
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const existingUser = yield db_1.UserModel.findOne({ username });
        if (existingUser) {
            res.status(409).json({
                message: "Username already exists"
            });
            return;
        }
        const user = yield db_1.UserModel.create({
            username,
            password
        });
        // Create token for immediate login
        const token = jsonwebtoken_1.default.sign({
            id: user._id
        }, config_1.JWT_PASSWORD);
        res.status(201).json({
            message: "User signed up successfully",
            userId: user._id,
            token
        });
    }
    catch (error) {
        console.error("Signup error:", error);
        // More detailed error message
        const errorMessage = error instanceof Error ?
            `Error during signup: ${error.message}` :
            "Error during signup";
        res.status(500).json({ message: errorMessage });
    }
}));
// Sign In
app.post('/api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = yield db_1.UserModel.findOne({
        username,
        password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, config_1.JWT_PASSWORD);
        res.json({
            message: "User signed in successfully",
            token: token
        });
    }
    else {
        res.status(401).json({
            message: "Invalid username or password"
        });
    }
}));
// Content api
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const link = req.body.link;
        const title = req.body.title;
        const type = req.body.type;
        if (!link || !type) {
            res.status(400).json({ message: "Link and type are required" });
            return;
        }
        const content = yield db_1.ContentModel.create({
            link,
            type,
            title,
            //@ts-ignore
            userId: req.userId,
            tags: []
        });
        res.json({
            message: "Content Added",
            content
        });
    }
    catch (error) {
        console.error("Error adding content:", error);
        res.status(500).json({ message: "Error adding content" });
    }
}));
// Give content
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.userId;
    const content = yield db_1.ContentModel.find({
        userId: userId
    }).populate("userId", "username");
    // It is used to get the specific data from the given 
    res.json({
        content
    });
}));
// Delete content
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    yield db_1.ContentModel.deleteMany({
        contentId,
        // @ts-ignore
        userId: req.userId
    });
    res.json({
        message: "Deleted"
    });
}));
// Sharing to the other user
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        try {
            const existingLink = yield db_1.LinkModel.findOne({
                // @ts-ignore
                userId: req.userId
            });
            if (existingLink) {
                res.json({
                    hash: existingLink.hash
                });
                return;
            }
            const hash = (0, utils_1.random)(10);
            yield db_1.LinkModel.create({
                // @ts-ignore
                userId: req.userId,
                hash: hash
            });
            res.json({
                message: "/share/" + hash,
                shareLink: hash
            });
        }
        catch (error) {
        }
    }
    else {
        yield db_1.LinkModel.deleteOne({
            // @ts-ignore
            userId: req.userId
        });
        res.json({
            message: "Share link deleted"
        });
    }
    res.json({
        message: "Updated sharable link"
    });
}));
// getting the sharelink from the user and server
app.get("/api/v1/brain/:shareLink", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = req.params.shareLink;
        if (!hash) {
            res.status(400).json({
                message: "Share link parameter is required"
            });
            return;
        }
        const link = yield db_1.LinkModel.findOne({
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
        const content = yield db_1.ContentModel.find({
            userId: link.userId
        });
        const user = yield db_1.UserModel.findOne({
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
    }
    catch (error) {
        console.error("Error in brain share link route:", error);
        res.status(500).json({
            message: "Server error processing share link"
        });
    }
}));
// Add health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});
// Start the server with database connection
const PORT = process.env.PORT || 3000;
// Connect to MongoDB first, then start the server
(0, dbConnect_1.default)()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
});
