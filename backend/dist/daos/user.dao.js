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
const user_model_1 = __importDefault(require("../models/user.model"));
class UserDAO {
    constructor() { }
    static register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdUser = yield user_model_1.default.create(user);
                return createdUser.toObject();
            }
            catch (error) {
                console.error('Error registering user:', error);
                throw error;
            }
        });
    }
    static login(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundUser = yield user_model_1.default.findOne({ email });
                if (!foundUser) {
                    console.error('Invalid credentials');
                    throw new Error('Invalid credentials');
                }
                return foundUser.toObject();
            }
            catch (error) {
                console.error('Error logging in user:', error);
                throw error;
            }
        });
    }
}
exports.default = UserDAO;
