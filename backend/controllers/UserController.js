import UserModel from "../models/userModels.js";
import bcrypt from "bcrypt";

// get user
export const getUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await UserModel.findById(id);
        if (user) {
            const { password, ...otherDetails } = user._doc
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
    console.log(id, req.body)
    const { currentUserId, currentUserAdminStatus, password } = req.body;

    if (id === currentUserId || currentUserAdminStatus) {
        try {
            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt)
            }
            const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true })
            res.status(200).json(user)

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
    const { currentUserId } = req.body

    if (currentUserId === id) {
        res.status(402).json("Action forbiddden")
    } else {
        try {
            const followUser = await UserModel.findById(id);
            const followingUser = await UserModel.findById(currentUserId)
            if (!followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({ $push: { followers: currentUserId } })
                await followingUser.updateOne({ $push: { following: id } })
                res.status(200).json("user followed")
            }else{
                res.status(403).json("user is already followed by you")
            }

        } catch (error) {
            res.status(500).json(error)

        }
    }
}

//unfollowUser

export const UnFollowUser = async (req, res) => {
    const id = req.params.id
    const { currentUserId } = req.body

    if (currentUserId === id) {
        res.status(402).json("Action forbiddden")
    } else {
        try {
            const followUser = await UserModel.findById(id);
            const followingUser = await UserModel.findById(currentUserId)
            if (followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({ $pull: { followers: currentUserId } })
                await followingUser.updateOne({ $pull: { following: id } })
                res.status(200).json("user unfollowed")
            }else{
                res.status(403).json("user is not followed by you")
            }

        } catch (error) {
            res.status(500).json(error)

        }
    }
}

