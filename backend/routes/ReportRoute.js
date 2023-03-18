import express from "express";
import { getReports, reportPost } from "../controllers/ReportController.js";
const router=  express.Router();

router.get('/',getReports)
router.post('/:id',reportPost)
export default router;