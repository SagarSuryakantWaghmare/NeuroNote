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
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Try Atlas first, then fallback to localhost
        let conn;
        try {
            conn = yield mongoose_1.default.connect("mongodb+srv://sagarwaghmare1384:k5Pja5QmixtFSeDE@neuronote.3rfvhe8.mongodb.net/");
            console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
        }
        catch (atlasError) {
            console.log('Atlas connection failed, trying localhost...');
            conn = yield mongoose_1.default.connect("mongodb://localhost:27017/neuronote");
            console.log(`MongoDB Local Connected: ${conn.connection.host}`);
        }
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        console.log('Please ensure MongoDB is running locally or Atlas IP is whitelisted');
        process.exit(1);
    }
});
exports.default = connectDB;
