import { type Request, type Response } from 'express';
import EventService from '../services/event.service';

export default class EventController {
  private constructor() {}

  // Create Event -------------------------------------------------------------
  public static async create(req: Request, res: Response) {
    try {
      const serviceResponse = await EventService.create(req.body);
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
    const serviceResponse = await EventService.findEventByUserId(req.body);
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
      const eventId = req.query.eventId as string;
      const serviceResponse = await EventService.update(req.body, eventId);
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
      const eventId = req.query.eventId as string;
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
