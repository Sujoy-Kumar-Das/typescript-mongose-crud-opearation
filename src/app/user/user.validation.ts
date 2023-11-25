import { z } from 'zod';

const UserNameValidationSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

const AddressValidationSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
});

const OrdersValidationSchema = z.object({
  productName: z.string().min(1),
  price: z.number().min(0.01),
  quantity: z.number().min(1),
});

const UserValidationSchema = z.object({
  userId: z.number().positive(),
  username: z.string().min(1),
  password: z.string().min(8),
  fullName: UserNameValidationSchema,
  age: z.number().min(0),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()).min(1),
  address: AddressValidationSchema,
  orders: z.array(OrdersValidationSchema).optional(),
});

export const OrderValidationSchema = z.array(OrdersValidationSchema);

export default UserValidationSchema;
