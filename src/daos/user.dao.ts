import { IUser } from "../models/user.model";
import UserModel from "../models/user.model";

export default class UserDAO {

  private constructor() { }

  public static async register(user: Partial<IUser>) {
    try {
      const createdUser = await UserModel.create(user);
      return createdUser.toObject();
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }

  public static async login(email: string) {
    try {
      const foundUser = await UserModel.findOne({ email });
      if (!foundUser) {
        console.error('Invalid credentials');
        throw new Error('Invalid credentials');
      }
      return foundUser.toObject();
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  }

}