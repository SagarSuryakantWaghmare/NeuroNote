// Here we write the database connection code

import mongoose from 'mongoose';

const connectDB=async():Promise<void> =>{
    try{
        const conn=await mongoose.connect(process.env.MONGODB_URI as string);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch(error){
        console.log(`Error:${error as Error}.message`);
        process.exit(1);
    }
}
export default connectDB;