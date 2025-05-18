// Here we write the database connection code
import mongoose,{model,Schema} from 'mongoose';

// mongoose.connect(process.env.MONGODB_URL as string);
mongoose.connect("mongodb://localhost:27017/");

// So here we create the model
const UserSchema=new Schema({
    username:{type:String,unique:true},
    password:String,
})

export const UserModel=model("User",UserSchema);

