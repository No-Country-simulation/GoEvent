import { type Request, type Response, type NextFunction } from "express";
import SubscriptionTypeService from "../services/subscriptiontype.service";
import HTTP_STATUS from "../constants/httpStatusCodes";

export default class SubscriptionTypeController {
  private constructor() { }

  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await SubscriptionTypeService.create(req.body);
      if (serviceResponse.success === false) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
        return;
      }
      res.status(HTTP_STATUS.OK).json(serviceResponse);
    } catch (error) {
      next(error);
    }
  }

  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await SubscriptionTypeService.getAll();
      if (serviceResponse.success === false) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
        return;
      }
      res.status(HTTP_STATUS.OK).json(serviceResponse);
    } catch (error) {
      next(error);
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await SubscriptionTypeService.update(req.body, req.params.id);
      if (serviceResponse.success === false) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
        return;
      }
      res.status(HTTP_STATUS.OK).json(serviceResponse);
    } catch (error) {
      next(error);
    }
  }

}