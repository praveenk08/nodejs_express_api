import express from 'express';
import mongoose from 'mongoose';
import path from 'path'
import bodyPaser from 'express';

import {insertContactUs,fetchAllContact,fetchContactbyid,updateContactbyid,deleteContactbyid} from './Controllers/contactus.js'

const port =2000;
const app = express();

app.use(bodyPaser.json())

app.use(express.static(path.join(path.resolve(),'public')))

app.listen(port,()=>console.log(`server is running from port ${port}`))

// ejs and express middlewire
app.use(express.urlencoded({extended:true}))

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



app.post('/api/contact', insertContactUs)

app.get('/api/fetch-contact-list/',fetchAllContact)

app.get('/api/fetch-contact-list-byid/:id',fetchContactbyid)

app.put('/api/update-contact-byid/:id',updateContactbyid)
 
app.delete('/api/delete-contact-byid/:id',deleteContactbyid)
 