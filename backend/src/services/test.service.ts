import InvitationDAO from "../daos/invitation.dao";
import EventDAO from "../daos/event.dao";
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

  // CRON JOBS -------------------------------------------------------------------
  // Check events and send reminders
  public static async sendEventReminders() {
    try {
      const nowDate = new Date();
      const events = await EventDAO.findAll();

      for (let event of events) {
        const eventDate = new Date(event.date);
        const diff = eventDate.getTime() - nowDate.getTime();
        const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        if (diffDays === 3) {
          // SEND REMINDER
        }
        console.log(diffDays, eventDate, nowDate)
        const invitations = await InvitationDAO.findInvitationByEventId(event.id);
        console.log(invitations)
      }
    } catch (error) {
      return this.handleError(error, false, 'Service sending event reminders [TestService]');
    }
  }


}