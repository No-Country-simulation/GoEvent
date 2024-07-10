import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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


  public static generateCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }


  private static validateProfileImage(profile_image: any) {
    if (profile_image.mimetype !== 'image/jpeg' && profile_image.mimetype !== 'image/png') return false;
    if (profile_image.size > 1048576) return false;
    return true;
  }

  public static async uploadProfileImage(user_id: string, profile_image: any) {
  }

  public static generateToken(user: any) {
    return jwt.sign({ ...user, password: null }, JWT_SECRET as string, { expiresIn: JWT_EXPIRES_IN });
  }

  public static verifyToken(user: any) {
    return jwt.verify(user, JWT_SECRET as string) as { [key: string]: any };
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