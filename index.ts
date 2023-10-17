import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import commentRoutes from './routes/commentRoutes';
import postRoutes from './routes/postRoutes';
import replyRoutes from './routes/replyRouters';
import userRoutes from './routes/userRoutes';

dotenv.config();

const { PORT, DB_NAME, DB_USER, PASSWORD } = process.env;
const MONGO_URL = `mongodb+srv://${DB_USER}:${PASSWORD}@cluster0.94h91kq.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const app: Application = express();
app.use(express.json({ limit: '2mb' }));
app.use(cors());
app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(replyRoutes);

mongoose
  .connect(MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.listen(PORT, (err?: Error) => {
  err ? console.log(err) : console.log(`Listening on port ${PORT}`);
});
