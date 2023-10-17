import { Request, Response } from 'express';
import { handleServerError } from '../errors/handleServerError';
import Comment from '../models/Comment';
import Post from '../models/Post';

export const addComment = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const { author, content } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = new Comment({
      postId,
      content,
      author,
      date: new Date().toISOString(),
      replies: []
    });

    await comment.save();

    post.comments.push(comment._id);

    await post.save();

    res.status(201).json({ message: 'Comment added' });
  } catch (err) {
    handleServerError(err as Error, res);
  }
};
