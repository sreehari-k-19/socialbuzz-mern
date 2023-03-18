import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
        },

    },{
        timestamps:true
    }
)

const ChatModel=mongoose.model("chat",chatSchema)
export default ChatModel;