import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    desc: String,
    likes: [],
    comments: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
      },
      comment: {
        type: String,
        required: true,
      }
    }],
    image: String,
  },
  {
    timestamps: true,
  }
);

var PostModel = mongoose.model("posts", postSchema);
export default PostModel;