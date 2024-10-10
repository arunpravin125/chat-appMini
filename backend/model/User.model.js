import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
   
    profilePic:{
        type:String,
        required:true
    }
   
},{timestamps:true})

const User = mongoose.model("User",UserSchema)

export default User