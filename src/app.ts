import express, { Application } from 'express';
import cors from 'cors';
import { userRouter } from './app/user/user.router';
const app:Application = express();

// express middlewares
app.use(express.json());
app.use(cors());

app.use('/api/users', userRouter);

export default app;
