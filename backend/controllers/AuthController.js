import UserModel from "../models/userModels.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        // let user={
        //     username:"abc",
        //     _id:"12",
        // }
        const token = jwt.sign({
            username: user.username, id: user._id
        }, process.env.JWTKEY, { expiresIn: '1h' })
        console.log(token)
        res.status(200).json({ user, token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// login user

export const loginUser = async (req, res) => {
    console.log("user reggggggggggggggisr", req.body)
    const { username, password } = req.body
    try {
        const user = await UserModel.findOne({ username: username })
        if (user) {
            const validity = await bcrypt.compare(password, user.password)
            //   validity?res.status(200).json(user):res.status(400).json("Wrong password")

            if (!validity) {
                res.status(400).json("Wrong password")
            } else {
                const token = jwt.sign({
                    username: user.username, id: user._id
                }, process.env.JWTKEY, { expiresIn: '1h' })
                console.log(("login",token))
                res.status(200).json({ user, token })
            }

        } else {
            res.status(404).json("User does no exists")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}