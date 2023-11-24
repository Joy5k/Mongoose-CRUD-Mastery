import { Schema, model } from "mongoose";
import UserModel, { TAddress, TFullName, TUser } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});
const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});
const orderSchema = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser, UserModel>(
  {
    userId: { type: Number, require: true, unique: true },
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: { type: String, require: true },
    fullName: fullNameSchema,
    age: { type: Number, require: true },
    email: { type: String, require: true },
    isActive: {
      type: Boolean,
      default: false,
    },
    hobbies: [
      {
        type: String,
        required: true,
      },
    ],
    address: addressSchema,
    orders: [{ type: orderSchema, required: true }],
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

export const User = model<TUser, UserModel>("User", userSchema);