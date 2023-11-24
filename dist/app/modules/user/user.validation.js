"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidationSchema = exports.ordersValidationSchema = void 0;
const zod_1 = require("zod");
const fullNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(20),
    lastName: zod_1.z.string(),
});
const addressValidationSchema = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    country: zod_1.z.string(),
});
exports.ordersValidationSchema = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
exports.updateUserValidationSchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .max(20, { message: "username can not be more than 20 characters" }),
    password: zod_1.z.string(),
    fullName: fullNameValidationSchema,
    age: zod_1.z.number(),
    email: zod_1.z.string(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: addressValidationSchema,
});
const userValidationSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z
        .string()
        .max(20, { message: "username can not be more than 20 characters" }),
    password: zod_1.z.string(),
    fullName: fullNameValidationSchema,
    age: zod_1.z.number(),
    email: zod_1.z.string(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: addressValidationSchema,
});
exports.default = userValidationSchema;
