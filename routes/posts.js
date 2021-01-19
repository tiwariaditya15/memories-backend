import express from "express";
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controller/posts.js';
import cors from 'cors';
const router = express.Router();

router.get("/", cors(), getPosts);
router.post("/", cors(), createPost);
router.patch("/:id", cors(), updatePost);
router.delete("/:id", cors(), deletePost);
router.patch("/:id/likePost", cors(), likePost);

export default router;