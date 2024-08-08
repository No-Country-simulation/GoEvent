import { type Request, type Response, type NextFunction } from "express";
import UserService from "../services/user.service";
import HTTP_STATUS from "../constants/httpStatusCodes";

export default class UserController {
  private constructor() { }

  public static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user as string;
      const serviceResponse = await UserService.update(req.body, userId, req.file);
      if (serviceResponse.success === false) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
        return;
      }
      res.status(HTTP_STATUS.OK).json(serviceResponse);
    } catch (error) {
      next(error);
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await UserService.delete(req.user as string);
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