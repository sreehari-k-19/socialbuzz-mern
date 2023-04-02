import UserModel from "../models/userModels.js"
import verificationModel from "../models/verficationModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import { OAuth2Client } from 'google-auth-library';
import jwt_decode from "jwt-decode";
import { mailSender } from "../helpers/mailSender.js";
import { getImageUrl } from "../helpers/s3.js";

export const registerUser = async (req, res) => {
    console.log("reg")
    const { username, firstname, lastname, password } = req.body;
    const salt = await bcrypt.genSalt(10)
    const hashedpass = await bcrypt.hash(password, salt)

    const newUser = new UserModel({ username, firstname, lastname, password: hashedpass, })

    try {
        const oldUser = await UserModel.findOne({ username })
        if (oldUser) {
            return res.status(500).send("username is already registerd")
            // return res.status(400).json("username is already started")
        }
        const user = await newUser.save()
        console.log(user)
        let token = await verificationModel.findOne({ userId: user._id });
        if (!token) {
            token = await new verificationModel({
                userId: user._id,
                token: uuidv4().toString("hex"),
            }).save();

        }
        const url = `${process.env.VERI_URL}/auth/${user.id}/verify/${token.token}`;
        console.log(url)
        // return res.status(500);
        let sentMail = await mailSender(username, url, user.firstname, false).then((response) => {
            return res.status(201).json({
                msg: "you should receive an email"
            })
        }).catch((error) => {
            return res.status(500).json({ error })
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


//verification

export const verifiy = async (req, res) => {
    try {
        console.log(req.params.id, req.params.token, "verify")
        const user = await UserModel.findOne({ _id: req.params.id });
        console.log(user, "user")
        if (!user) return res.status(400).send({ message: "Invalid link" });
        if (!user.expiresAt) return res.status(200).send({ message: "user verified" });

        const token = await verificationModel.findOne({
            userId: user._id,
            token: req.params.token,
        })
        if (!token) return res.status(400).send({ message: "Invalid link" });
        user.expiresAt = null;
        // console.log("1")
        //    const updateUser = await UserModel.findOneAndUpdate(
        //         { _id: req.params.id },
        //         { $unset: { expiresAt: "" } },
        //         { new: true }
        //     );
        // await UserModel.updateOne(
        //     { _id: req.params.id },
        //     { $unset: { expiresAt: 1 } }
        // );
        // console.log(updateUser.toObject());
        // console.log(2)
        await user.save();
        await token.remove();
        res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "something went wrong" })
    }

}


// login user

export const loginUser = async (req, res) => {
    console.log("user loginn", req.body)

    const { username, password } = req.body
    try {
        const user = await UserModel.findOne({ username: username })
        if (user) {
            if (user.adminblocked) return res.status(403).json()
            if (user.expiresAt) {
                console.log("expire at")
                let token = await verificationModel.findOne({ userId: user._id });
                if (!token) {
                    token = await new verificationModel({
                        userId: user._id,
                        token: uuidv4().toString("hex"),
                    }).save();
                }
                const url = `${process.env.VERI_URL}/auth/${user.id}/verify/${token.token}`;
                console.log(url)
                let sentMail = await mailSender(username, url).then((response) => {
                    return res.status(201).json({ email: username })
                }).catch((error) => {
                    return res.status(500).json({ error })
                })
                return res.status(201).json({ email: username })
            }
            const validity = await bcrypt.compare(password, user.password)
            // validity?res.status(200).json(user):res.status(400).json("Wrong password")

            if (!validity) {
                res.status(400).json("Wrong password")
            } else {
                const token = jwt.sign({
                    username: user.username, id: user._id
                }, process.env.JWTKEY, { expiresIn: '1h' })
                if (user.profilePicture) user.profilePicture = await getImageUrl("profile", user.profilePicture)
                if (user.coverPicture) user.coverPicture = await getImageUrl("coverpicture", user.coverPicture)
                console.log(user)
                res.status(200).json({ user, token })
            }

        } else {
            res.status(404).json("User does no exists")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

export const forgotPassword = async (req, res) => {
    console.log("forgotpassword", req.body)
    const { username } = req.body;
    try {
        const user = await UserModel.findOne({ username: username })
        if (!user) return res.status(201).json({ msg: "User not found in this email" })
        if (user.expiresAt) return res.status(201).json({ msg: "User not found in this email" })
        let token = await verificationModel.findOne({ userId: user._id });
        if (!token) {
            token = await new verificationModel({
                userId: user._id,
                token: uuidv4().toString("hex"),
            }).save();
        }
        const url = `${process.env.VERI_URL}/resetpassword/${user.id}/${token.token}`;
        console.log(url)
        // return res.status(201).json({ msg: "you should receive an email at" })

        let sentMail = await mailSender(username, url, user.firstname, true).then((response) => {
            return res.status(201).json({
                msg: "you should receive an email at"
            })
        }).catch((error) => {
            return res.status(500).json({ error })
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const resetPassword = async (req, res) => {
    console.log("resetpassword", req.body)
    const { id, token, confirmPassword } = req.body
    try {
        const user = await UserModel.findOne({ _id: id })
        if (!user) return res.status(400).json({ msg: "invalid user" })
        const token = await verificationModel.findOne({ userId: user._id, token: req.body.token })
        if (!token) return res.status(400).json({ msg: "Invalid submitions" })
        const salt = await bcrypt.genSalt(10)
        const hashedpass = await bcrypt.hash(confirmPassword, salt)
        await UserModel.updateOne({ _id: id }, { $set: { password: hashedpass } })
        await token.remove()
        return res.status(200).json({ msg: "password changed successfully, Login again to continue!" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const googleRegister = async (req, res) => {
    const { credential } = req.body
    try {
        let decoded = await jwt_decode(credential);
        const { given_name, family_name, email, sub } = decoded
        const user = await UserModel.findOne({ googleId: sub })
        if (user) {
            const token = jwt.sign({
                username: user.username, id: user._id
            }, process.env.JWTKEY, { expiresIn: '1h' })
            if (user.profilePicture) user.profilePicture = await getImageUrl("profile", user.profilePicture)
            if (user.coverPicture) user.coverPicture = await getImageUrl("coverpicture", user.coverPicture)
            console.log("00000000", user)
            res.status(200).json({ user, token })
        } else {
            const newUser = new UserModel({ username: email, firstname: given_name, lastname: family_name, googleId: sub, expiresAt: null })
            const user = await newUser.save()
            const token = jwt.sign({
                username: user.username, id: user._id
            }, process.env.JWTKEY, { expiresIn: '1h' })
            res.status(200).json({ user, token })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}
