import jwt from "jsonwebtoken";
import { format } from "timeago.js"
import { getImageUrl } from "../helpers/s3.js";
import PostModel from "../models/postModels.js";
import ReportModel from "../models/reportModels.js";
import UserModel from "../models/userModels.js";


export const getDashboard = async (req, res) => {
    console.log("dashbpoard")
    try {
        const totalusers = await UserModel.countDocuments({})
        const totalreports = await ReportModel.countDocuments({})
        const totalblockedaccounts = await UserModel.countDocuments({ adminblocked: true })
        const totalposts = await PostModel.countDocuments({})
        const today = new Date();
        const latYear = today.setFullYear(today.setFullYear() - 1);
        const userbymonth = await UserModel.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);

        const postbymonth = await PostModel.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                }
            }
        ])

        console.log(postbymonth)
        res.status(200).json({ totalusers, totalreports, totalblockedaccounts, totalposts, userbymonth, postbymonth })
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
        let post = await PostModel.findOne({ _id: id })
        post.image = await getImageUrl(null, post.image)
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
export const blockPost = async (req, res) => {
    console.log(req.params.id)
    const id = req.params.id;
    try {
        let post = await PostModel.findOne({ _id: id })
        if (post) {
            post.blocked = !post.blocked
            post = await post.save()
            return res.status(200).json(post)
        } 
        res.status(500).json("nopost")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const adminLogin = (req, res) => {
    const credintials = {
        email: "buzzadmin@gmail.com",
        password: "12345"
    }
    try {
        console.log("admin login ",req.body)
        const { email, password } = req.body;
        if(email===credintials.email && password === credintials.password) 
        {
            const token = jwt.sign({
                email: email
            }, process.env.JWTKEY, { expiresIn: '3h' })

            return res.status(200).json(token)
        }
        res.status(404).json("username or password is wrong")
    } catch (error) {
        res.status(500).json(error)
    }
}


export const getAllUsers = async (req, res) => {
    try {
        let users = await UserModel.find()
        users = users.map((user) => {
            const { password, ...otherDetails } = user._doc;
            const date = new Date(otherDetails.createdAt);
            const formattedDate = date.toLocaleDateString();
            return { ...otherDetails, createdAt: formattedDate };
          });
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getAllBlockedUsers = async (req, res) => {
    try {
       let users = await UserModel.find({ adminblocked: true });
       console.log(users)
        users = users.map((user) => {
            const { password, ...otherDetails } = user._doc;
            const formattedDate = format(otherDetails.updatedAt)
            return { ...otherDetails, updatedAt: formattedDate };
          });
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}