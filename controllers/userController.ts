import { Request, Response } from 'express';
import { handleServerError } from '../errors/handleServerError';
import Comment from '../models/Comment';
import Post from '../models/Post';
import Reply from '../models/Reply';
import User from '../models/User';

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    handleServerError(err as Error, res);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name, password });

    if (!user) {
      return res.status(400).json({ message: 'Check name and password' });
    }

    res.status(200).json(user);
  } catch (err) {
    handleServerError(err as Error, res);
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    const existingUser = await User.findOne({ name });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User with the same name already exists.' });
    }

    const user = await User.create({ name, password });

    res.status(200).json(user);
  } catch (err) {
    handleServerError(err as Error, res);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, password },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    handleServerError(err as Error, res);
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const posts = await Post.find({ author: id })
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

export const getUserComments = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const comments = await Comment.find({ author: id })
      .populate([{ path: 'replies', populate: { path: 'author' } }])
      .exec();

    res.status(200).json(comments);
  } catch (err) {
    handleServerError(err as Error, res);
  }
};

export const getUserReplies = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const replies = await Reply.find({ author: id }).lean().exec();
    res.status(200).json(replies);
  } catch (err) {
    handleServerError(err as Error, res);
  }
};
