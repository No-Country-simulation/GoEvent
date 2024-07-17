import InvitationDAO from "../daos/invitation.dao";
import { InvitationStatus } from "../types/invitation.types";
import EmailHelper from "../helpers/email.helper";
import Print from "../utils/print";

export default class TestService {
  private constructor() { }

  // ERROR HANDLING -------------------------------------------------------------
  private static handleError(error: any, success: boolean, console: string) {
    Print.error(console);
    return { success, message: '' + error }
  }

  // UPDATE INVITATION STATUS ----------------------------------------------------
  public static async updateInvitationStatus(id: string, status: string) {
    try {
      const invitation = { status: status as InvitationStatus }
      await InvitationDAO.update(invitation, id);
      return { success: true, invitation };
    } catch (error) {
      return this.handleError(error, false, 'Service updating invitation status [TestService]');
    }
  }

  // SEND INVITATION ------------------------------------------------------------
  public static async sendInvitation(email: string, event: string, address: string, date: string, code: number, name: string, invitationId: string) {
    try {
      const invitation = await EmailHelper.sendInvitation(email, event, address, date, code, name, invitationId);
      return { success: true, invitation };
    } catch (error) {
      return this.handleError(error, false, 'Service sending invitation [TestService]');
    }
  }


}