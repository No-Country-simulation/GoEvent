import { type Request, type Response, type NextFunction } from "express";
import UtilsService from "../services/utils.service";
import HTTP_STATUS from "../constants/httpStatusCodes";

export default class UtilsController {
  private constructor() { }

  public static async sendEventReminders(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await UtilsService.sendEventReminders();
      res.status(HTTP_STATUS.OK).json(serviceResponse);
    } catch (error) {
      next(error);
    }
  }


}