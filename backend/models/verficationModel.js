import mongoose from "mongoose";
const Schema= mongoose.Schema


const verificationSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "users",
		unique: true,
	},
	token: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: 3600 },
});

const verificationModel =  mongoose.model("verificationToken",verificationSchema);
export default verificationModel;