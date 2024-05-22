
import express from 'express';
import mongoose from 'mongoose';
import path from 'path'
import { userRegister } from './Controllers/user.js';
import { User } from './Models/Users.js';
import { Contact } from './Models/Contactus.js';
import bodyPaser from 'express';

import bcrypt from 'bcrypt'

const app = express();


app.use(bodyPaser.json())

app.use(express.static(path.join(path.resolve(),'public')))
const port =2000;

// Mongodb connection

mongoose.connect(
   "mongodb+srv://pk46066:B4RMaGhqBBNHhxel@cluster0.ipmeqni.mongodb.net/",
   {
      "dbName":"nodejs_express_api"
   }
).then(
   ()=>console.log("mongodb connected")
   ).catch(
      (error)=>console.log(error)
   );

const data = [
  
           {
               "kind": "books#volume",
               "id": 2,
               "etag": "aT6gRM8dLto",
              
           },
           {
               "kind": "books#volume",
               "id": 9,
               "etag": "48wn8Io+xX0",
                
           },
           {
               "kind": "books#volume",
               "id": 19,
               "etag": "/wisZye3qPU",
               
           },
           {
               "kind": "books#volume",
               "id": 43,
               "etag": "ZK8ST3zhg0U",
                
           }        


];

app.listen(port,()=>console.log(`server is running from port ${port}`))


app.get('/api/book-list/:id',(req,res) =>{
   const id = req.params.id
   console.log(id)
   const dataFiletr=data.filter((data)=>data.id==id)
   res.json({dataFiletr});
})


app.post('/api/add-book',(req,res) =>{
   // const {kind,id,tag }  = req.body
   console.log("sss",req.body)
})

app.get('/',(req,res) =>{
   const users ={
      title:'User registertion form',
      age:20
   }
   res.render('index.ejs',{url:null});
})

// ejs and express middlewire
app.use(express.urlencoded({extended:true}))

app.get('/user-list', async(req,res) =>{
    let users = await User.find().sort({createdAt:-1})
    res.render('user-list.ejs',{users});
 })

app.get('/register',(req,res) =>{
    res.render('register.ejs',{url:null});
 })


app.post('/register',userRegister)


app.get('/login',(req,res) =>{
    res.render('login.ejs',{url:null});
 })
 


 app.post('/login', async (req,res) =>{
    
    console.log('login req.body',req.body);

    const {email,psw} = req.body

    try {
        let user = await User.findOne({email})
        console.log('user list',user);
        if (!user) res.render('login.ejs',{msg:"User not found"});             
        else if(user.psw != psw) {
            console.log('invalid paswword',user);
            res.render('login.ejs',{msg:"invalid paswword"});
        }else{
            console.log('user-list',user);
            res.render('profile.ejs',{user});
        }
    } catch (error) {
        console.log('user error',error);
        res.send(error);
    }
 })



 app.post('/api/register', async (req,res) =>{
   const {name,email,mobile,psw}   = req.body

   const hashpass= await bcrypt.hash(psw,10)
   let registerContact = await User.create({
      name,
      email,
      mobile,
      psw:hashpass,
   });

   if(!registerContact) return res.status(404).json({message:'no user registered '})


   res.status(200).json({ registerContact, message: 'User registered successfully ' });
})


app.post('/api/login', async (req,res) =>{
    
   console.log('login req.body',req.body);

   const {email,psw} = req.body

   let user = await User.findOne({email})
   if (!user) res.status(404).json({msg:"User not found"});
   
   let verifyPass = await bcrypt.compare(psw,user.psw)

   if (!verifyPass) res.status(404).json({msg:"Invalid credential"});

   res.status(200).json({msg:`Welcome back : ${user.name}`});
})



app.post('/api/contact', async (req,res) =>{
   const apiContact   = req.body
   console.log('API contact',apiContact);
      try {
         await Contact.create(apiContact);
         console.log('API contact',apiContact);
         res.status(200).json({ message: 'Contact inserted successfully' });
   } catch (error) {
         console.log('API Contact error', res.json({error}));
         res.status(500).json({ error: 'Failed to insert Contact' });
   }
})


app.get('/api/contact-list/:id',async (req,res) =>{
   const id = req.params.id
   console.log(id)
   // let contact = await Contact.find(); // all data 
   let contact = await Contact.findById(id);// With id
   res.status(200).json({ contact, message: 'Contact list by id ' });
})


app.put('/api/contact-edit/:id',async (req,res) =>{
   const id = req.params.id
   const {name,email,mobile,subject}= req.body
   let updateContact = await Contact.findByIdAndUpdate(id,{name,email,mobile,subject},{new:true});// With id
   if(!updateContact) return res.status(404).json({message:'no contact update '})

   res.status(200).json({ updateContact, message: 'Contact list by id ' });
})


app.delete('/api/contact-delete/:id',async (req,res) =>{
   const id = req.params.id
   let deleteContact = await Contact.findByIdAndDelete(id);// With id

   if(!deleteContact) return res.status(404).json({message:'no contact delete '})

   res.status(200).json({ deleteContact, message: 'Contact delete by id ' });
})


 
 