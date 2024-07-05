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
const base_model_1 = __importDefault(require("./base.model"));
class AuthModel extends base_model_1.default {
    constructor() {
        super('users');
    }
    static getInstance() {
        if (!AuthModel.instance) {
            AuthModel.instance = new AuthModel();
        }
        return AuthModel.instance;
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield this.ensureConnection();
            try {
                const result = yield ((_a = this.collection) === null || _a === void 0 ? void 0 : _a.insertOne(user));
                console.log('User registered with _id:', result === null || result === void 0 ? void 0 : result.insertedId);
                return result;
            }
            catch (error) {
                console.error('Error registering user:', error);
                throw error;
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield this.ensureConnection();
            try {
                const foundUser = yield ((_a = this.collection) === null || _a === void 0 ? void 0 : _a.findOne({ email, password }));
                if (foundUser) {
                    console.log('User logged in:', foundUser);
                    return foundUser;
                }
                else {
                    console.error('Invalid credentials');
                    throw new Error('Invalid credentials');
                }
            }
            catch (error) {
                console.error('Error logging in user:', error);
                throw error;
            }
        });
    }
}
exports.default = AuthModel.getInstance();
