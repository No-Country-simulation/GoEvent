import EventDAO from '../daos/event.dao';
import { DEFAULT_SUBSCRIPTION_TYPE } from '../config/environment';
import { EventAttributes, EventType } from '../types/event.types';
import { User } from '../models//user/user.model';
import UploadHelper from '../helpers/upload.helper';

export default class EventService {
  private constructor() {}

  // Create Event -------------------------------------------------------------
  public static async create(event: any) {
    // Check required fields
    if (!event.name) {
      return { success: false, message: 'The required name field is missing.' };
    }
    if (!event.description) {
      return { success: false, message: 'The required description field is missing.' };
    }
    if (!event.location) {
      return { success: false, message: 'The required location field is missing.' };
    }
    if (!event.time) {
      return { success: false, message: 'The required time field is missing.' };
    }
    if (!event.date) {
      return { success: false, message: 'The required date field is missing.' };
    }
    if (!event.user_id) {
      return { success: false, message: 'The required user id field is missing.' };
    }
    try {
      // Find user and check subscription type
      const user = await User.findOne({ where: { id: event.user_id } });
      if (!user) {
        return { success: false, message: 'User not found.' };
      }

      // Compare subscription type DEFAULT_SUBSCRIPTION_TYPE is free
      if (user.subscription_type_id !== DEFAULT_SUBSCRIPTION_TYPE) {
        event.type = EventType.PAID;
      }

      // Create Event
      const createdEvent = await EventDAO.create(event);
      return { success: true, message: 'Event created successfully.', event: createdEvent };
    } catch (error: any) {
      console.error('Error on Service creating event:', error);
      return {
        success: false,
        message: `Internal server error creating event. ${error.message}`,
      };
    }
  }

  // Find Event By User Id---------------------------------------------------------------
  public static async findEventByUserId(userId: string) {
    try {
      const events = await EventDAO.findEventByUserId(userId);
      if (!events) {
        return { success: false, message: 'There are no events associated with that id.' };
      }
      return { events };
    } catch (error: any) {
      console.error('Error getting event service:', error);
      return {
        success: false,
        message: `Internal server error get event. ${error.message}`,
      };
    }
  }
  // Find Event By User Id---------------------------------------------------------------
  public static async findEventByStatus(status: string, userId: string) {
    try {
      const events = await EventDAO.findByStatus(status, userId);
      if (!status) {
        throw new Error('Status are required');
      }
      if (!userId) {
        throw new Error('User Id are required');
      }
      if (!events) {
        return { success: false, message: 'There are no events associated with that id.' };
      }
      return { events };
    } catch (error: any) {
      console.error('Error getting event service:', error);
      return {
        success: false,
        message: `Internal server error get event. ${error.message}`,
      };
    }
  }

  // Update Event ---------------------------------------------------------------
  public static async update(event: Partial<EventAttributes>) {
    try {
      if (!event) {
        return { success: false, message: 'No data to update.' };
      }

      const updatedEvent = await EventDAO.update(event);
      return { success: true, message: 'Event updated successfully.', event: updatedEvent };
    } catch (error: any) {
      console.error('Error on service updating event:', error);
      return {
        success: false,
        message: `Internal server error updating event. ${error.message}`,
      };
    }
  }
  public static async updateImage(evenId: string, template_image: any) {
    try {
      if (!template_image) {
        return { success: false, message: 'No Template to update.' };
      }
      const profile_image_url = await UploadHelper.uploadImage(template_image.buffer);
      const event: Partial<EventAttributes> = {
        id: evenId,
        template_image: profile_image_url,
      };
      const updatedEvent = await EventDAO.update(event);
      return { success: true, message: 'Event updated successfully.', event: updatedEvent };
    } catch (error: any) {
      console.error('Error on service updating event:', error);
      return {
        success: false,
        message: `Internal server error updating event. ${error.message}`,
      };
    }
  }

  // Get guests by Event id -----------------------------------------------------
  public static async getGuestsByEventId(eventId: string, userId: string) {
    try {
      const guests = await EventDAO.getGuestsByEventId(eventId, userId);
      if (!guests || !guests.length) {
        return { success: false, message: 'Event not found' };
      }
      return { success: true, guests: guests };
    } catch (error: any) {
      console.error('Error on service getting guests by event ID:', error);
      return {
        success: false,
        message: `Internal server error getting guests by event ID. ${error.message}`,
      };
    }
  }

  // Delete Event ---------------------------------------------------------------
  public static async delete(eventId: string) {
    try {
      const deleteEvent = await EventDAO.delete(eventId);
      return { success: true, message: 'Event deleted successfully.' };
    } catch (error: any) {
      console.error('Error on service deleting event:', error);
      return {
        success: false,
        message: `Internal server error deleting event. ${error.message}`,
      };
    }
  }
}
