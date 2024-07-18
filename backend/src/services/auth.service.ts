import UserDAO from '../daos/user.dao';
import SubscriptionTypeDAO from '../daos/subscriptiontype.dao';
import { UserAttributes } from '../types/user.types';
import AuthHelper from '../helpers/auth.helper';
import EmailHelper from '../helpers/email.helper';
import Print from "../utils/print";
import { DEFAULT_SUBSCRIPTION_TYPE } from '../config/environment';

export default class AuthService {
  private constructor() { }

  // ERROR HANDLING -------------------------------------------------------------
  private static handleError(error: any, success: boolean, console: string) {
    Print.error(console);
    return { success, message: '' + error }
  }

  // REGISTER USER -------------------------------------------------------------
  public static async register(user: UserAttributes, profile_image?: any) {
    // Check required fields
    if (!user.fullname || !user.email || !user.password) {
      return { success: false, message: 'Missing required fields.' }
    }
    if (!AuthHelper.checkPasswordStrength(user.password)) {
      return { success: false, message: 'Password must be at least 8 characters long.' }
    }

    try {
      // Create user
      user.password = await AuthHelper.hashPassword(user.password);
      user.subscription_type_id = DEFAULT_SUBSCRIPTION_TYPE;
      const createdUser = await UserDAO.register(user);
      let message = 'User created successfully.'

      // Upload profile image
      if (profile_image && createdUser) {
        const result = await AuthHelper.uploadProfileImage(createdUser.id, profile_image);
        if (!result.success) message += ` Error uploading profile image: ${result.message}`;
      }

      //Send email verification
      const code = AuthHelper.generateCode();
      const response = await EmailHelper.sendVerificationEmail(user.email, code);
      if (!response.success) message += ` Error sending verification email.`;
      return { success: true, message: message, user: { ...createdUser, password: undefined } };

    } catch (error) {
      return this.handleError(error, false, 'Service creating user [AuthService]');
    }
  }


  // LOGIN USER ----------------------------------------------------------------
  public static async login(email: string, password: string) {
    try {
      if (!email && !password) return { success: false, message: 'Missing required fields.' }
      const user = await UserDAO.login(email);

      if (!user || !await AuthHelper.comparePasswords(password, user.password))
        return {
          success: false,
          message: 'Invalid email or password.'
        };

      const subscriptionType = await SubscriptionTypeDAO.getById(user.subscription_type_id);
      const token = AuthHelper.generateToken(user);
      return {
        success: true,
        message: 'User logged in successfully.',
        user: { ...user, password: null, subscription_type: subscriptionType?.type, subscription_max_events: subscriptionType?.max_events },
        token
      };

    } catch (error) {
      return this.handleError(error, false, 'Service logging user [AuthService]');
    }
  }


  // REFRESH TOKEN ---------------------------------------------------------------
  public static async refreshToken(token: string) {
    try {
      const user = AuthHelper.verifyToken(token);
      if (!user) return { success: false, message: 'Invalid token.' };
      const newToken = AuthHelper.generateToken(user);
      return {
        success: true,
        message: 'Token refreshed successfully.',
        token: newToken
      };
    } catch (error) {
      return this.handleError(error, false, 'Service refreshing token [AuthService]');
    }
  }


}