
import { User } from "./user.model";
import { TUser } from "./user.interface";

const createUserInDB = async (userInfo: TUser) => { 
    if (await User.isUserExists(userInfo.userId)) {
        throw new Error("User ALready Exists")
    }
    const result = await User.create(userInfo)
    return result
}
const getAllUsersFromDB = async () => {
    const result = await User.find()
    return result
}
export const UserService = {
    createUserInDB,
    getAllUsersFromDB
}