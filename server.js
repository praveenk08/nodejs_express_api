import express from "express";
import mongoose from "mongoose";
import path from "path";
import bodyPaser from "express";
import contactRouter from './routes/ContactUs.js'
import userRouter from './routes/Users.js'
import { config } from "dotenv";

import cors from 'cors'

console.log(process.env) // remove this after you've confirmed it is working

const port = 2000;
const app = express();
config({path:".env"})


// add these lines to accept req body for POST call
app.use(bodyPaser.json());
// app.use(express.json())
// ejs and express middlewire
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin:true,
    methods:["POST","GET","PUT","FETCH","DELETE"],
    credentials:true
    
}))

app.use(express.static(path.join(path.resolve(), "public")));

app.listen(port, 
    () => console.log(
        `server is running from port ${port}}`
    )
);
 
// Mongodb connection

mongoose
  .connect(process.env.MongoURL,{
      dbName: "nodejs_express_api",
    }
  )
  .then(() => console.log("mongodb connected"))
  .catch((error) => console.log(error));

app.use("/api/contact", contactRouter);

app.use("/api/user", userRouter);
