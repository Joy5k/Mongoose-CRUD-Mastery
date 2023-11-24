"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_services_1 = require("./user.services");
const user_validation_1 = __importStar(require("./user.validation"));
const zod_1 = require("zod");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const zodparser = user_validation_1.default.parse(userData);
        const result = yield user_services_1.UserService.createUserInDB(zodparser);
        res.status(200).json({
            success: true,
            message: "User created successfully!",
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        if (error.code === 11000 && error.keyPattern.username === 1) {
            res.status(400).json({
                success: false,
                message: `User already exists with username ---> ${error.keyValue.username} <---`,
                error: {
                    code: 11000,
                    description: "Duplicate key error",
                },
            });
        }
        else if (error instanceof zod_1.ZodError) {
            res.status(400).json({
                success: false,
                message: error.errors[0].message,
                errors: error.errors,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: error.message || "Something went wrong",
                Result: error,
            });
        }
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.UserService.getAllUsersFromDB();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            Result: error,
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const userId = Number(id);
        const result = yield user_services_1.UserService.getSingleUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
const updateSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const userId = Number(id);
        const updatedInfo = req.body;
        const zodUserUpdateparser = user_validation_1.updateUserValidationSchema.parse(updatedInfo);
        const result = yield user_services_1.UserService.updateSingleUserFromDB(zodUserUpdateparser, userId);
        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: result,
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({
                success: false,
                message: error.errors[0].message,
                errors: error.errors,
            });
        }
        res.status(404).json({
            success: false,
            message: "User not found",
            error: { code: 404, description: "User not found!" },
        });
    }
});
const deleteSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const userId = Number(id);
        yield user_services_1.UserService.deleteSingleUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: null,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const userId = Number(id);
        const order = req.body;
        const zodOrderParser = user_validation_1.ordersValidationSchema.parse(order);
        yield user_services_1.UserService.addProductToDB(userId, zodOrderParser);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: null,
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({
                success: false,
                message: error.errors[0].message,
                errors: error.errors,
            });
        }
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
const getAllOrderOfSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.userId;
    const userId = Number(id);
    const result = yield user_services_1.UserService.getAllOrderOfSingleUserFromDB(userId);
    res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
        data: result,
    });
});
const calTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const userId = Number(id);
        const result = yield user_services_1.UserService.calTotalPriceFromUserOrders(userId);
        res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
            data: { "totalPrice": result },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found!",
            error: {
                code: 404,
                description: error.message,
            },
        });
    }
});
exports.userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser,
    addOrder,
    getAllOrderOfSingleUser,
    calTotalPrice,
};
