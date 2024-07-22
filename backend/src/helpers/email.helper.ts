import { RESEND_API_KEY } from "../config/environment"
import EmailTemplates from '../templates/email.templates';
import { EventAttributes } from '../types/event.types';
import ical from 'ical-generator';
import * as QRCode from 'qrcode';
import { Resend } from 'resend';

const resend = new Resend(RESEND_API_KEY)

export default class EmailHelper {
  private constructor() { }

  private static async sendEmail(msg: any) {
    try {
      msg.from = 'GoEvent <delivered@resend.dev>'
      const response = await resend.emails.send(msg)
      if (response.error) return { success: false, message: response.error }
      return { success: true, message: 'Email sent.' }
    } catch (error) {
      return error
    }
  }

  private static createIcalEvent(event: Partial<EventAttributes>) {
    const icalEvent = ical({ name: event.name })
    const startTime = event.date ? new Date(event.date) : new Date()
    const endTime = new Date(startTime.getTime() + 30 * 60 * 1000)

    icalEvent.createEvent({
      start: startTime,
      end: endTime,
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

  static async sendVerificationEmail(email: string, code: number): Promise<any> {
    try {
      const msg = {
        to: email,
        subject: '¡Welcome to GoEvent!',
        html: EmailTemplates.verifyEmail(code)
      }
      return await this.sendEmail(msg)
    } catch (error) {
      return {
        success: false,
        message: 'Error sending verification email.',
        error
      }
    }
  }


  static async sendResetPasswordEmail(email: string, code: number): Promise<any> {
    try {
      const msg = {
        to: email,
        subject: '¡Reset your password!',
        html: EmailTemplates.resetPassword(code)
      }
      return await this.sendEmail(msg)
    } catch (error) {
      return {
        success: false,
        error
      }
    }
  }



  static async sendInvitation(email: string, event: string, address: string, date: Date, code: number, name: string, invitationId: string): Promise<any> {
    try {
      const icsBuffer = this.createIcalEvent({ name: event, date: new Date(date), description: event, location: address })
      const qrInfo = { event: event, code: code, name: name, invitationId: invitationId }
      const qrCodeBuffer = await this.createQRCodeBuffer(JSON.stringify(qrInfo))

      const msg = {
        to: email,
        subject: 'Invitation to ' + event + ' on ' + date + ' at ' + address,
        text: 'Please find the attached QR code.',
        html: EmailTemplates.invitation(event, address, date.toLocaleString(), code, name, invitationId),
        attachments: [
          {
            content: qrCodeBuffer.toString('base64'),
            filename: 'qr.png',
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
      return await this.sendEmail(msg)
    } catch (error) {
      return {
        success: false,
        error
      };
    }
  }

  static async sendEventReminder(email: string, event: string, address: string, date: string, code: number, name: string, invitationId: string): Promise<any> {
    try {
      const msg = {
        to: email,
        subject: 'Reminder to ' + event + ' on ' + date + ' at ' + address,
        html: EmailTemplates.invitationReminder(event, address, date, name, invitationId)
      }
      return await this.sendEmail(msg)
    } catch (error) {
      return {
        success: false,
        error
      }
    }
  }

}
