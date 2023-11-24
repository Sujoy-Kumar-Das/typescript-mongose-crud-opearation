import express from 'express';
import { userControler } from './user.controler';

const router = express.Router();

router.post('/', userControler.createUserInDBControler);

router.get('/', userControler.getUsersFromDBControler);

export const userRouter = router;
