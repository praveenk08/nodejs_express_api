import { name } from "ejs";
import mongoose from "mongoose";

const contactSchema= new mongoose.Schema({
    name:{type:String,required: true,lowercase: true, minLength: 2},
    email:{type:String,required: true,lowercase :true},
    mobile:{type:Number,required: true},
    subject:{type:String,required: true,trim : true},
    createdAt:{type:Date,default:Date.now}

})

export const Contact = mongoose.model("Contact",contactSchema)