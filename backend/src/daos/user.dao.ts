import { User, UserAttributes } from "../models/user.model";

export default class UserDAO {
  private constructor() { }

  public static async register(user: UserAttributes) {
    try {
      const createdUser = await User.create(user);
      return createdUser.toJSON();
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }

  public static async login(email: string) {
    try {
      const foundUser = await User.findOne({ where: { email } });
      if (!foundUser) {
        console.error('Invalid credentials');
        throw new Error('Invalid credentials');
      }
      return foundUser.toJSON();
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  }

}