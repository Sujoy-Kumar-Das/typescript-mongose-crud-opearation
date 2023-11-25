import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

import {
  TAddress,
  TOrders,
  TUser,
  TUserModel,
  TUserName,
} from './user.interface';
import config from '../config';

// user name schema
const UserNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: [true, 'First Name is required.'] },
  lastName: { type: String, required: [true, 'Last Name is required.'] },
});

// user address schema
const UserAddressSchema = new Schema<TAddress>(
  {
    street: { type: String, required: [true, 'Street is required.'] },
    city: { type: String, required: [true, 'City is required.'] },
    country: { type: String, required: [true, 'Country is required.'] },
  },
  { _id: false },
);

// users orders schema
const OrdersSchema = new Schema<TOrders>(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false },
);

// user schema
const UserSchema = new Schema<TUser, TUserModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: {
    type: UserNameSchema,
    required: true,
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: {
    type: [String],
    required: true,
  },
  address: {
    type: UserAddressSchema,
    required: true,
  },
  orders: [OrdersSchema],
});

// user pre schema middleware for password hassing

UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.saltRounds));
  next();
});

// post middleware for find user data

// method for remove password
UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

UserSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await UserModel.findOne({ userId: id });
  return existingUser;
};

// user model
const UserModel = mongoose.model<TUser, TUserModel>('user', UserSchema);

export default UserModel;
