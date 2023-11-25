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

const updateUserInfo = async (id: string, updatedData: TUser) => {
  if (!(await UserModel.isUserExists(id))) {
    throw new Error('User not found.');
  }
  await UserModel.updateOne({ userId: id }, updatedData);
  const result = await UserModel.isUserExists(id);
  return result;
};

const deleteUserFromDB = async (id: string) => {
  if (!(await UserModel.isUserExists(id))) {
    throw new Error('User already deleted.');
  }
  await UserModel.deleteOne({ userId: id });
  const result = await UserModel.isUserExists(id);
  return result;
};

const addOrderInDB = async (id: string, orderData: TOrders) => {
  if (!(await UserModel.isUserExists(id))) {
    throw new Error('User not found.');
  }

  await UserModel.updateOne(
    { userId: id },
    { $addToSet: { orders: orderData } },
  );

  const result = await UserModel.isUserExists(id);

  return result;
};

const getOrderFromDB = async (id: string) => {
  if (!(await UserModel.isUserExists(id))) {
    throw new Error('User not found.');
  }
  const result = await UserModel.findOne({ userId: id }, { _id: 0, orders: 1 });
  return result;
};

export const userServices = {
  createUserInDB,
  getUsersFromDB,
  getUserFromDB,
  updateUserInfo,
  deleteUserFromDB,
  addOrderInDB,
  getOrderFromDB,
};
