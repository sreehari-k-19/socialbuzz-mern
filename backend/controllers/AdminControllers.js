
import { getImageUrl } from "../helpers/s3.js";
import PostModel from "../models/postModels.js";
import ReportModel from "../models/reportModels.js";
import UserModel from "../models/userModels.js";
import mongoose from "mongoose";


export const getDashboard = async (req, res) => {
    try {
        const totalusers = await UserModel.countDocuments({})
        const totalreports = await ReportModel.countDocuments({})
        const totalblockedaccounts = await UserModel.countDocuments({ adminblocked: true })
        const totalposts = await PostModel.countDocuments({})
        const usersByWeek = await UserModel.aggregate([
            {
                $group: {
                    _id: { $week: '$createdAt' },
                    count: { $sum: 1 }
                }
            }
        ]);
        const data = { totalusers, totalreports, totalblockedaccounts, totalposts, usersByWeek }
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getReports = async (req, res) => {
    try {
        const reports = await ReportModel.find()
            .populate('user.userId')
            .populate('user.reason')
            .exec();

        const userreports = reports.flatMap((report) => {
            return report.user.map((user) => {
                return {
                    reportedBy: user.userId.username,
                    reason: user.reason.reportreason,
                    postId: report.postId,
                    totalReports: report.user.length,
                    createdAt: user?.createdAt.toLocaleString()

                }
            })

        })
        res.status(200).json(userreports)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getPosts = async (req, res) => {
    console.log("psottttttt", req.params.id)
    const id = req.params.id
    try {
        const posts = await PostModel.find({ userId: id })
        for (const post of posts) {
            post.image = await getImageUrl("", post.image)
        }
        console.log("psot", posts)
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
}
export const getPost = async (req, res) => {
    console.log("psottttttt", req.params.id)
    const id = req.params.id
    try {
        const post = await PostModel.findOne({ _id: id })
        post.image = await getImageUrl("", post.image)
        console.log("psot", post)
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const blockUser = async (req, res) => {
    console.log(req.params.id)
    const id = req.params.id;
    try {
        let user = await UserModel.findOne({ _id: id })
        if (user) {
            user.adminblocked = !user.adminblocked
            user = await user.save()
            return res.status(200).json(user)
        }
        res.status(500).json("nouser")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}