import { z } from "zod";


const fullNameValidationSchema = z.object({
    firstName: z.string()
    .min(1)
    .max(20),
    lastName: z.string()
})
const addressValidationSchema = z.object({
    street: z.string(),
    city: z.string(),
    country: z.string()
})
const ordersValidationSchema = z.array(
    z.object({
      productName: z.string(),
      price: z.number(),
      quantity: z.number(),
      optionalField: z.string().optional(),
    })
  );
const userValidationSchema = z.object({
    userId: z.number(),
  username: z.string()
    .max(20, { message: "username can not be more than 20 characters" }),
    password: z.string(),
    fullName: fullNameValidationSchema,
    age: z.number(),
    email: z.string(),
    isActive: z.boolean(),
    hobbies: z.array(z.string()),
    address: addressValidationSchema,
    orders:ordersValidationSchema.optional()
    
})
export default userValidationSchema