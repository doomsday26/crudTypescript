import express from 'express';
import mongoose from 'mongoose';
import { Router } from './routes/routes';
import { redisClient } from './utils/redisClient';
import { errorHandler } from './utils/globalError';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(errorHandler);

app.use(express.json());
app.use(Router);
app.get('/', (req, res) => {
  res.send('this is homepage');
});
app.listen(port, async () => {
  await mongoose.connect(`${process.env.MONGO_URL}`);
  await redisClient.connect();
  console.log('server is running at port number 3000,redis connected')
});
