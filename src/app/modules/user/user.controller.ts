import { Request, Response } from "express";
import { UserService } from "./user.services";
import userValidationSchema from "./user.validation";
import { ZodError } from "zod";

const createUser = async (req:Request, res:Response) => {
    try {
        const userData = req.body
        const zodparser = userValidationSchema.parse(userData)
        const result = await UserService.createUserInDB(zodparser);

    res.status(200).json({
        success: true,
        message: "User created successfully!",
        data:result
    })
    } catch (error: any) {
        if (error instanceof ZodError) {
            res.status(400).json({
                success: false,
                message:error.errors[0].message,
                errors: error.errors,
              });

          } else {
            res.status(500).json({
                success: false,
                message:error.message|| 'Something went wrong',
                Result: error,
              });
      
          }
      
    }
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

const getSingleUser = async (req: Request, res: Response) => {
 try {
    const id = req.params.userId
    const userId= Number(id)
    const result=await UserService.getSingleUserFromDB(userId)
    res.status(200).json({
        success: true,
        message: "User fetched successfully!",
        data:result
    })
 } catch (error: any) {
     res.status(500).json({
        success: false,
        message: "User not found",
        error: {
            "code": 404,
            "description": "User not found!"
        }
     })
    

 }
}


const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId
    const userId= Number(id)
    const updatedInfo = req.body
    const result = await UserService.updateSingleUserFromDB(updatedInfo, userId)
    res.status(200).json({
        success: true,
        message: "User updated successfully!",
        data:result
    })
  } catch (error) {
      res.status(404).json({
        success: false,
          message: "User not found",
          error:{ "code": 404,
          "description": "User not found!"}
    })
  }
}

const deleteSingleUser = async (req: Request, res: Response) => {
   try {
    const id = req.params.userId;
    const userId = Number(id);
    await UserService.deleteSingleUserFromDB(userId);
    res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data : null
    })
   } catch (error) {
    res.status(404).json({
        success: false,
    message: "User not found",
    error: {
        code:404,
        description:"User not found!"
    }
})
   }
}

const addOrder = async (req: Request, res: Response) => {
    try {
        const id = req.params.userId;
    const userId= Number(id)
    const order = req.body
     await UserService.addProductToDB(userId, order)
    res.status(200).json({
    success: true,
    message: "Order created successfully!",
    data: null,
 
    })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!"
            }
         
            })
    }
}

const getAllOrderOfSingleUser = async(req: Request, res: Response) => {
    const id = req.params.userId;
    const userId = Number(id)
    console.log(id, userId,"controller");
    const result = await UserService.getAllOrderOfSingleUserFromDB(userId)
    res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
        data:result,
        })
}


const calTotalPrice = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const userId = Number(id);
    const result = await UserService.calTotalPriceFromUserOrders(userId)
    res.status(200).json({
        success: true,
        message: "Total price calculated successfully!",
        data:result,
        })
  } catch (error:any) {
    res.status(404).json({
        success: false,
        message: "User not found!",
        error: {
            code: 404,
            description:error.message
        },
        })
  }
}

export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser,
    addOrder,
    getAllOrderOfSingleUser,
    calTotalPrice
}