import express from 'express';
import { addPost, getPosts } from '../controllers/postController';

export const postRoutes = express.Router();

postRoutes.post('/post', addPost);

postRoutes.get('/posts', getPosts);

export default postRoutes;
