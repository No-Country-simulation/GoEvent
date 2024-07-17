import SubscriptionTypeDAO from '../daos/subscriptiontype.dao';
import { SubscriptionTypeAttributes } from '../types/subscription.types';
import Print from "../utils/print";


export default class SubscriptionTypeService {
  private constructor() { }

  // ERROR HANDLING -------------------------------------------------------------
  private static handleError(error: any, success: boolean, console: string) {
    Print.error(console);
    return { success, message: '' + error }
  }


  // CREATE SUBSCRIPTION TYPE---------------------------------------------------
  public static async create(subscriptionType: SubscriptionTypeAttributes) {
    try {
      const createdSubscriptionType = await SubscriptionTypeDAO.register(subscriptionType);
      return { success: true, message: 'Subscription type created successfully.', subscriptionType: createdSubscriptionType }
    } catch (error: any) {
      return this.handleError(error, false, 'Service creating subscription type [SubscriptionTypeService]');
    }
  }

  // GET ALL SUBSCRIPTION TYPES ------------------------------------------------
  public static async getAll() {
    try {
      const subscriptionTypes = await SubscriptionTypeDAO.getAll();
      return { success: true, message: 'Subscription types retrieved successfully.', subscriptionTypes }
    } catch (error: any) {
      return this.handleError(error, false, 'Service getting subscription types [SubscriptionTypeService]');
    }
  }

  // UPDATE SUBSCRIPTION TYPE --------------------------------------------------
  public static async update(subscriptionType: Partial<SubscriptionTypeAttributes>, id: string) {
    try {
      const updatedSubscriptionType = await SubscriptionTypeDAO.update(subscriptionType, id);
      return { success: true, message: 'Subscription type updated successfully.', subscriptionType: updatedSubscriptionType }
    } catch (error: any) {
      return this.handleError(error, false, 'Service updating subscription type [SubscriptionTypeService]');
    }
  }

  // DELETE SUBSCRIPTION TYPE --------------------------------------------------
  public static async delete(id: string) {
    try {
      const deletedSubscriptionType = await SubscriptionTypeDAO.delete(id);
      return deletedSubscriptionType;
    } catch (error: any) {
      return this.handleError(error, false, 'Service deleting subscription type [SubscriptionTypeService]');
    }
  }


}