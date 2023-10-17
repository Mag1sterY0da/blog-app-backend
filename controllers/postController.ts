import { Request, Response } from 'express';
import { handleServerError } from '../errors/handleServerError';
import Post from '../models/Post';

export const addPost = async (req: Request, res: Response) => {
  try {
    const { title, content, author } = req.body;

    await Post.create({
      title,
      content,
      author,
      date: new Date().toISOString()
    });

    res.status(201).json({
      message: 'Post created'
    });
  } catch (err) {
    handleServerError(err as Error, res);
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find()
      .populate('author')
      .populate({
        path: 'comments',
        populate: [
          { path: 'author' },
          { path: 'replies', populate: { path: 'author' } }
        ]
      })
      .exec();

    res.status(200).json(posts);
  } catch (err) {
    handleServerError(err as Error, res);
  }
};
