import { TUser } from './user.interface';
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

export const userServices = {
  createUserInDB,
  getUsersFromDB,
  getUserFromDB,
};
