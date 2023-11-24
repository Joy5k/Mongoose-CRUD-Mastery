"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("./user.model");
const config_1 = __importDefault(require("../../config"));
const createUserInDB = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userInfo.userId)) {
        throw new Error("User ALready Exists");
    }
    const result = yield user_model_1.User.create(userInfo);
    return result;
});
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find().select("username fullName age email address ");
    return result;
});
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ userId }).select("-orders -password");
    if (result === null) {
        throw new Error("User not found");
    }
    return result;
});
const updateSingleUserFromDB = (updatedDoc, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { userId };
    const options = { upsert: true };
    if (updatedDoc.password) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        updatedDoc.password = yield bcrypt_1.default.hash(updatedDoc.password, Number(config_1.default.bcrypt_salt_rounds));
    }
    const updateDoc = {
        $set: updatedDoc,
    };
    const result = yield user_model_1.User.updateOne(filter, updateDoc, options);
    if (result.matchedCount !== 1) {
        throw new Error("User not found");
    }
    const updatedUser = yield user_model_1.User.find(filter).select("-orders");
    return updatedUser;
});
const deleteSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { userId };
    const result = yield user_model_1.User.deleteOne(query);
    if (result.deletedCount !== 1 && result.acknowledged !== false) {
        throw new Error("User not found");
    }
    return result;
});
const addProductToDB = (id, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { userId: id };
    const options = { upsert: true };
    const updateDoc = {
        $push: { orders: productData },
    };
    const result = yield user_model_1.User.updateOne(filter, updateDoc, options);
    if (result.matchedCount !== 1) {
        throw new Error("User not found");
    }
    return result;
});
const getAllOrderOfSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = { userId: id };
    const result = yield user_model_1.User.findOne(userId).select("orders");
    return result;
});
const calTotalPriceFromUserOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield user_model_1.User.findOne({ userId }).select("orders");
    if (result !== undefined && result !== null) {
        let totalPrice = 0;
        for (const order of (_a = result.orders) !== null && _a !== void 0 ? _a : []) {
            totalPrice += order.price * order.quantity;
        }
        return totalPrice;
    }
    else {
        throw new Error("User not found");
    }
});
exports.UserService = {
    createUserInDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateSingleUserFromDB,
    deleteSingleUserFromDB,
    addProductToDB,
    getAllOrderOfSingleUserFromDB,
    calTotalPriceFromUserOrders,
};
