import express from "express";
import { addComment, createPost, deletePost, getComment, getPost, getTimelinePosts, likePost, updatePost } from "../controllers/PostController.js";
const router=  express.Router()

router.post('/',createPost)
router.get('/:id',getPost)
router.put('/:id',updatePost)
router.delete('/:id',deletePost)
router.put('/:id/like',likePost)
router.get('/:id/timeline',getTimelinePosts)
router.post('/:id/comment',addComment)
router.get('/:id/comment',getComment)
export default router;