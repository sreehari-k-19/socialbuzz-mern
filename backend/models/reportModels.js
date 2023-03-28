import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'posts'
  },
  user: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users'
    },
    reason: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'reportreasons'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ReportModel = mongoose.model('Report', reportSchema);

export default ReportModel;


