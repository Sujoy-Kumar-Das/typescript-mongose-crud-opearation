import mongoose, { Schema } from 'mongoose';
import { TAddress, TUser, TUserName } from './user.interface';

// user name schema
const UserNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: [true, 'First Name is required.'] },
  lastName: { type: String, required: [true, 'Last Name is required.'] },
});

// user address schema
const UserAddressSchema = new Schema<TAddress>({
  street: { type: String, required: [true, 'Street is required.'] },
  city: { type: String, required: [true, 'City is required.'] },
  country: { type: String, required: [true, 'Country is required.'] },
});

// user schema
const UserSchema = new Schema<TUser>({
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
});

// user model
const UserModel = mongoose.model('user', UserSchema);

export default UserModel;
