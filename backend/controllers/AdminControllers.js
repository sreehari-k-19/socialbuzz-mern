
import ReportModel from "../models/reportModels.js";
export const getReports = async (req,res) => {
    try {
        const reports = await ReportModel.find()
            .populate('user.userId')
            .populate('user.reason')
            .exec();

        const userreports = reports.flatMap((report) => {
           return report.user.map((user) => {
                return {
                    reportedBy: user.userId.username,
                    reason: user.reason.reportreason,
                    postId: report.postId,
                    totalReports:report.user.length,
                    createdAt:user?.createdAt.toLocaleString()

                }
            })

        })
        res.status(200).json(userreports)
        console.log(userreports)
    } catch (error) {
        console.error(error);
    }
}
