import sgMail from '@sendgrid/mail'
import { SENDGRID_API_KEY } from "../config/environment"
import EmailTemplates from '../templates/email.templates';
import ical, { ICalEventRepeatingFreq } from 'ical-generator';

sgMail.setApiKey(SENDGRID_API_KEY)

export default class EmailHelper {

  static async sendVerificationEmail(email: string, code: number) {
    try {
      const msg = {
        to: email,
        from: 'sync.ideas.group@gmail.com',
        subject: '¡Welcome to GoEvent!',
        html: EmailTemplates.verifyEmail(code)
      }
      await sgMail.send(msg)
      return {
        success: true,
        message: 'Verification email sent.'
      }
    } catch (error) {
      return {
        success: false,
        message: 'Error sending verification email.',
        error
      }
    }
  }


  static async sendResetPasswordEmail(email: string, code: number) {
    try {
      const msg = {
        to: email,
        from: 'sync.ideas.group@gmail.com',
        subject: '¡Reset your password!',
        html: EmailTemplates.resetPassword(code)
      }
      await sgMail.send(msg)
      return {
        success: true
      }
    } catch (error) {
      return {
        success: false,
        error
      }
    }
  }



  static async sendInvitation(email: string, event: string, address: string, date: string, code: number, name: string, filename: string, buffer: Buffer) {
    try {

      const calendar = ical({ name: 'GoEvent Invitation' });
      calendar.createEvent({
        start: new Date(date),
        end: new Date(new Date(date).getTime() + 60 * 60 * 1000),
        summary: event,
        description: `Event: ${event}\nAddress: ${address}\nCode: ${code}\nName: ${name}`,
        location: address,
        url: 'https://GOEVENT.com',
        organizer: { name: 'GoEvent', email: 'sync.ideas.group@gmail.com' }
      });
      const icsContent = calendar.toString();
      const icsBuffer = Buffer.from(icsContent);



      const msg = {
        to: email,
        from: 'sync.ideas.group@gmail.com',
        subject: 'Invitation to ' + event + ' on ' + date + ' at ' + address,
        text: 'Please find the attached QR code.',
        html: EmailTemplates.invitation(event, address, date, code, name),
        attachments: [
          {
            content: buffer.toString('base64'),
            filename: filename,
            type: 'image/png',
            disposition: 'attachment'
          },
          {
            content: icsBuffer.toString('base64'),
            filename: 'invitation.ics',
            type: 'text/calendar',
            disposition: 'attachment'
          }
        ]
      };
      const response = await sgMail.send(msg);
      console.log(response)
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error
      };
    }
  }

}
