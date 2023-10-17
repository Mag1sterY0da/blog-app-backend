import express from 'express';
import { addReply } from '../controllers/replyController';

export const replyRoutes = express.Router();

replyRoutes.post('/post/:postId/comment/:commentId/reply', addReply);

export default replyRoutes;
