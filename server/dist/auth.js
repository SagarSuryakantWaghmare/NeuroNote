"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const userMiddleware = (req, res, next) => {
    try {
        const header = req.headers["authorization"];
        if (!header) {
            res.status(401).json({
                message: "Authorization header missing"
            });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(header, config_1.JWT_PASSWORD);
        if (decoded) {
            // Type-safe now with global declaration
            req.userId = decoded.id;
            next();
        }
        else {
            res.status(403).json({
                message: "You are not logged in"
            });
        }
    }
    catch (error) {
        console.error("Auth middleware error:", error);
        res.status(403).json({
            message: "Authentication failed"
        });
    }
};
exports.userMiddleware = userMiddleware;
// Override the types of the express request object
