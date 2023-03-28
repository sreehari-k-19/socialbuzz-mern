import mongoose from "mongoose";

const reportReasonSchema = new mongoose.Schema({
  reportreason: {
    type: String,
    required: true
  }
});

const ReportReasonModel = mongoose.model('reportreasons', reportReasonSchema);

export default ReportReasonModel;