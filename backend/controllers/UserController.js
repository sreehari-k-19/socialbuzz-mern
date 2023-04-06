import UserModel from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { getImageUrl, uploadImage } from "../helpers/s3.js";



//get All users

export const getAllUsers = async (req, res) => {
    try {
       let users = await UserModel.find({ adminblocked: false });
       console.log(users)
        users = users.map((user) => {
            const { password, ...otherDetails } = user._doc;
            return { ...otherDetails };
          });
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}

// get user

export const getUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await UserModel.findById(id);
        if (user) {
            if(user.profilePicture) user.profilePicture=  await getImageUrl("profile",user.profilePicture)
            if(user.coverPicture) user.coverPicture= await getImageUrl("coverpicture",user.coverPicture)
            const { password, ...otherDetails } = user._doc
            // console.log(otherDetails)
            res.status(200).json(otherDetails)
        } else {
            res.status(404).json("User does no exists")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}


// update user

export const updateUser = async (req, res) => {
    const id = req.params.id;
    const { _id, currentUserAdminStatus, password } = req.body;
    if (id === _id) {
        try {
            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt)
            }
            const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true })
            const token = jwt.sign(
                { username: user.username, id: user._id },
                process.env.JWTKEY,
                { expiresIn: "1h" }
            );
            console.log({ user, token })
            res.status(200).json({ user, token });

        } catch (errors) {
            res.status(500).json(error)

        }
    } else {
        res.status(403).json("Access Denied!")
    }
}

// Delete user

export const deleteUser = async (req, res) => {
    const id = req.params.id
    const { currentUserId, currentUserAdminStatus } = req.body
    if (currentUserId === id || currentUserAdminStatus) {
        try {
            await UserModel.findByIdAndDelete(id)
            res.status(200).json("User Deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("Access Denied")
    }
}

//followUser

export const followUser = async (req, res) => {
    const id = req.params.id
    const { _id } = req.body

    console.log("follow", id, _id)
    if (_id === id) {
        res.status(402).json("Action forbiddden")
    } else {
        try {
            const followUser = await UserModel.findById(id);
            const followingUser = await UserModel.findById(_id)
            if (!followUser.followers.includes(_id)) {
                await followUser.updateOne({ $push: { followers: _id } })
                await followingUser.updateOne({ $push: { following: id } })
                res.status(200).json("user followed")
            } else {
                res.status(403).json("user is already followed by you")
            }

        } catch (error) {
            res.status(500).json(error)

        }
    }
}

//unfollowUser

export const UnFollowUser = async (req, res) => {
    console.log("unfollowww")
    const id = req.params.id;
    const { _id } = req.body;

    if (_id === id) {
        res.status(403).json("Action Forbidden")
    }
    else {
        try {
            const unFollowUser = await UserModel.findById(id)
            const unFollowingUser = await UserModel.findById(_id)
            if (unFollowUser.followers.includes(_id)) {
                await unFollowUser.updateOne({ $pull: { followers: _id } })
                await unFollowingUser.updateOne({ $pull: { following: id } })
                res.status(200).json("Unfollowed Successfully!")
            }
            else {
                res.status(403).json("You are not following this User")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

// updateProfilepicture

export const UpdateProfilePicture = (req, res) => {
    const userId = req.params.id;
    console.log("update profile picuter", userId)
    let uniqueCode = uuidv4();
    try {  
        uploadImage("profile", req.file, uniqueCode).then(async (response) => {
            console.log(response)
            const user = await UserModel.findOneAndUpdate({ _id: userId }, { $set: { profilePicture: uniqueCode } }, { new: true });
            if (user.profilePicture) user.profilePicture = await getImageUrl("profile", user.profilePicture)
            console.log(user)
            res.status(200).json(user)
        }).catch((err => console.log(err)))
    } catch (error) {
        res.status(500).json(error)
    }
}

// updatCoverepicture

export const UpdateCoverPicture = (req, res) => {
    const userId = req.params.id;
    console.log("update cover picuter", userId)
    let uniqueCode = uuidv4();
    try {
        uploadImage("coverpicture", req.file, uniqueCode).then(async (response) => {
            console.log(response)
            const user = await UserModel.findOneAndUpdate({ _id: userId }, { $set: { coverPicture: uniqueCode } }, { new: true });
            if (user.coverPicture) user.coverPicture = await getImageUrl("coverpicture", user.coverPicture)
            console.log(user)
            res.status(200).json(user)
        }).catch((err => console.log(err)))
    } catch (error) {
        res.status(500).json(error)
    }
}