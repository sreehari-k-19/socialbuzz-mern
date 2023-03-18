import express from 'express';
import ReportReasonModel from '../models/reportReasonModels.js';
const router = express.Router();

router.post('/', async(req,res)=>{
    const reason= await new ReportReasonModel({
        reportreason:req.body.reportreason
    }).save()
})
export default router;

