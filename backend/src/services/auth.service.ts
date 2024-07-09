import UserDAO from '../daos/user.dao';
import { IUser } from '../models/user.model';
import AuthHelper from '../helpers/auth.helper';
//import EmailHelper from '../helpers/email.helper';


export default class AuthService {
  private constructor() { }

  // REGISTER USER -------------------------------------------------------------
  public static async register(user: Partial<IUser>, profile_image?: any) {
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
      const createdUser = await UserDAO.register(user);
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
      return { success: true, message: 'User created successfully.', user: { ...createdUser, password: undefined } };

    } catch (error) {
      console.error('Error creating user:', error);
      return { success: false, message: `Internal server error creating user. Error: ${error}` };
    }
  }


  // LOGIN USER ----------------------------------------------------------------
  public static async login(email: string, password: string) {
    try {
      if (!email && !password) return { success: false, message: 'Missing required fields.' }
      const user = await UserDAO.login(email);

      if (!user || !await AuthHelper.comparePasswords(password, user.password)) return { success: false, message: 'Invalid email or password.' };

      const token = AuthHelper.generateToken(user);
      return {
        success: true,
        message: 'User logged in successfully.',
        user: { ...user, password: null },
        token
      };

    } catch (error) {
      console.error('Error logging in user:', error);
      return { success: false, message: `Internal server error logging user. Error: ${error}` };
    }
  }


}