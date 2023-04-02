import express from 'express';
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import dotenv from 'dotenv'
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import AWS from "aws-sdk";
dotenv.config()

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION,
    correctClockSkew: true,
});
const s3Client = new S3Client({
    correctClockSkew: true,
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
})

const s3 = new AWS.S3();

export const uploadImage = (folder, file, filename,) => {
    const uploadParams = {
        Bucket: bucketName,
        Body: file.buffer,
        Key: `${folder}/${filename}`,
        ContentType: file.mimetype,
    }
    return new Promise((resolve, reject) => {
        s3.putObject(uploadParams, async function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        });
    })
}

export const getImageUrl = (folder, image) => {
    const params = {
        Bucket: bucketName,
        Key: `${folder}/${image}`,
    }
    return new Promise(async (resolve, reject) => {
        const command = new GetObjectCommand(params);
        const url = await getSignedUrl(s3Client, command, { expiresIn: 7200 })
        // console.log(url)
        if(url) resolve(url) ;
        return reject()
    })
}
