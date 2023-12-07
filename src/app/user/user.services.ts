import { TOrders, TUser } from './user.interface';
import UserModel from './user.model';

const createUserInDB = async (userData: TUser) => {
  if (await UserModel.isUserExists(userData.userId.toString())) {
    throw new Error('User already exists.');
  }
  const result = await UserModel.create(userData);
  return result;
};

const getUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getUserFromDB = async (id: string) => {
  if (!(await UserModel.isUserExists(id))) {
    throw new Error('User not found');
  }
  const result = await UserModel.findOne({ userId: id });
  return result;
};

const updateUserInfo = async (userId: string, updatedData: Partial<TUser>) => {
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User not found.');
  }
  const result = await UserModel.findOneAndUpdate({ userId }, updatedData, {
    new: true,
  });
  return result;
};

const deleteUserFromDB = async (userId: string) => {
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User already deleted.');
  }
  await UserModel.deleteOne({ userId });
  const result = await UserModel.isUserExists(userId);
  return result;
};

const addOrderInDB = async (userId: string, orderData: TOrders) => {
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User not found.');
  }

  const result = await UserModel.findOneAndUpdate(
    { userId },
    { $push: { orders: orderData } },
    { new: true },
  );

  return result;
};

const getOrderFromDB = async (userId: string) => {
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User not found.');
  }
  const result = await UserModel.findOne({ userId }, { _id: 0, orders: 1 });
  return result;
};

const getTotalPriceFromDB = async (userId: string) => {
  let totalPrice = 0;

  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User not found.');
  }

  const user = await UserModel.findOne({ userId });

  user?.orders?.forEach((order) => {
    totalPrice = order.price * order.quantity + totalPrice;
  });

  return totalPrice;
};

export const userServices = {
  createUserInDB,
  getUsersFromDB,
  getUserFromDB,
  updateUserInfo,
  deleteUserFromDB,
  addOrderInDB,
  getOrderFromDB,
  getTotalPriceFromDB,
};
