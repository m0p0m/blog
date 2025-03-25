import Post from '../models/post.model';
import User from '../models/user.model';
import { ApiError } from '../utils/Response';

interface CreatePostData {
  title: string;
  content: string;
  userId: string;
}

class PostService {
  public async createPost(postData: CreatePostData) {
    const { title, content, userId } = postData;

    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const post = await Post.create({
      title,
      content,
      author: userId,
    });

    return {
      _id: user._id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
    };
  }

  public async getUserPosts(userId: string) {
    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .select('title content createdAt')
      .lean();

    return posts.map(post => ({
      _id: post._id.toString(),
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
    }));
  }
}

export default new PostService();
