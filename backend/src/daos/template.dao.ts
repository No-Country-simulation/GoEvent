import { Template } from "../models";
import { TemplateAttributes } from "../types/template.types";
import { UniqueConstraintError } from 'sequelize';
import Print from "../utils/print";

export default class TemplateDAO {
  private constructor() { }

  public static async create(template: TemplateAttributes) {
    try {
      const createdTemplate = await Template.create(template);
      return createdTemplate.toJSON();
    } catch (error: UniqueConstraintError | any) {
      Print.error('Error registering template [DAO].');
      throw new Error(`Registration -> ${error.errors.map((e: any) => e.message).join(', ')}`);
    }
  }
  public static async getAllTemplate() {
    try {
      const foundTemplates = await Template.findAll({
        attributes: ['id', 'name', 'template_image'], // Selecciona solo los campos especificados
      });
  
      if (!foundTemplates) return null;
  
      return foundTemplates.map((event) => event.toJSON());
    } catch (error) {
      console.error('Error on DAO find Template:', error);
      throw new Error('Error fetching event for Template');
    }
  }
  public static async update(template: Partial<TemplateAttributes>, id: string) {
    try {
      const updatedTemplate = await Template.update(template, { where: { id } });
      return updatedTemplate;
    } catch (error: UniqueConstraintError | any) {
      Print.error('Error on DAO registering Template: ' + error.errors);
      throw new Error(`Update -> ${error.errors.map((e: any) => e.message).join(', ')}`);
    }
  }

  public static async updateTemplateImage(template_id: string, template_image: any) {
    try {
      await Template.update({ template_image }, { where: { id: template_id } });
      return
    } catch (error: UniqueConstraintError | any) {
      Print.error('Error on DAO update Template: ' + error.errors);
      throw new Error(`Update -> ${error.errors.map((e: any) => e.message).join(', ')}`);
    }
  }

  public static async delete(templateId: string) {
    try {
      const deletedTemplate = await Template.destroy({ where: { id: templateId } });
      return deletedTemplate;
    } catch (error: UniqueConstraintError | any) {
      Print.error('Error on DAO deleting user -> ' + error.errors);
      throw new Error(`Delete: ${error.errors.map((e: any) => e.message).join(', ')}`);
    }
  }

}