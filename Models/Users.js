import { name } from "ejs";
import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required: true,
        lowercase: true,
        minLength: 2
    },
    email:{
        type:String,
        required: true,
        lowercase: true,
        unique :true
    },
    mobile:{
        type:Number,
        required: true
    },
    psw:{
        type:String,
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

export const User = mongoose.model("User",userSchema)