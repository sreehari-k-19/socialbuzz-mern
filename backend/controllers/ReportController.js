import PostModel from "../models/postModels.js";
import ReportModel from "../models/reportModels.js";
import ReportReasonModel from "../models/reportReasonModels.js";
import UserModel from "../models/userModels.js";

export const getReports = async (req, res) => {
    try {
        const reports = await ReportReasonModel.find()
        console.log(reports)
        res.status(200).json(reports)
    } catch (error) {
        res.status(500).json(error)

    }
}

export const reportPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const {userId,reason} =req.body;
        const post= await PostModel.findOne({_id:postId})
        if(!post) return res.status(400).json({msg:"post not avialable"})
        const user=await UserModel.findOne({_id:userId})
        if(!user) return res.status(400).json({msg:"something went wrong"})
        const oldreport= await ReportModel.findOne({postId: postId, user: {$elemMatch: {userId: userId} }})
        if(oldreport) return res.status(201).json({msg:"Already you reported this post"})
        const report=new ReportModel({postId:postId,user:[{userId:userId,reason:reason}],createdAt: new Date() })
        await report.save();
        console.log(report)
        res.status(200).json({msg:"Thanks fot letting us know"})
    } catch (error) {
        res.status(500).json(error)
    }
}