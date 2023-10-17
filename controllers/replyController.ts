import { Request, Response } from 'express';
import { handleServerError } from '../errors/handleServerError';
import Comment from '../models/Comment';
import Post from '../models/Post';
import Reply from '../models/Reply';

export const addReply = async (req: Request, res: Response) => {
  try {
    const { postId, commentId } = req.params;
    const { author, content } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    const reply = new Reply({
      postId,
      commentId,
      author,
      content,
      date: new Date().toISOString()
    });
    await reply.save();

    comment.replies.push(reply._id);
    await comment.save();

    res.status(201).json({ message: 'Reply added' });
  } catch (err) {
    handleServerError(err as Error, res);
  }
};
