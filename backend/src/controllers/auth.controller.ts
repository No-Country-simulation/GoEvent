import { type Request, type Response } from "express";
import AuthService from "../services/auth.service";

export default class AuthController {
  private constructor() { }

  public static async register(req: Request, res: Response) {
    try {
      const serviceResponse = await AuthService.register(req.body, req.file);
      if (serviceResponse.success === false) {
        res.status(400).json(serviceResponse);
        return;
      }
      res.status(201).json(serviceResponse);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  public static async login(req: Request, res: Response) {
    try {
      const serviceResponse = await AuthService.login(req.body.email, req.body.password);
      if (serviceResponse.success === false) {
        res.status(400).json(serviceResponse);
        return;
      }
      res
        .setHeader('Set-Cookie', `accessToken=${serviceResponse.token}; Path=/; SameSite=None; HttpOnly; Expires=${new Date().setDate(new Date().getDate() + 1)}`)
        .status(200).json(serviceResponse);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  public static async refreshToken(req: Request, res: Response) {
    try {
      const serviceResponse = await AuthService.refreshToken(req.body.refreshToken);
      if (serviceResponse.success === false) {
        res.status(400).json(serviceResponse);
        return;
      }
      res
        .setHeader('Set-Cookie', `accessToken=${serviceResponse.token}; Path=/; SameSite=None; HttpOnly; Expires=${new Date().setDate(new Date().getDate() + 1)}`)
        .status(200).json(serviceResponse);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  public static async logout(req: Request, res: Response) {
    try {
      res
        .setHeader('Set-Cookie', `accessToken=; Path=/; SameSite=None; HttpOnly; Expires=${new Date().setDate(new Date().getDate() - 1)}`)
        .status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error });
    }
  }



}