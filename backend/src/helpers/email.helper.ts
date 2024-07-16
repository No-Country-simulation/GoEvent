import sgMail from '@sendgrid/mail'
import { SENDGRID_API_KEY } from "../config/environment"
import EmailTemplates from '../templates/email.templates';
import { EventAttributes } from '../types/event.types';
import ical from 'ical-generator';
import * as QRCode from 'qrcode';

sgMail.setApiKey(SENDGRID_API_KEY)

export default class EmailHelper {
  private constructor() { }

  private static createIcalEvent(event: Partial<EventAttributes>) {
    const icalEvent = ical({ name: event.name })
    icalEvent.createEvent({
      start: event.date ? new Date(event.date) : new Date(),
      end: event.date,
      summary: event.name,
      description: event.description,
      location: event.location
    })
    const icsContent = icalEvent.toString()
    return Buffer.from(icsContent)
  }

  private static async createQRCodeBuffer(text: string) {
    const buffer = await QRCode.toBuffer(text, { type: 'png' })
    return buffer
  }

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
      const icsBuffer = this.createIcalEvent({ name: event, date: new Date(date), description: event, location: address })
      const qrCodeBuffer = await this.createQRCodeBuffer(code.toString())

      const msg = {
        to: email,
        from: 'sync.ideas.group@gmail.com',
        subject: 'Invitation to ' + event + ' on ' + date + ' at ' + address,
        text: 'Please find the attached QR code.',
        html: EmailTemplates.invitation(event, address, date, code, name),
        attachments: [
          {
            content: qrCodeBuffer.toString('base64'),
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
      await sgMail.send(msg);
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
