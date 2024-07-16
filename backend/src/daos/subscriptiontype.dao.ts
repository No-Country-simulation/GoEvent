import { SubscriptionType } from "../models";
import { SubscriptionTypeAttributes } from "../types/subscription.types";
import { UniqueConstraintError } from 'sequelize';
import Print from "../utils/print";

export default class SubscriptionTypeDAO {
  private constructor() { }

  public static async register(subscriptionType: SubscriptionTypeAttributes) {
    try {
      const createdSubscriptionType = await SubscriptionType.create(subscriptionType);
      return createdSubscriptionType.toJSON();
    } catch (error: UniqueConstraintError | any) {
      Print.error('Error registering subscription type [DAO].');
      throw new Error(`Registration -> ${error.errors.map((e: any) => e.message).join(', ')}`);
    }
  }

  public static getAll() {
    return SubscriptionType.findAll();
  }

  public static async update(subscriptionType: Partial<SubscriptionTypeAttributes>, id: string) {
    try {
      const updatedSubscriptionType = await SubscriptionType.update(subscriptionType, { where: { id } });
      return updatedSubscriptionType;
    } catch (error: UniqueConstraintError | any) {
      Print.error('Error on DAO registering subscription type: ' + error.errors);
      throw new Error(`Update -> ${error.errors.map((e: any) => e.message).join(', ')}`);
    }
  }

  public static async delete(id: string) {
    try {
      const deletedSubscriptionType = await SubscriptionType.destroy({ where: { id } });
      return deletedSubscriptionType;
    } catch (error: UniqueConstraintError | any) {
      Print.error('Error on DAO deleting subscription type -> ' + error.errors);
      throw new Error(`Delete: ${error.errors.map((e: any) => e.message).join(', ')}`);
    }
  }

}