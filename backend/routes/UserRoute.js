import express from "express";
import authMiddleWare from '../middlewares/authMiddleware.js';
import { deleteUser, followUser, getAllUsers, getUser, UnFollowUser, updateUser } from "../controllers/UserController.js";

const router = express.Router();

router.get('/:id',getUser)
router.get('/',getAllUsers)
router.put('/:id',updateUser)
router.delete('/:id',deleteUser)
router.put('/:id/follow',authMiddleWare,followUser)
router.put('/:id/unfollow',authMiddleWare,UnFollowUser)


export default router;