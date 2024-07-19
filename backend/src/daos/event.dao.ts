import { Event } from '../models/event/index';
import { EventAttributes, EventStatus } from '../types/event.types';
import { UniqueConstraintError } from 'sequelize';
import { Invitation } from '../models/invitation/invitation.model';
import { sequelize } from '../config/sequelize.config';

export default class EventDAO {
  private constructor() { }

  public static async create(event: EventAttributes) {
    try {
      const createdEvent = await Event.create(event);
      return createdEvent.toJSON();
    } catch (error: UniqueConstraintError | any) {
      console.error('Error on DAO create event:', error.errors);
      throw new Error(`Unique constraint error: ${error.errors.map((e: any) => e.message).join(', ')}`);
    }
  }
  public static async findEventByUserId(userId: string) {
    try {
      const events = await Event.findAll({ where: { user_id: userId } });
      return events.map((event) => event.toJSON());
    } catch (error) {
      console.error('Error on DAO find events by user ID:', error);
      throw new Error('Error fetching events for the given user ID');
    }
  }

  public static async findEventByUserIdAndEventId(userId: string, eventId: string) {
    try {
      const event = await Event.findOne({ where: { user_id: userId, id: eventId } });
      return event?.toJSON();
    } catch (error) {
      console.error('Error on DAO find event by user ID and event ID:', error);
      throw new Error('Error fetching event for the given user ID and event ID');
    }
  }

  public static async findByStatus(status: string, user_id: string) {
    try {
      const events = await Event.findAll({ where: { user_id, status } });
      return events.map((event) => event.toJSON());
    } catch (error) {
      console.error('Error on DAO find events:', error);
      throw new Error('Error fetching events');
    }
  }

  public static async findAllByStatus(status: string) {
    try {
      const events = await Event.findAll({ where: { status } });
      return events.map((event) => event.toJSON());
    } catch (error) {
      console.error('Error on DAO find events:', error);
      throw new Error('Error fetching events');
    }
  }

  public static async update(event: Partial<EventAttributes>) {
    try {
      const id = event.id as string;
      const updatedEvent = await Event.update(event, { where: { id } });
      return updatedEvent;
    } catch (error: UniqueConstraintError | any) {
      console.error('Error on DAO create event:', error.errors);
      throw new Error(`Unique constraint error: ${error.errors.map((e: any) => e.message).join(', ')}`);
    }
  }

  public static async getGuestsByEventId(event_id: string, user_id: string) {
    try {
      const query = `SELECT * FROM event_guests WHERE event_id = :event_id AND user_id = :user_id`;
      const guests = await sequelize.query(query, {
        replacements: { event_id, user_id }
      });
      return guests[0];
    } catch (error) {
      console.error('Error on DAO get guests by event ID:', error);
      throw new Error('Error fetching guests for the given event ID');
    }
  }


  public static async delete(eventId: string) {
    try {
      // Check if invitations exist for the event
      const invitations = await Invitation.findAll({ where: { event_id: eventId } });

      if (invitations.length > 0) {
        // If there are invitations, mark the event as cancelled
        const cancelledEvent = await Event.update({ status: EventStatus.CANCELLED }, { where: { id: eventId } });
        return cancelledEvent;
      } else {
        // If no invitations, delete the event
        const deletedEvent = await Event.destroy({ where: { id: eventId } });
        return deletedEvent;
      }
    } catch (error: UniqueConstraintError | any) {
      console.error('Error on DAO deleting event:', error.errors);
      throw new Error(`Unique constraint error: ${error.errors.map((e: any) => e.message).join(', ')}`);
    }
  }
}
