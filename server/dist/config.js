"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRONTEND_URL = exports.NODE_ENV = exports.PORT = exports.MONGODB_URL = exports.JWT_PASSWORD = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
exports.JWT_PASSWORD = process.env.JWT_PASSWORD || "SagarCanDoIt";
exports.MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/neuronote";
exports.PORT = process.env.PORT || 3000;
exports.NODE_ENV = process.env.NODE_ENV || "development";
exports.FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
