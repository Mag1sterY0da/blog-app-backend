import express from 'express';
import { addComment } from '../controllers/commentController';

export const commentRoutes = express.Router();

commentRoutes.post('/post/:id/comment', addComment);

export default commentRoutes;
