import { Schema, model } from "mongoose";
import { TAddress, TFullName, TOrders, TUser, UserMethods, UserModel } from "./user.interface";


const fullNameSchema = new Schema<TFullName>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
})
const addressSchema = new Schema<TAddress>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country:{ type: String, required: true}
})
const orderSchema = new Schema<TOrders>({
    productName: {type: String, required: true},
    price: {type: Number, required: true},
    quantity :{type: Number, required: true}
})

const userSchema = new Schema<TUser,UserModel,UserMethods>({
    userId: { type: Number, require: true,unique: true },
    username: { type: String, require: true ,unique: true },
    password: { type: String, require: true },
    fullName: fullNameSchema,
    age: { type: Number, require: true },
    email: { type: String, require: true },
    isActive: {
       type:Boolean,
        default:false,
    },
    hobbies: [{
        type: String, required: true
    }],
    address: addressSchema,
    orders:orderSchema
    
}, {
    toJSON: {
      virtuals:true,
    }
  }
)

userSchema.methods.isUserExists = async function (userId: number) {
    const existingUser = await User.findOne({userId });
    return existingUser;
};

export const User =model<TUser,UserModel>("User",userSchema)