import { Event, EventAttributes, EventStatus } from '../models/event.model';
import { UniqueConstraintError } from 'sequelize';
import { Invitation } from '../models/invitation.model';

export default class EventDAO {
  private constructor() {}

  public static async create(event: EventAttributes) {
    try {
      const createdEvent = await Event.create(event);
      return createdEvent.toJSON();
    } catch (error: UniqueConstraintError | any) {
      console.error('Error on DAO create event:', error.errors);
      throw new Error(`Unique constraint error: ${error.errors.map((e: any) => e.message).join(', ')}`);
    }
  }

  public static async update(event: Partial<EventAttributes>, id: string) {
    try {
      const updatedEvent = await Event.update(event, { where: { id } });
      return updatedEvent;
    } catch (error: UniqueConstraintError | any) {
      console.error('Error on DAO create event:', error.errors);
      throw new Error(`Unique constraint error: ${error.errors.map((e: any) => e.message).join(', ')}`);
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
