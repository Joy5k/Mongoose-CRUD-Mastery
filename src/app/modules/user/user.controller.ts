import { Request, Response } from "express";
import { UserService } from "./user.services";
import userValidationSchema from "./user.validation";

const createUser = async (req:Request, res:Response) => {
    try {
        const userData = req.body
        const zodparser= userValidationSchema.parse(userData)
        const result = await UserService.createUserInDB(zodparser);

    res.status(200).json({
        success: true,
        message: "User created successfully!",
        data:result
    })
    } catch (error:any) {
        res.status(500).json({
          success: false,
          message:error.message|| 'Something went wrong',
          Result: error,
        });  }
}
const getAllUsers = async (req:Request, res:Response) => {
    try {
        const result = await UserService.getAllUsersFromDB()
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data:result
        })
    } catch (error:any) {
        res.status(500).json({
          success: false,
          "message": "User not found",
          Result: error,
        });  }
}

export const userController = {
    createUser,
    getAllUsers
}