import { type Request, type Response, type NextFunction } from "express";
import AuthService from "../services/auth.service";
import HTTP_STATUS from "../constants/httpStatusCodes";

import QRHelper from "../helpers/qr.helper";

export default class AuthController {
  private constructor() { }

  public static async register(req: Request, res: Response, next: NextFunction) {
    try {

      // TEST //
      QRHelper.generateQrCodeBuffer("Grandisimo Evento", req.body.email, req.body.fullname);


      const serviceResponse = await AuthService.register(req.body, req.file);
      if (!serviceResponse.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
        return;
      }
      res.status(HTTP_STATUS.CREATED).json(serviceResponse);
    } catch (error) {
      next(error);
    }
  }

  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await AuthService.login(req.body.email, req.body.password);
      if (serviceResponse.success === false) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
        return;
      }
      res.status(HTTP_STATUS.OK).json(serviceResponse);
    } catch (error) {
      next(error);
    }
  }

  public static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await AuthService.refreshToken(req.params.token);
      if (serviceResponse.success === false) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
        return;
      }
      res.status(HTTP_STATUS.OK).json(serviceResponse);
    } catch (error) {
      next(error);
    }
  }

  public static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .setHeader('Set-Cookie', `accessToken=; Path=/; SameSite=None; HttpOnly; Expires=${new Date().setDate(new Date().getDate() - 1)}`)
        .status(HTTP_STATUS.OK).json({ success: true });
    } catch (error) {
      next(error);
    }
  }



}