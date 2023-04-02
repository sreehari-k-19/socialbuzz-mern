import express from "express";
import multer from 'multer'
import authMiddleWare from '../middlewares/authMiddleware.js';
import { deleteUser, followUser, getAllUsers, getUser, UnFollowUser, UpdateCoverPicture, UpdateProfilePicture, updateUser } from "../controllers/UserController.js";

const router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.get('/:id',getUser)
router.get('/',getAllUsers)
router.put('/:id',updateUser)
router.delete('/:id',deleteUser)
router.put('/:id/follow',authMiddleWare,followUser)
router.put('/:id/unfollow',authMiddleWare,UnFollowUser)
router.put('/:id/updateprofile',upload.single('file'),UpdateProfilePicture)
router.put('/:id/updatecover',upload.single('file'),UpdateCoverPicture)


export default router;