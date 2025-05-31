// Here we write the database connection code
import mongoose,{model,Schema} from 'mongoose';

// mongoose.connect(process.env.MONGODB_URL as string);
mongoose.connect("mongodb://localhost:27017/neuronote");

// So here we create the model
const UserSchema=new Schema({
    username:{type:String,unique:true},
    password:String,
})

export const UserModel=model("User",UserSchema);

 
const ContentSchema=new Schema({
    title:String,
    link:String,
    type:String,
    tags:[{type:mongoose.Types.ObjectId,ref:"Tag"}],
    userId:{type:mongoose.Types.ObjectId,ref:'User',required:true}
})


// Links schema
const linkSchema=new Schema({
    hash:String,
    userId:{type:mongoose.Types.ObjectId,ref:'User',required:true,
        unique:true
    }
})

export const LinkModel=model("Links",linkSchema);
export const ContentModel=model("Content",ContentSchema);

