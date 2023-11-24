import { z } from "zod";

const fullNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string(),
});
const addressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});
export const ordersValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export const updateUserValidationSchema = z.object({
  username: z
    .string()
    .max(20, { message: "username can not be more than 20 characters" }),
  password: z.string(),
  fullName: fullNameValidationSchema,
  age: z.number(),
  email: z.string(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
});
const userValidationSchema = z.object({
  userId: z.number(),
  username: z
    .string()
    .max(20, { message: "username can not be more than 20 characters" }),
  password: z.string(),
  fullName: fullNameValidationSchema,
  age: z.number(),
  email: z.string(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
});
export default userValidationSchema;