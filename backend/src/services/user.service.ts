import UserDAO from '../daos/user.dao';
import { UserAttributes } from '../types/user.types';
import AuthHelper from '../helpers/auth.helper';
import Print from "../utils/print";
//import EmailHelper from '../helpers/email.helper';


export default class UserService {
  private constructor() { }

  // ERROR HANDLING -------------------------------------------------------------
  private static handleError(error: any, success: boolean, console: string) {
    Print.error(console);
    return { success, message: '' + error }
  }


  // UPDATE USER ---------------------------------------------------------------
  public static async update(user: Partial<UserAttributes>, userId: string, profile_image?: any) {
    try {
      if (!user && !profile_image) return { success: false, message: 'No data to update.' }
      if (profile_image) {
        const result = await AuthHelper.uploadProfileImage(userId, profile_image);
        if (!result.success) return { success: false, message: result.message };
      }
      if (user) {
        const updatedUser = await UserDAO.update(user, userId, profile_image);
        return { success: true, message: 'User updated successfully.' };
      }
      return { success: false, message: 'No data to update.' }
    } catch (error: any) {
      return this.handleError(error, false, 'Service updating user [UserService]');
    }
  }


  // DELETE USER ---------------------------------------------------------------
  public static async delete(userId: string) {
    try {
      const deleteUser = await UserDAO.delete(userId)
      return { success: true, message: 'User deleted successfully.' };
    } catch (error: any) {
      return this.handleError(error, false, 'Service deleting user [UserService]');
    }
  }


}