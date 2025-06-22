import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const JWT_PASSWORD = process.env.JWT_PASSWORD || "SagarCanDoIt";
export const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/neuronote";
export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";