import mongoose from 'mongoose';

const connectDB=async():Promise<void> =>{
    try{
        // const conn=await mongoose.connect(process.env.MONGODB_URL as string);
        // const conn=await mongoose.connect("mongodb+srv://sagarwaghmare1384:k5Pja5QmixtFSeDE@neuronote.3rfvhe8.mongodb.net/");
        const conn=await mongoose.connect("mongodb://localhost:27017/neuronote");
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }    catch(error){
        console.log(`Error: ${(error as Error).message}`);
        process.exit(1);
    }
}
export default connectDB;