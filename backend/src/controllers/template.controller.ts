import { type Request, type Response } from 'express';
import TemplateService from '../services/template.service';
import { TemplateAttributes } from '../types/template.types';

export default class TemplateController {
  private constructor() { }

  // Create template -------------------------------------------------------------
  public static async create(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const  template_image  = req.file;

      const serviceResponse = await TemplateService.create({ name, template_image});

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
  public static async findAllTemplates(req: Request, res: Response) {
    try {
      const serviceResponse = await TemplateService.findAllTemplate();
      if (serviceResponse.success === false) {
        res.status(400).json(serviceResponse);
        return;
      }
      res.status(201).json(serviceResponse);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  // Update Template ---------------------------------------------------------------
  public static async update(req: Request, res: Response) {
    try {
      const {id, name } = req.body;

      const serviceResponse = await TemplateService.update(id, name);
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
      const templateId = req.params.id as string;
      const serviceResponse = await TemplateService.delete(templateId);
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
