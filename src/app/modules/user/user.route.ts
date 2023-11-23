import express from 'express';
import { userController } from './user.controller';

const router = express.Router()

router.post("/", userController.createUser)
router.get("/", userController.getAllUsers)
router.get("/:userId", userController.getSingleUser)
router.put("/:userId", userController.updateSingleUser)
router.delete("/:userId", userController.deleteSingleUser)
router.put("/:userId/orders", userController.addOrder)
router.get("/:userId/orders", userController.getAllOrderOfSingleUser)
router.get("/:userId/orders/total-price", userController.calTotalPrice)

export const UserRoute = router;
