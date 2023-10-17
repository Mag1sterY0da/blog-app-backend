import mongoose from 'mongoose';

export const replySchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comment',
    required: true
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  content: { type: String, required: true },
  date: { type: String, required: true }
});

const Reply = mongoose.model('reply', replySchema, 'replies');

export default Reply;
