// Here we write the database connection code
import {model,Schema} from 'mongoose';
import connectDB from './dbConnect';

connectDB().catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
});

// So here we create the model
const UserSchema=new Schema({
    username:{type:String,unique:true},
    password:String,
})

export const UserModel=model("User",UserSchema);

