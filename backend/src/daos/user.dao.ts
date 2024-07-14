import { User } from "../models";
import { UserAttributes } from "../types/user.types";
import { UniqueConstraintError } from 'sequelize';

export default class UserDAO {
  private constructor() { }

  public static async register(user: UserAttributes) {
    try {
      const createdUser = await User.create(user);
      return createdUser.toJSON();
    } catch (error: UniqueConstraintError | any) {
      console.error('Error registering user [DAO]:', error.errors);
      throw new Error(`Unique constraint error: ${error.errors.map((e: any) => e.message).join(', ')}`);
    }
  }

  public static async login(email: string) {
    try {
      const foundUser = await User.findOne({ where: { email: email, is_active: true } });
      if (!foundUser) return null
      return foundUser.toJSON();
    } catch (error: UniqueConstraintError | any) {
      console.error('Error logging user [DAO]:', error.errors);
      throw new Error(`Unique constraint error: ${error.errors.map((e: any) => e.message).join(', ')}`);
    }
  }

  public static async update(user: Partial<UserAttributes>, id: string, profile_image?: any) {
    try {
      const updatedUser = await User.update(user, { where: { id } });
      return updatedUser;
    } catch (error: UniqueConstraintError | any) {
      console.error('Error on DAO registering user:', error.errors);
      throw new Error(`Unique constraint error: ${error.errors.map((e: any) => e.message).join(', ')}`);
    }
  }

  public static async updateProfileImage(user_id: string, profile_image: any) {
    try {
      await User.update({ profile_image }, { where: { id: user_id } });
      return
    } catch (error: UniqueConstraintError | any) {
      console.error('Error on DAO registering user:', error.errors);
      throw new Error(`Unique constraint error: ${error.errors.map((e: any) => e.message).join(', ')}`);
    }
  }

  public static async delete(userId: string) {
    try {
      const deletedUser = await User.update({ is_active: false }, { where: { id: userId } });
      return deletedUser;
    } catch (error: UniqueConstraintError | any) {
      console.error('Error on DAO deleting user:', error.errors);
      throw new Error(`Unique constraint error: ${error.errors.map((e: any) => e.message).join(', ')}`);
    }
  }

}