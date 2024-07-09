import { type Request, type Response } from "express";
import UserService from "../services/user.service";

export default class UserController {
  private constructor() { }

  public static async update(req: Request, res: Response) {
    try {
      const serviceResponse = await UserService.update(req.body, req.file);
      if (serviceResponse.success === false) {
        res.status(400).json(serviceResponse);
        return;
      }
      res.status(200).json(serviceResponse);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  public static async delete(req: Request, res: Response) {
    try {
      const serviceResponse = await UserService.delete(req.body);
      if (serviceResponse.success === false) {
        res.status(400).json(serviceResponse);
        return;
      }
      res.status(200).json(serviceResponse);
    } catch (error) {
      res.status(500).json({ error });
    }
  }



}