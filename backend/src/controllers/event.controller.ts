import { type Request, type Response } from 'express';
import EventService from '../services/event.service';
import { EventAttributes, EventStatus } from '../types/event.types';
import multer from 'multer';
const upload = multer({ limits: { fileSize: 50 * 1024 * 1024 } }); // Limitar el tamaño del archivo a 50MB
export default class EventController {
  private constructor() {}

  // Create Event -------------------------------------------------------------
  public static async create(req: Request, res: Response) {
    try {
      const { name, description, location, time, date, user_id } = req.body;

      const serviceResponse = await EventService.create({ name, description, location, time, date, user_id });

      if (serviceResponse.success === false) {
        res.status(400).json(serviceResponse);
        return;
      }
      res.status(201).json(serviceResponse);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  // Find Event By User Id---------------------------------------------------------------
  public static async findEventByUserId(req: Request, res: Response) {
    try {
      const user_id = req.params.id;

      if (!user_id) {
        res.status(400).json({ success: false, message: 'User ID is required' });
        return;
      }

      const serviceResponse = await EventService.findEventByUserId(user_id);
      if (serviceResponse.success === false) {
        res.status(400).json(serviceResponse);
        return;
      }
      res.status(201).json(serviceResponse);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  // Find Event By Starus---------------------------------------------------------------
  public static async findEventByStatus(req: Request, res: Response) {
    try {
      const { status, user_id } = req.body;
      const serviceResponse = await EventService.findEventByStatus(status, user_id);
      if (serviceResponse.success === false) {
        res.status(400).json(serviceResponse);
        return;
      }
      res.status(201).json(serviceResponse);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  // Update Event ---------------------------------------------------------------
  public static async update(req: Request, res: Response) {
    try {
      const serviceResponse = await EventService.update(req.body);
      if (serviceResponse.success === false) {
        res.status(400).json(serviceResponse);
        return;
      }
      res.status(200).json(serviceResponse);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  // Update EventImage ---------------------------------------------------------------
  public static async updateTemplate(req: Request, res: Response) {
    try {
      console.log(req.body);
      const  id  = req.body.id;
      const template_image = req.file

      const serviceResponse = await EventService.updateImage(id, template_image);
      if (serviceResponse.success === false) {
        res.status(400).json(serviceResponse);
        return;
      }
      res.status(200).json(serviceResponse);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  // Get guests by Event id -----------------------------------------------------
  public static async getGuestsByEventId(req: Request, res: Response) {
    try {
      const eventId = req.params.id;
      const userId = req.user as string;
      const serviceResponse = await EventService.getGuestsByEventId(eventId, userId);
      if (serviceResponse.success === false) {
        res.status(400).json(serviceResponse);
        return;
      }
      res.status(200).json(serviceResponse);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  // Delete Event ---------------------------------------------------------------
  public static async delete(req: Request, res: Response) {
    try {
      const eventId = req.params.id as string;
      const serviceResponse = await EventService.delete(eventId);
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
