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
const user_dao_1 = __importDefault(require("../daos/user.dao"));
const auth_helper_1 = __importDefault(require("../helpers/auth.helper"));
//import EmailHelper from '../helpers/email.helper';
class AuthService {
    // REGISTER USER -------------------------------------------------------------
    static register(user, profile_image) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check required fields
            if (!user.name || !user.surname || !user.username || !user.email || !user.password) {
                return { success: false, message: 'Missing required fields.' };
            }
            if (!auth_helper_1.default.checkPasswordStrength(user.password)) {
                return { success: false, message: 'Password must be at least 8 characters long.' };
            }
            try {
                // Create user
                user.password = yield auth_helper_1.default.hashPassword(user.password);
                const createdUser = yield user_dao_1.default.register(user);
                /*
                  // Upload profile image
                  if (profile_image && createdUser) {
                    const result = await AuthHelper.uploadProfileImage(createdUser.id, profile_image);
                    if (!result.success) console.error('Error uploading profile image:', result.message);
                  }
                  // Send email verification
                  const code = AuthHelper.generateCode();
                  const response = await EmailHelper.sendVerificationEmail(user.email, code);
                  if (!response.success) console.error('Error sending verification email:', response.message);
                */
                return { success: true, message: 'User created successfully.', user: Object.assign(Object.assign({}, createdUser), { password: undefined }) };
            }
            catch (error) {
                console.error('Error creating user:', error);
                return { success: false, message: `Internal server error creating user. Error: ${error}` };
            }
        });
    }
    // LOGIN USER ----------------------------------------------------------------
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!email && !password)
                    return { success: false, message: 'Missing required fields.' };
                const user = yield user_dao_1.default.login(email);
                if (!user || !(yield auth_helper_1.default.comparePasswords(password, user.password)))
                    return { success: false, message: 'Invalid email or password.' };
                const token = auth_helper_1.default.generateToken(user);
                return {
                    success: true,
                    message: 'User logged in successfully.',
                    user: Object.assign(Object.assign({}, user), { password: null }),
                    token
                };
            }
            catch (error) {
                console.error('Error logging in user:', error);
                return { success: false, message: `Internal server error logging user. Error: ${error}` };
            }
        });
    }
}
exports.default = AuthService;
