import UserDAO from '../daos/user.dao';
import { UserAttributes } from '../models/user.model';
import AuthHelper from '../helpers/auth.helper';
//import EmailHelper from '../helpers/email.helper';


export default class UserService {
  private constructor() { }


  // UPDATE USER ---------------------------------------------------------------
  public static async update(user: Partial<UserAttributes>, userId: string, profile_image?: any) {
    try {
      const updatedUser = await UserDAO.update(user, userId, profile_image);
      return { success: true, message: 'User updated successfully.', user: updatedUser };
    } catch (error: any) {
      console.error('Error on service updating user:', error.errors);
      throw new Error(`Unique constraint error: ${error.errors.map((e: any) => e.message).join(', ')}`);
    }
  }


  // DELETE USER ---------------------------------------------------------------
  public static async delete(userId: string) {
    try {
      const deleteUser = await UserDAO.delete(userId)
      return { success: true, message: 'User deleted successfully.' };
    } catch (error: any) {
      console.error('Error on service deleting user:', error.errors);
      throw new Error(`Unique constraint error: ${error.errors.map((e: any) => e.message).join(', ')}`);
    }
  }


}