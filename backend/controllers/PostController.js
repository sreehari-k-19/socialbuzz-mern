import PostModel from "../models/postModels.js";
import UserModel from "../models/userModels.js";
import mongoose from "mongoose";
import { S3Client, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import AWS from "aws-sdk";
import dotenv from 'dotenv'
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
    const postId = req.params.id
    const { userId } = req.body
    try {
        const post = await PostModel.findById(postId)
        if (post.userId === userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json("post updated")
        } else {
            res.status(403).json("Action forbidden")
        }
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
                    console.log("error",err, err.stack);
                }
                else{
                    console.log("delete suss",data);
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


// getAllposts

export const getTimelinePosts = async (req, res) => {
    console.log("gettimelineposts")
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
        const followingPosts = await UserModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            }, {
                $lookup: {
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts"
                }
            }, {
                $project: {
                    followingPosts: 1,
                    _id: 0
                }
            }
        ])
        console.log(followingPosts, "foll postss")
        const posts = currentUserPosts.concat(...followingPosts[0].followingPosts).sort((a, b) => {
            return b.createdAt - a.createdAt;
        })
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
        console.log(posts)
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
}