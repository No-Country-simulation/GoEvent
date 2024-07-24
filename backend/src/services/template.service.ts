import TemplateDAO from '../daos/template.dao';
import { TemplateAttributes } from '../types/template.types';
import { Template } from '../models/index';
import UploadHelper from '../helpers/upload.helper';

export default class TemplateService {
  private constructor() {}

  // Create Event -------------------------------------------------------------
  public static async create(template: any) {
    // Check required fields
    if (!template.name) {
      return { success: false, message: 'The required name field is missing.' };
    }
    if (!template.template_image) {
      return { success: false, message: 'The required template_image field is missing.' };
    }
    try {
      // Create template
      // Upload profile image
      const template_image_url = await UploadHelper.uploadImage(template.template_image.buffer);
      if (!template_image_url)
        return {
          success: false,
          message: 'error uploading profile image.',
        };
      template.template_image = template_image_url;

      const createdEvent = await TemplateDAO.create(template);
      return { success: true, message: 'Template created successfully.', event: createdEvent };
    } catch (error: any) {
      console.error('Error on Service creating template:', error);
      return {
        success: false,
        message: `Internal server error creating event. ${error.message}`,
      };
    }
  }

  // Get Template---------------------------------------------------------------
  public static async findAllTemplate() {
    try {
      const templates = await TemplateDAO.getAllTemplate();
      if (!templates) {
        return { success: false, message: 'There are not Templates.' };
      }
      return { templates };
    } catch (error: any) {
      console.error('Error getting template service:', error);
      return {
        success: false,
        message: `Internal server error get templates. ${error.message}`,
      };
    }
  }
  // Update template ---------------------------------------------------------------
  public static async update(template: Partial<TemplateAttributes>, id: string) {
    try {
      if (!template) {
        return { success: false, message: 'No data to update.' };
      }
      const updatedTemplate = await TemplateDAO.update(template, id);
      return { success: true, message: 'Template updated successfully.', template: updatedTemplate };
    } catch (error: any) {
      console.error('Error on service updating Template:', error);
      return {
        success: false,
        message: `Internal server error updating Template. ${error.message}`,
      };
    }
  }
  // Delete Event ---------------------------------------------------------------
  public static async delete(templateId: string) {
    try {
      const deleteTemplate = await TemplateDAO.delete(templateId);
      return { success: true, message: 'Template deleted successfully.' };
    } catch (error: any) {
      console.error('Error on service deleting Template:', error);
      return {
        success: false,
        message: `Internal server error deleting Template. ${error.message}`,
      };
    }
  }
}
