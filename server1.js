// Module 
// import {sum} from './app.js';
// sum(10,52)

import express from 'express';
import mongoose from 'mongoose';
import path from 'path'
import { userRegister } from './Controllers/user.js';
const app = express();
import multer from 'multer';


import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dqu4nbxbr', 
  api_key: '173149595865263', 
  api_secret: 'sjWNH_CszxxNo2FTxKsFmAUyIiA' 
});



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
   // console.log('This is home route');
   res.render('index.ejs',{url:null});
})

// ejs and express middlewire
app.use(express.urlencoded({extended:true}))

app.post('/user', userRegister)


const storage = multer.diskStorage({
   destination: "./public/uploads",
   filename: function (req, file, cb) {
     const datenow = Date.now();
     cb(null, file.fieldname + '-' + datenow + path.extname(file.originalname));
   }
 })
 
 const upload = multer({ storage: storage })
const fileSchema = new mongoose.Schema({
   filename:String,
   public_id: String,
   imgUrl:String
})

const File = mongoose.model('Cloudinary',fileSchema)

 app.post('/profile', upload.single('avatar'), async  (req, res,) => {

   const file = req.file.path

   const cloudinaryResponse = await cloudinary.uploader.upload(file,{
      folder:'Nodejs_express_api'
   })
   
   // req.file is the `avatar` file
   // req.body will hold the text fields, if there were any


   const savetoDb = await File.create({
      filename:file.originalname,
      public_id: cloudinaryResponse.public_id,
      imgUrl:cloudinaryResponse.secure_url
   });
   console.log('This cloudinaryResponse ',cloudinaryResponse );
   res.render('index.ejs',{url:cloudinaryResponse.savetoDb});

 });