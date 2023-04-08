import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from "cors"
import morgan from "morgan";
import session from 'express-session';
import AuthRoute from './routes/AuthRoute.js';

import UserRoute from './routes/UserRoute.js';
import PostRoute from './routes/PostRoute.js';
import UploadRoute from './routes/UploadRoute.js';
import ChatRoute from './routes/ChatRoute.js';
import MessageRoute from './routes/MessageRoute.js';
import ReportRoute from './routes/ReportRoute.js'
import GoogleRoute from './routes/GoogleRoute.js';
import AdminRoute from './routes/AdminRoutes.js'

const app = express();
app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}))
app.use(cors({origin:[
    "https://socialbuzz.fun",
    "http://localhost:3000",
    "https://api.socialbuzz.fun",
    "*"
]}))
dotenv.config()

mongoose.connect(process.env.MONGODB,{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
    app.listen(5000,()=>{
        console.log('port 5000')
    })
}).catch((error)=>console.log(error))

// app.use(
// 	cookieSession({
// 		name: "session",
// 		keys: ["cyberwolve"],
// 		maxAge: 24 * 60 * 60 * 100,
// 	})
// );
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
  }));
  app.use(morgan("common")); 


app.use('/auth',AuthRoute)  
app.use('/user',UserRoute)
app.use('/post',PostRoute)
app.use('/upload',UploadRoute)
app.use('/chat',ChatRoute)
app.use('/message',MessageRoute)
app.use('/report',ReportRoute)
app.use('/google/auth',GoogleRoute)
app.use('/admin',AdminRoute)
