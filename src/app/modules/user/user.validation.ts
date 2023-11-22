import { z } from "zod";


const fullNameValidationSchema = z.object({
    firstName: z.string()
    .min(1)
    .max(20),
    lastName: z.string()
})
const userValidationSchema = z.object({
    userId: z.number(),
    username:z.string(),
    password: z.string(),
    fullName
    
})