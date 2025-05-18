"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
// Here we write the database connection code
const mongoose_1 = require("mongoose");
const dbConnect_1 = __importDefault(require("./dbConnect"));
(0, dbConnect_1.default)().catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
});
// So here we create the model
const UserSchema = new mongoose_1.Schema({
    username: { type: String, unique: true },
    password: String,
});
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
