import { User, UserAttributes } from "../models/user.model";
import { UniqueConstraintError } from 'sequelize';

export default class UserDAO {
  private constructor() { }

  public static async register(user: UserAttributes) {
    try {
      const createdUser = await User.create(user);
      return createdUser.toJSON();
    } catch (error: UniqueConstraintError | any) {
      console.error('Error on DAO registering user:', error.errors);
      throw new Error(`Unique constraint error: ${error.errors.map((e: any) => e.message).join(', ')}`);
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
    } catch (error: UniqueConstraintError | any) {
      console.error('Error on DAO registering user:', error.errors);
      throw new Error(`Unique constraint error: ${error.errors.map((e: any) => e.message).join(', ')}`);
    }
  }

}