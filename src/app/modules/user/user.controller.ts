import { Request, Response } from "express";
import { UserService } from "./user.services";

const createUser = async (req:Request, res:Response) => {
    try {
        const userData = req.body
        const result = await UserService.createUserInDB(userData);
        console.log(result);
    res.status(200).json({
        success: true,
        message: "User created successfully!",
        data:result
    })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
                message: "Failed to create user",
                error:error
      })
    }
}

export const userController = {
    createUser,
}