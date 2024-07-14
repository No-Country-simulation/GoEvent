import UserDAO from '../daos/user.dao';
import { UserAttributes } from '../models/user/user.model';
import AuthHelper from '../helpers/auth.helper';
import EmailHelper from '../helpers/email.helper';


export default class AuthService {
  private constructor() { }

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
      user.subscription_type_id = 2; // Default subscription type free
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
      return { success: true, message: 'User created successfully.', user: { ...createdUser, password: undefined } };

    } catch (error) {
      console.error('Error os Service creating user:', error);
      return {
        success: false,
        message: `Internal server error creating user. ${error}`
      };
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

      const token = AuthHelper.generateToken(user);
      return {
        success: true,
        message: 'User logged in successfully.',
        user: { ...user, password: null },
        token
      };

    } catch (error) {
      console.log('Error logging in user [AuthService]:', error);
      return {
        success: false,
        message: `Internal server error logging user. ${error}`
      };
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
      console.error('Error refreshing token:', error);
      return {
        success: false,
        message: `Internal server error refreshing token. ${error}`
      };
    }
  }


}