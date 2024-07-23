import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserDAO from '../daos/user.dao';
import UploadHelper from './upload.helper';
import { SALT_ROUNDS, JWT_SECRET, JWT_EXPIRES_IN } from '../config/environment';

export default class AuthHelper {
  private constructor() { }

  public static async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  public static async comparePasswords(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  public static checkPasswordStrength(password: string) {
    // Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
    //const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    //return passwordRegex.test(password);

    // Minimum 8 characters
    return password.length >= 8;
  }

  public static generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000) as unknown as string;
  }

  private static validateProfileImage(profile_image: any) {
    if (profile_image.mimetype !== 'image/jpeg' && profile_image.mimetype !== 'image/png') return false;
    if (profile_image.size > 1048576) return false;
    return true;
  }

  public static async uploadProfileImage(user_id: string, profile_image: any) {
    try {
      if (!this.validateProfileImage(profile_image)) {
        return {
          success: false,
          message: 'invalid profile image, must be jpeg or png and less than 1MB.'
        };
      }

      // Upload profile image
      const profile_image_url = await UploadHelper.uploadImage(profile_image.buffer);
      if (!profile_image_url) return {
        success: false,
        message: 'error uploading profile image.'
      };

      // Update profile image
      await UserDAO.updateProfileImage(user_id, profile_image_url);

      return {
        success: true,
        message: 'Profile image uploaded successfully.'
      };
    } catch (error) {
      console.error('Error uploading profile image:', error);
      return {
        success: false,
        message: `internal server error uploading profile image. ${error}`
      };
    }
  }

  public static generateToken(user: any) {
    return jwt.sign({ ...user, password: null }, JWT_SECRET as string, { expiresIn: JWT_EXPIRES_IN });
  }

  public static verifyToken(token: string) {
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET as string);
      if (typeof decodedToken === 'object' && decodedToken !== null) {
        const { iat, exp, ...rest } = decodedToken;
        return rest;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }

  }

  public static decodeToken(token: string): { [key: string]: any } {
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET as string) as { [key: string]: any };
      return decodedToken;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }


}