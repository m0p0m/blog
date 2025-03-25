import { Request, Response, NextFunction } from 'express';
import PostService from '../services/post.service';
import { apiResponse } from '../utils/Response';

export const createPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, content } = req.body;
    const userId = (req.user as any)?._id?.toString();
    if (!userId) {
      throw new Error('Unauthorized');
    }

    const post = await PostService.createPost({
      title,
      content,
      userId,
    });
    apiResponse(res, 201, 'Post created successfully', post);
  } catch (error) {
    next(error);
  }
};

export const getUserPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req.user as any)?._id?.toString();
    if (!userId) {
      throw new Error('Unauthorized');
    }

    const posts = await PostService.getUserPosts(userId);
    apiResponse(res, 200, 'Posts fetched successfully', posts);
  } catch (error) {
    next(error);
  }
};
