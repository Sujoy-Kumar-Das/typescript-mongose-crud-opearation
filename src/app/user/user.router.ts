import express from 'express';
import { userControler } from './user.controler';

const router = express.Router();

// create user router
router.post('/', userControler.createUserInDBControler);

// get all users router
router.get('/', userControler.getUsersFromDBControler);

// get single user router
router.get('/:id', userControler.getUserFromDBControler);

export const userRouter = router;
