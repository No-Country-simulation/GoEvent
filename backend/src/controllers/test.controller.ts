import { type Request, type Response, type NextFunction } from "express";
import TestService from "../services/test.service";
import InvitationService from "../services/invitation.service";
import HTTP_STATUS from "../constants/httpStatusCodes";

export default class TestController {
  private constructor() { }

  public static async createInvitation(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await InvitationService.create(req.body);
      if (!serviceResponse.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
        return;
      }
      if (!serviceResponse.invitation || !serviceResponse.invitation.id) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
        return
      }

      const serviceResponse2 = await TestService.sendInvitation(
        'tabarebermudez@gmail.com',
        'Gran evento de prueba',
        'Calle sin nombre',
        '2022-01-01',
        req.body.qr_code,
        "Elba Surero",
        serviceResponse.invitation.id
      );


      res.status(HTTP_STATUS.CREATED).json(serviceResponse);
    } catch (error) {
      next(error);
    }
  }

  public static async updateInvitationStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await TestService.updateInvitationStatus(req.params.invitation_id, req.params.status);
      if (!serviceResponse.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
        return;
      }
      res.status(HTTP_STATUS.OK).json(serviceResponse);
    } catch (error) {
      next(error);
    }
  }


  public static async getGuestsByEventId(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await TestService.getGuestsByEventId(req.params.event_id);
      res.status(HTTP_STATUS.OK).json(serviceResponse);
    } catch (error) {
      next(error);
    }
  }


  public static async registerAttendance(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await TestService.registerAttendance(req.params.invitation_id, req.params.qr_code)
      res.status(HTTP_STATUS.OK).json(serviceResponse);
    } catch (error) {
      next(error);
    }
  }

  public static async sendEventReminders(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await TestService.sendEventReminders();
      res.status(HTTP_STATUS.OK).json(serviceResponse);
    } catch (error) {
      next(error);
    }
  }


}