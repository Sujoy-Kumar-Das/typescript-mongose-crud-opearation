import { z } from 'zod';

const UserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name must be at least 1 character long' }),
  lastName: z
    .string()
    .min(1, { message: 'Last name must be at least 1 character long' }),
});

const AddressValidationSchema = z.object({
  street: z
    .string()
    .min(1, { message: 'Street name must be at least 1 character long' }),
  city: z
    .string()
    .min(1, { message: 'City name must be at least 1 character long' }),
  country: z
    .string()
    .min(1, { message: 'Country name must be at least 1 character long' }),
});

const OrdersProperty = z.object({
  productName: z
    .string()
    .min(1, { message: 'Product name must be at least 1 character long' }),
  price: z.number().min(0.01, { message: 'Price must be a positive number' }),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
});

export const OrderValidationSchema = z.array(OrdersProperty);

export const UserValidationSchema = z.object({
  userId: z.number().positive({ message: 'User ID must be a positive number' }),
  username: z
    .string()
    .min(1, { message: 'Username must be at least 1 character long' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  fullName: UserNameValidationSchema,
  age: z.number().min(0, { message: 'Age must be a positive number' }),
  email: z.string().email({ message: 'Invalid email format' }),
  isActive: z.boolean(),
  hobbies: z
    .array(z.string())
    .min(1, { message: 'At least one hobby must be provided' }),
  address: AddressValidationSchema,
  orders: OrderValidationSchema.optional(),
});

export const UpdateValidationSchema = z.object({
  userId: z
    .number()
    .positive({ message: 'User ID must be a positive number' })
    .optional(),
  username: z
    .string()
    .min(1, { message: 'Username must be at least 1 character long' })
    .optional(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .optional(),
  fullName: UserNameValidationSchema.optional(),
  age: z
    .number()
    .min(0, { message: 'Age must be a positive number' })
    .optional(),
  email: z.string().email({ message: 'Invalid email format' }).optional(),
  isActive: z.boolean().optional(),
  hobbies: z
    .array(z.string())
    .min(1, { message: 'At least one hobby must be provided' })
    .optional(),
  address: AddressValidationSchema.optional(),
  orders: OrderValidationSchema.optional(),
});
