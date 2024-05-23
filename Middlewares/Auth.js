import jwt from "jsonwebtoken";

import { User } from "../Models/Users.js";


const Authenticate = async (req,res,next) => {
    const jwttoken = req.header("Auth")
    console.log("This is jwt token ", jwttoken)
    
    if(!jwttoken) return res.status(400).json({msg:"Please login first"})
    const decodeJWT = jwt.verify(jwttoken,process.env.JWTKEY)
    console.log("verify jwt token ", decodeJWT)
    const id = decodeJWT.userId
    let user = User.find(id);
    if(!user) return res.status(400).json({msg:"User not find"})
    req.user = user;
    next();
} 

 export default Authenticate