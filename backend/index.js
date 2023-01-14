import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from "cors"
import AuthRoute from './routes/AuthRoute.js';
import UserRoute from './routes/UserRoute.js';
import PostRoute from './routes/PostRoute.js';

const app = express();
app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}))
app.use(cors())
dotenv.config()

mongoose.connect(process.env.MONGODB,{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
    app.listen(process.env.port,()=>{
        console.log('port 5000')
    })
}).catch((error)=>console.log(error))

app.use('/auth',AuthRoute)  
app.use('/user',UserRoute)
app.use('/post',PostRoute)