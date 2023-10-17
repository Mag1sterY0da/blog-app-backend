import express from 'express';
import {
  getUserById,
  getUserComments,
  getUserPosts,
  getUserReplies,
  loginUser,
  registerUser,
  updateUser
} from '../controllers/userController';

export const userRoutes = express.Router();

userRoutes.post('/login', loginUser);

userRoutes.post('/register', registerUser);

userRoutes.get('/user/:id', getUserById);

userRoutes.post('/user/:id/update', updateUser);

userRoutes.get('/user/:id/posts', getUserPosts);

userRoutes.get('/user/:id/comments', getUserComments);

userRoutes.get('/user/:id/replies', getUserReplies);

export default userRoutes;
