import { Guest } from "../models";
import InvitationDAO from "../daos/invitation.dao";
import EventDAO from "../daos/event.dao";
import { InvitationStatus } from "../types/invitation.types";
import EmailHelper from "../helpers/email.helper";
import Print from "../utils/print";
import { IEventGuest } from "../types/eventguest.types";
import { REMINDER_DAYS } from "../config/environment";

export default class TestService {
  private constructor() { }

  // ERROR HANDLING -------------------------------------------------------------
  private static handleError(error: any, success: boolean, console: string) {
    Print.error(console);
    return { success, message: '' + error };
  }

  // UPDATE INVITATION STATUS ----------------------------------------------------
  public static async updateInvitationStatus(id: string, status: string) {
    try {
      const invitation = { status: status as InvitationStatus };
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

  // REGISTER ATTENDANCE --------------------------------------------------------
  public static async registerAttendance(invitationId: string, qr_code: string) {
    try {
      const invitation = await InvitationDAO.registerAttendance(invitationId, Number(qr_code));
      if (!invitation[1][0]) return { success: false, message: 'Invitation not found' };
      const guest = await Guest.findByPk(invitation[1][0].guest_id);
      if (!guest) return { success: false, message: 'Guest not found' };
      return { success: true, invitation: invitation[1][0], guest: guest.toJSON() };
    } catch (error) {
      return this.handleError(error, false, 'Service registering attendance [TestService]');
    }
  }

  // GET GUESTS BY EVENT ID -----------------------------------------------------
  public static async getGuestsByEventId(event_id: string) {
    try {
      const guests = await EventDAO.getGuestsByEventId(event_id, 'hgkhgkjgkj');
      if (!guests || !guests.length) return { success: false, message: 'Event not found' };
      return { success: true, guests: guests };
    } catch (error) {
      return this.handleError(error, false, 'Service getting guests by event ID [TestService]');
    }
  }


  // CRON JOBS -------------------------------------------------------------------
  // Check events and send reminders
  public static async sendEventReminders() {
    try {
      const nowDate = new Date();
      const events: any = await EventDAO.findAllByStatus('scheduled');

      for (let event of events) {
        const eventDate = new Date(event.date);
        const diff = eventDate.getTime() - nowDate.getTime();
        const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        if (diffDays === REMINDER_DAYS) {
          const eventGuest: any = await EventDAO.getGuestsByEventId(event.id, 'jfgfhg');
          for (let guest of eventGuest) {
            await EmailHelper.sendEventReminder(guest.guest_email, event.name, event.address, event.date, 123456, guest.guest_fullname, guest.invitation_id);
          }
        }
      }

    } catch (error) {
      return this.handleError(error, false, 'Service sending event reminders [TestService]');
    }
  }
}
