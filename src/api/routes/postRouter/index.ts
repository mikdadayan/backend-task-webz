import { Router } from "express";

import { deletePost, getUsersPosts } from "../../controllers/posts";

const router = Router();
router.get("/posts/:userId", getUsersPosts);
router.delete("/posts/:postId", deletePost);

export default router;
