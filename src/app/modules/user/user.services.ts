import { User } from "./user.model";
import { TUser } from "./user.interface";

const createUserInDB = async (userInfo: TUser) => {
  if (await User.isUserExists(userInfo.userId)) {
    throw new Error("User ALready Exists");
  }
  const result = await User.create(userInfo);
  return result;
};
const getAllUsersFromDB = async () => {
  const result = await User.find().select(
    "username fullName age email address ",
  );
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await User.findOne({ userId }).select("-orders -password");
  if (result === null) {
    throw new Error("User not found");
  }
  return result;
};

const updateSingleUserFromDB = async (updatedDoc: any, userId: number) => {
  const filter = { userId };
  const options = { upsert: true };

  const updateDoc = {
    $set: updatedDoc,
  };
  const result = await User.updateOne(filter, updateDoc, options);
  if (result.matchedCount !== 1) {
    throw new Error("User not found");
  }
  const updatedUser = await User.find(filter).select("-orders");

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
  productData: Record<string, never>,
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
  console.log(result, "check result", userId);
  // if (result!==null&& result.matchedCount !== 1) {
  //     throw new Error("User not found")
  // }
  return result;
};

const calTotalPriceFromUserOrders = async (userId: number) => {
  const result = await User.findOne({ userId }).select("orders");
  if (result !== undefined && result !== null) {
    console.log(result);
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
