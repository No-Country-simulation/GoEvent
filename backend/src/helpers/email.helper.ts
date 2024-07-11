import sgMail from '@sendgrid/mail'
import { SENDGRID_API_KEY } from "../config/environment"
import EmailTemplates from '../templates/email.templates';
import { IEmail } from '../types/email.types';

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


}
