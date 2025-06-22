import mongoose from 'mongoose';
import { MONGODB_URL } from './config';

const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(MONGODB_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Database: ${conn.connection.name}`);
    } catch (error) {
        console.log(`Database Connection Error: ${(error as Error).message}`);
        process.exit(1);
    }
}

export default connectDB;