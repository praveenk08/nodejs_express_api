import { name } from "ejs";
import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    mobile:{type:Number},
    psw:{type:String},
    createdAt:{type:Date,default:Date.now}

})

export const User = mongoose.model("User",userSchema)