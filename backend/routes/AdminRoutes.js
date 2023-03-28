import express from 'express';
import { getReports } from '../controllers/AdminControllers.js';
import { getAllUsers } from '../controllers/UserController.js';
import ReportReasonModel from '../models/reportReasonModels.js';
const router = express.Router();


router.get('/getAllUsers',getAllUsers)
router.get('/allreports',getReports)
router.post('/report', async(req,res)=>{
    const reason= await new ReportReasonModel({
        reportreason:req.body.reportreason
    }).save()
})
export default router;

