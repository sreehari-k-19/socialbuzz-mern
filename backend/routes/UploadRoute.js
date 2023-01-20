import express from 'express';
import multer from 'multer'
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid';
import AWS from "aws-sdk";
dotenv.config()
import PostModel from "../models/postModels.js";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const router = express.Router()


const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY



// const s3Client = new S3Client({
//     correctClockSkew: true,
//     region,
//     credentials: {
//         accessKeyId,
//         secretAccessKey
//     }
// })


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION,
    correctClockSkew: true,
});

const s3 = new AWS.S3();


const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/', upload.single('file'), async (req, res) => {
    let uniqueCode = uuidv4();
    req.body.image = uniqueCode
    console.log("reqbody", req.body)

    console.log(req.file);
    const uploadParams = {
        Bucket: bucketName,
        Body: req.file.buffer,
        Key: uniqueCode,
        ContentType: req.file.mimetype,
    }
    // const command = new PutObjectCommand(uploadParams)
    // await s3.send(command)

    s3.putObject(uploadParams, async function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            const newPost = new PostModel(req.body)
            try {
                await newPost.save()
                res.status(200).json(newPost)

            } catch (error) {
                res.status(500).json(error)

            }
        }
    });
})



//get image

const s3Client = new S3Client({
    correctClockSkew: true,
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
})
router.get('/gt', async (req, res) => {
    console.log("fdsfk")
    const post = {
        img: "3-2-burger-free-png-image.png"
    }
    const params = {
        Bucket: bucketName,
        Key: post.img
    }
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3Client, command, { expiresIn: 7200 })
    console.log(url);

    //deletee/............

    // s3.deleteObject(params, function (err, data) {
    //     if (err) console.log(err, err.stack);
    //     else console.log(data);
    // });
})

export default router;