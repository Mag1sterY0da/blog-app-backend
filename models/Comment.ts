import mongoose from 'mongoose';

export const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post',
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  content: { type: String, required: true },
  date: { type: String, required: true },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'reply'
    }
  ]
});

const Comment = mongoose.model('comment', commentSchema);

export default Comment;
