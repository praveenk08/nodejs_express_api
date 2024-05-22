import { User } from "../Models/Users.js";

export const userRegister = async (req,res) =>{
   
   //  const {name,email,mobile,psw,createdAt} = req.body;
    const contactUser = req.body   
       try {
         let user = await User.create(contactUser);
          console.log('API User',contactUser);
          res.status(200).json({ contactUser,message: 'User Risgister successfully' });
    } catch (error) {
          console.log('API User error', res.json({error}));
          res.status(500).json({ error: 'Failed to Risgister User' });
    }
 };


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
   res.status(200).json({ updateUser, message : 'Ipdated User Successfuly ' });
}

export const deleteUserbyid = async (req,res) =>{
   const id = req.params.id
   let deleteUser = await User.findByIdAndDelete(id);
   if(!deleteUser) return res.status(404).json({message :'No User found '}) 
   res.status(200).json({ deleteUser, message : 'Deleted User Successfuly ' });
}