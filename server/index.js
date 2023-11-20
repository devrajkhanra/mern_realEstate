import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js'

dotenv.config();

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log('Connected to Mongo DB!');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json())
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)


