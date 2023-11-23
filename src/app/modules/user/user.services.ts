
import { User } from "./user.model";
import { TUser } from "./user.interface";

const createUserInDB = async (userInfo: TUser) => { 
    if (await User.isUserExists(userInfo.userId)) {
        throw new Error("User ALready Exists")
    }
    const result = await User.create(userInfo)
    return result
}
const getAllUsersFromDB= async () => {
    const result = await User.find()
    return result
}

const getSingleUserFromDB = async (userId: number) => { 
    const result = await User.findOne({ userId })
    if (result === null) {
        throw new Error("User not found")
    }
    return result
}

const updateSingleUserFromDB = async (updatedDoc: any, userId: number) => {
 
        const filter={userId}
    const options = { upsert: true };
   
    const updateDoc = {
        $set: updatedDoc
      };
    const result = await User.updateOne(filter, updateDoc, options);
    if (result.matchedCount !== 1) {
        throw new Error("User not found")
    }
    return result
}
const deleteSingleUserFromDB = async (userId: number)=>{
    const query={userId}
    const result = await User.deleteOne(query)
    if (result.deletedCount !== 1 && result.acknowledged !== false) {
        throw new Error("User not found")
    }
    return result
}

const addProductToDB = async (id:number,productData:Record<string,never>) => {
    const filter = { userId: id }
    const options = { upsert: true };
    const updateDoc = {
        $push: productData
    };
    const result = await User.updateOne(filter, updateDoc, options)
    return result;
}
export const UserService = {
    createUserInDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateSingleUserFromDB,
    deleteSingleUserFromDB,
    addProductToDB
}