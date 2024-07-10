import UserDAO from '../daos/user.dao';
import { UserAttributes } from '../models/user.model';
import AuthHelper from '../helpers/auth.helper';
//import EmailHelper from '../helpers/email.helper';


export default class UserService {
  private constructor() { }


  // UPDATE USER ---------------------------------------------------------------
  public static async update(user: Partial<UserAttributes>, profile_image?: any) {
    return { success: true, message: 'User updated successfully.' };
  }


  // DELETE USER ---------------------------------------------------------------
  public static async delete(user: Partial<UserAttributes>) {
    return { success: true, message: 'User deleted successfully.' };
  }


}