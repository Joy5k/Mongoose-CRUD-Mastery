import bcrypt from "bcrypt";
import { User } from "./user.model";
import {TUser } from "./user.interface";
import config from '../../config';

const createUserInDB = async (userInfo: TUser) => {
  if (await User.isUserExists(userInfo.userId)) {
    throw new Error("User ALready Exists");
  }
  const result = await User.create(userInfo)
  return result;
};
const getAllUsersFromDB = async () => {
  const result = await User.find().select(
    "username fullName age email address -_id",
  );
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await User.findOne({ userId }).select("-orders -password -_id");
  if (result === null) {
    throw new Error("User not found");
  }
  return result;
};

const updateSingleUserFromDB = async (updatedDoc: any, userId: number) => {
  const filter = { userId };
  const options = { upsert: true };
  if (updatedDoc.password) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      updatedDoc.password = await bcrypt.hash(
        updatedDoc.password,
        Number(config.bcrypt_salt_rounds),
      )
  }
  const updateDoc = {
    $set: updatedDoc,
  };
  const result = await User.updateOne(filter, updateDoc, options);
  if (result.matchedCount !== 1) {
    throw new Error("User not found");
  }
  const updatedUser = await User.find(filter).select("-orders -_id");

  return updatedUser;
};

const deleteSingleUserFromDB = async (userId: number) => {
  const query = { userId };
  const result = await User.deleteOne(query);
  if (result.deletedCount !== 1 && result.acknowledged !== false) {
    throw new Error("User not found");
  }
  return result;
};

const addProductToDB = async (
  id: number,
  productData:{
    productName: string;
    price: number;
    quantity: number;
},
) => {
  const filter = { userId: id };
  const options = { upsert: true };
  const updateDoc = {
    $push: { orders: productData },
  };

  const result = await User.updateOne(filter, updateDoc, options);
  if (result.matchedCount !== 1) {
    throw new Error("User not found");
  }
  return result;
};
const getAllOrderOfSingleUserFromDB = async (id: number) => {
  const userId = { userId: id };
  const result = await User.findOne(userId).select("orders");
  if (result == null) { 
    throw new Error("User not found")
  }
  return result;
};

const calTotalPriceFromUserOrders = async (userId: number) => {
  const result = await User.findOne({ userId }).select("orders");
  if (result !== undefined && result !== null) {
    let totalPrice = 0;
    for (const order of result.orders ?? []) {
      totalPrice += order.price * order.quantity;
    }
    return totalPrice;
  } else {
    throw new Error("User not found");
  }
};

export const UserService = {
  createUserInDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteSingleUserFromDB,
  addProductToDB,
  getAllOrderOfSingleUserFromDB,
  calTotalPriceFromUserOrders,
};