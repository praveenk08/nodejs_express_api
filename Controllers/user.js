import { User } from "../Models/Users.js";

export const userRegister = async (req,res) =>{
   
    const {name,email,mobile,psw,createdAt} = req.body;
    try {
       let user = await User.create({name,email,mobile,psw,createdAt})
       console.log('Risgister success');
       console.log('Risgister req.body',req.body);
       res.send("<h1>DONE</h1>");
 
    } catch (error) {
       console.log(error);
       res.send('datbase error');
    }
 };