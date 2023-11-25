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
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'something went wrong',
      error: {
        code: 404,
        description: error.message || 'something went wrong',
      },
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
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'something went wrong',
      error: {
        code: 404,
        description: error.message || 'something went wrong',
      },
    });
  }
};

// get single user controler
const getUserFromDBControler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userServices.getUserFromDB(id);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Something went wrong.',
      error: {
        code: 404,
        description: error.message || 'Server error.',
      },
    });
  }
};

// update user information
const updateUserInfoControler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userData: updateUserdData } = req.body;
    const result = await userServices.updateUserInfo(id, updateUserdData);
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Something went wrong.',
      error: {
        code: 404,
        description: error.message || 'Server error.',
        error:error
      },
    });
  }
};

// delete user
const deleteUserFromDBControler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userServices.deleteUserFromDB(id);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'something went wrong',
      error: {
        code: 404,
        description: error.message || 'something went wrong',
      },
    });
  }
};
export const userControler = {
  createUserInDBControler,
  getUsersFromDBControler,
  getUserFromDBControler,
  updateUserInfoControler,
  deleteUserFromDBControler,
};
