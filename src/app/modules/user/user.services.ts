
import { User } from "./user.model";
import { TUser } from "./user.interface";

const createUserInDB = async (userInfo: TUser) => { 
    const user = new User(userInfo);
    if (await user.isUserExists(userInfo.userId)) {
        throw new Error("User already exists")
    }
    const result = await user.save();
    return result;
}
export const UserService = {
    createUserInDB,
}