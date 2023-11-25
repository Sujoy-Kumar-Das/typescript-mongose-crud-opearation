import express from 'express';
import { userControler } from './user.controler';

const router = express.Router();

// create user router
router.post('/', userControler.createUserInDBControler);

// get all users router
router.get('/', userControler.getUsersFromDBControler);

// get single user router
router.get('/:id', userControler.getUserFromDBControler);

// update user information
router.put('/:id', userControler.updateUserInfoControler);

// delete user
router.delete('/:id', userControler.deleteUserFromDBControler);

// add order
router.patch('/:id/orders', userControler.addOrderInDBControler);

// get order
router.get('/:id/orders', userControler.getOrderFromDBControler);

export const userRouter = router;
