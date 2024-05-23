import { User } from "../Models/Users.js";
import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'

export const userRegister = async (req,res) =>{
   
   //  const {name,email,mobile,psw,createdAt} = req.body;
   const contactUser = req.body 
   let user = await User.create(contactUser); 
   if(!user) return res.status(500).json({ error: 'Failed to Resgister User' });   
   return res.status(200).json({ contactUser,message: 'User Resgister successfully' });

 };

export const login = async (req,res) =>{
    
   console.log('login req.body',req.body);
   const {email,psw} = req.body

   if(email == "" || psw == "")
      res.status(400).json({msg:"All Field are reqired"});

   let user = await User.findOne({email})
   if (!user) return res.status(404).json({msg:"User not found"});

   let verifyPass = await bcrypt.compare(psw,user.psw)
   
   if (!verifyPass) res.status(404).json({msg:"Invalid credential"});
   
   // Useing jwt 
   const jwttoken = jwt.sign({ userId : user._id }, 'nodeapi', {expiresIn:'1d'});

   res.status(200).json({user,msg:`Welcome back : ${user.name}`,jwttoken});
}


export const fetchAllUser = async (req,res) =>{
   let user = await User.find(); 
   if(!user) return res.status(404).json({ message: 'No User Found' })    
   res.status(200).json({ user, message: 'User list' });
}

export const fetchUserbyid = async (req,res) =>{
   const id = req.params.id
   let user = await User.findById(id);
   if(!user) return res.status(404).json({ message : 'No User Found' })    
   res.status(200).json({ user, message : 'User list by id' });
}

export const updateUserbyid = async (req,res) =>{
   const id = req.params.id
   const {name,email,mobile,psw}= req.body
   let updateUser = await User.findByIdAndUpdate(id,{name,email,mobile,psw},{new:true});
   if(!updateUser) return res.status(404).json({message :'No User found '}) 
   res.status(200).json({ updateUser, message : 'Udated User Successfuly ' });
}

export const deleteUserbyid = async (req,res) =>{
   const id = req.params.id
   let deleteUser = await User.findByIdAndDelete(id);
   if(!deleteUser) return res.status(404).json({message :'No User found '}) 
   res.status(200).json({ deleteUser, message : 'Deleted User Successfuly ' });
}