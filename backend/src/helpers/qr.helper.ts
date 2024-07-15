import * as QRCode from 'qrcode';
import EmailHelper from './email.helper';

export default class QRHelper {
  private constructor() { }


  public static async generateQrCodeBuffer(text: string, email: string, fullname: string): Promise<Buffer> {
    const buffer = await QRCode.toBuffer(text, { type: 'png' });
    await EmailHelper.sendInvitation(email, text, 'Calle Falsa 123', '2022-12-12', 123456, fullname, 'qrcode.png', buffer)
    return buffer
  }

}