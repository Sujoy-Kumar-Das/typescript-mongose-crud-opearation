import { Request, Response } from 'express';
import { userServices } from './user.services';
import {
  OrderValidationSchema,
  UpdateValidationSchema,
  UserValidationSchema,
} from './user.validation';

// create user controler
const createUserInDBControler = async (req: Request, res: Response) => {
  try {
    // validate data
    const validateData = UserValidationSchema.parse(req.body);

    const result = await userServices.createUserInDB(validateData);
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
        description: error || error || 'something went wrong',
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
    const { userId: id } = req.params;
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
    const { userId } = req.params;
    const validateUpdatedData = UpdateValidationSchema.parse(req.body);
    const result = await userServices.updateUserInfo(
      userId,
      validateUpdatedData,
    );

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
        error: error,
      },
    });
  }
};

// delete user
const deleteUserFromDBControler = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.deleteUserFromDB(userId);
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

// post order
const addOrderInDBControler = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // validate data
    const result = await userServices.addOrderInDB(userId, req.body);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
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

// get order
const getOrderFromDBControler = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getOrderFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
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

// get total price
const getTotalPriceFromDBControler = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getTotalPriceFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: result,
      },
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
  addOrderInDBControler,
  getOrderFromDBControler,
  getTotalPriceFromDBControler,
};
