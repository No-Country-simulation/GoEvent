import EventDAO from "../daos/event.dao";
import EmailHelper from "../helpers/email.helper";
import Print from "../utils/print";
import { REMINDER_DAYS } from "../config/environment";

export default class UtilsService {
  private constructor() { }

  // ERROR HANDLING -------------------------------------------------------------
  private static handleError(error: any, success: boolean, console: string) {
    Print.error(console);
    return { success, message: '' + error };
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
