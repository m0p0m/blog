import { Router } from 'express';
import { createPost, getUserPosts } from '../controllers/post.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', protect, createPost);
router.get('/profile', protect, getUserPosts);

export default router;
