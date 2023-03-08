import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        profilePicture: String,
        coverPicture: String,
        about: String,
        livesin: String,
        worksAt: String,
        relationShip: String,
        country:String,
        followers: [],
        following: [],
        expiresAt: {
            type: Date,
            default: Date.now(),
            expires: 600 // expires after 600 seconds 
          }
    },
    { timestamps: true, }
)

// UserSchema.index({ "expiresAt": 1 }, { expireAfterSeconds: 0 });

const UserModel = mongoose.model("Users", UserSchema)

export default UserModel