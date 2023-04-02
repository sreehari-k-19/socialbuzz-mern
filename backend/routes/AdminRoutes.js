import express from 'express';
import { blockUser, getPosts, getReports,getPost, getDashboard } from '../controllers/AdminControllers.js';
import { getAllUsers, getUser } from '../controllers/UserController.js';
import ReportReasonModel from '../models/reportReasonModels.js';
const router = express.Router();

router.get('/dashboard',getDashboard)
router.get('/getAllUsers',getAllUsers)
router.get('/allreports',getReports)
router.get('/getposts/:id',getPosts)
router.get('/getpost/:id',getPost)
router.get('/user/:id',getUser)
router.put('/block/:id',blockUser)

router.post('/report', async(req,res)=>{
    const reason= await new ReportReasonModel({
        reportreason:req.body.reportreason
    }).save()
})
export default router;

