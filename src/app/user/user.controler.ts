import { Request, Response } from 'express';
import { userServices } from './user.services';

// create user controler
const createUserInDBControler = async (req: Request, res: Response) => {
  try {
    const { userData } = req.body;
    const result = await userServices.createUserInDB(userData);
    res.status(200).json({
      success: true,
      message: 'User Created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong.',
      error,
    });
  }
};

// get users controler
const getUsersFromDBControler = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users loaded successfully.',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: error,
    });
  }
};

export const userControler = {
  createUserInDBControler,
  getUsersFromDBControler,
};
