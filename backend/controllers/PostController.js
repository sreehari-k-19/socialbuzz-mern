import PostModel from "../models/postModels.js";
import UserModel from "../models/userModels.js";
import mongoose from "mongoose";
import { S3Client, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import AWS from "aws-sdk";
import dotenv from 'dotenv'
import ReportReasonModel from "../models/reportReasonModels.js";
import ReportModel from "../models/reportModels.js";
dotenv.config()

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

// createPost
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION,
    correctClockSkew: true,
});
const s3 = new AWS.S3();

export const createPost = async (req, res) => {
    console.log("post details", req.body);
    const newPost = new PostModel(req.body)
    try {
        await newPost.save()
        res.status(200).json("post created")

    } catch (error) {
        res.status(500).json(error)

    }
}

//getPost

export const getPost = async (req, res) => {
    const id = req.params.id
    try {
        const post = await PostModel.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}

//updatePost

export const updatePost = async (req, res) => {
    console.log("updatepost", req.body)
    const postId = req.params.id
    const { userId, desc } = req.body
    try {
        const updatedPost = await PostModel.findOneAndUpdate(
            { _id: postId, userId: userId },
            { $set: { desc: desc } },
            { new: true }
        );
        console.log(updatedPost)
        if (updatedPost) return res.status(200).json(updatedPost)
        return res.status(403).json("Action forbidden")

    } catch (error) {
        res.status(500).json(error)

    }
}

//delterPost

export const deletePost = async (req, res) => {
    console.log("delete post ")
    const postId = req.params.id
    const userId = req.query.userId
    try {
        const post = await PostModel.findById(postId)
        console.log(post)
        if (post.userId === userId) {
            const params = {
                Bucket: bucketName,
                Key: post.image
            }
            s3.deleteObject(params, async function (err, data) {
                if (err) {
                    console.log("error", err, err.stack);
                }
                else {
                    console.log("delete suss", data);
                    await post.deleteOne();
                    res.status(200).json("post deleted")
                }
            });

        } else {
            res.status(403).json("Action forbidden")
        }
    } catch (error) {
        res.status(500).json(error)

    }
}

//Like dislike

export const likePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const post = await PostModel.findById(id);
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } });
            res.status(200).json("Post liked");
        } else {
            await post.updateOne({ $pull: { likes: userId } });
            res.status(200).json("Post Unliked");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};


// add comment

export const addComment = async (req, res) => {
    const { userId, comment } = req.body;
    const postId = req.params.id;
    try {
        let post = await PostModel.findById({ _id: postId });
        const user = await UserModel.findById({ _id: userId });
        if (user) {
            post = await PostModel.findByIdAndUpdate({ _id: postId }, {
                $push: {
                    comments: {
                        userId: userId,
                        comment: comment
                    }
                }
            }, { new: true })
            const com = post.comments[post.comments.length - 1]
            const { username, lastname, firstname, profilePicture } = user;
            const newComment = {
                username, lastname, profilePicture, firstname, comments: com
            }
            console.log(newComment)
            return res.status(200).json(newComment)
        }
    } catch (error) {
        res.status(500).json(error);
    }

}

// getComment

export const getComment = async (req, res) => {
    const id = req.params.id;
    try {
        const comments = await PostModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $unwind: "$comments"
            }, {
                $lookup: {
                    from: "users",
                    localField: "comments.userId",
                    foreignField: "_id",
                    as: "commentUser"
                }
            },
            {
                $unwind: "$commentUser"
            },
            {
                $project: {
                    _id: 1,
                    comments: 1,
                    username: "$commentUser.username",
                    firstname: "$commentUser.firstname",
                    lastname: "$commentUser.lastname",
                    profilePicture: "$commentUser.profilePicture"

                }
            }
        ])
        console.log("comments", comments)
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json(error);
    }
}


// getAllposts

export const getTimelinePosts = async (req, res) => {
    console.log("gettimelineposts", req.query)
    const userId = req.params.id;
    const s3Client = new S3Client({
        correctClockSkew: true,
        region,
        credentials: {
            accessKeyId,
            secretAccessKey
        }
    })
    try {
        const currentUserPosts = await PostModel.find({ userId: userId })
        let followingPosts = await UserModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts"
                }
            },
            {
                $unwind: "$followingPosts"
            },
            {
                $addFields: {
                    "followingPosts.userId": {
                        $toObjectId: "$followingPosts.userId"
                    }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "followingPosts.userId",
                    foreignField: "_id",
                    as: "followingPosts.user"
                }
            },
            {
                $unwind: "$followingPosts.user"
            },
            {
                $unwind: "$followingPosts"
            },
            {
                $match: {
                    "followingPosts.blocked": false
                }
            },
            {
                $project: {
                    _id: "$followingPosts._id",
                    userId: "$followingPosts.userId",
                    desc: "$followingPosts.desc",
                    likes: "$followingPosts.likes",
                    image: "$followingPosts.image",
                    createdAt: "$followingPosts.createdAt",
                    updatedAt: "$followingPosts.updatedAt",
                    username: "$followingPosts.user.username",
                    firstname: "$followingPosts.user.firstname",
                    lastname: "$followingPosts.user.lastname",
                    profilePicture: "$followingPosts.user.profilePicture"
                },
            },

        ]);

        const reportPosts = await ReportModel.find({
            'user.userId': mongoose.Types.ObjectId(userId)
        })
        console.log(reportPosts, "rpp postt")
        if (reportPosts) {
            followingPosts = followingPosts.filter(post => !reportPosts.some(report => report.postId.equals(post._id)));
        }

        console.log(followingPosts, reportPosts)

        const allPosts = currentUserPosts.concat(...followingPosts).sort((a, b) => {
            return b.createdAt - a.createdAt;
        })
        console.log(allPosts)
        const { page } = req.query;
        const limit = 3;
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit);
        const startIndex = (pageNumber - 1) * limitNumber;
        const endIndex = pageNumber * limitNumber;

        const posts = allPosts.slice(startIndex, endIndex)

        // console.log("///////////////////////")
        // console.log(posts, "foll postss") 
        // console.log("///////////////////////")


        for (const post of posts) {
            const params = {
                Bucket: bucketName,
                Key: post.image
            }
            const command = new GetObjectCommand(params);
            const url = await getSignedUrl(s3Client, command, { expiresIn: 7200 })
            console.log(url, "image urlll")
            post.image = url
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
}

/// delete comment

export const deleteComment = async (req, res) => {
    console.log("commmt dlete", req.params)
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const postId = mongoose.Types.ObjectId(req.params.postid)
        // PostModel.updateOne(
        //     { _id: postId },
        //     { $pull: { comments: { _id: id } } }
        //   )
        await PostModel.findByIdAndUpdate(
            postId,
            { $pull: { comments: { _id: id } } },
            { new: true }
        );
            res.status(200).json("deltedted")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// update comment

export const updateComment = async (req, res) => {
console.log("up com",req.body,req.params.id)
    const id = mongoose.Types.ObjectId(req.params.id);
    const postId = mongoose.Types.ObjectId(req.params.postid)
    const { comment } = req.body;
    try {
        const post = await PostModel.findOneAndUpdate(
            { _id: postId, 'comments._id': id },
            { $set: { 'comments.$.comment': comment } },
            { new: true }
        )
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}