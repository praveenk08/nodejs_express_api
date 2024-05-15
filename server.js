
import express from 'express';
import mongoose from 'mongoose';
import path from 'path'
import { userRegister } from './Controllers/user.js';
import { User } from './Models/Users.js';
const app = express();

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


app.listen(port,()=>console.log(`server is running from port ${port}`))

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

 