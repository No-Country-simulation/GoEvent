import InvitationDAO from '../daos/invitation.dao';
import EventDAO from '../daos/event.dao';
import { InvitationAttributes } from "../types/invitation.types";
import EmailHelper from '../helpers/email.helper';
import { InvitationStatus } from '../types/invitation.types';

export default class InvitationService {
    private constructor() { }

    //Crear invitación
    public static async create(invitation: InvitationAttributes) {
        try {
            const createdInvitation = await InvitationDAO.create(invitation);
            return { success: true, message: 'Invitation created successfully.', invitation: createdInvitation }
        } catch (error: any) {
            console.error('Error on Service creating invitation:', error);
            return {
                success: false,
                message: `Internal server error creating invitation. ${error.message}`,
            };
        }
    }

    //Buscar invitación por ID de evento
    public static async findInvitationByEventId(eventId: string) {
        try {
            const invitations = await InvitationDAO.findInvitationByEventId(eventId);
            return { success: true, invitations };
        } catch (error: any) {
            console.error('Error getting invitations service:', error);
            return {
                success: false,
                message: `Internal server error fetching invitations. ${error.message}`,
            };
        }
    }

    //Actualizar invitación por ID
    public static async update(invitation: Partial<InvitationAttributes>, invitationId: string) {
        try {
            if (!invitation) {
                return { success: false, message: 'No data to update.' };
            }
            const updatedInvitation = await InvitationDAO.update(invitation, invitationId);
            return { success: true, message: 'Invitation updated successfully.', invitation: updatedInvitation };
        } catch (error: any) {
            console.error('Error on service updating invitation', error);
            return {
                success: false,
                message: `Internal server error updating invitation. ${error.message}`,
            };
        }
    }

    //Enviar invitaciones por evento
    public static async sendInvitationByEventId(userId: string, eventId: string) {
        try {
            const event = await EventDAO.findEventByUserIdAndEventId(userId, eventId);
            if (!event) return { success: false, message: 'Event not found.' };

            const event_guests = await EventDAO.getGuestsByEventId(eventId, userId);
            if (!event_guests) return { success: false, message: 'Event or guests not found.' };

            event_guests.forEach(async (guest: any) => { /// <------------ arreglar any
                if (guest.invitation_status === 'notsent') {
                    const sendInvitation = await EmailHelper.sendInvitation(
                        guest.guest_email, event.name, event.location, event.date,
                        guest.invitation_qr_code, guest.guest_name, guest.invitation_id
                    );
                    if (sendInvitation.success) {
                        await InvitationDAO.update({ status: InvitationStatus.SENT }, guest.invitation_id);
                    }
                }
            })

            return { success: true, data: event_guests };
        } catch (error: any) {
            console.error('Error getting invitations service:', error);
            return {
                success: false,
                message: `Internal server error fetching invitations. ${error.message}`,
            };
        }
    }

    //Registrar asistencia de una invitación
    public static async registerAttendance(invitationId: string, qr_code: string) {
        try {
            if (!invitationId || !qr_code) {
                return { success: false, message: 'Data not found.' };
            }
            const registeredAttendance = await InvitationDAO.registerAttendance(invitationId, Number(qr_code));
            if (!registeredAttendance[1][0]) return { success: false, message: 'Invitation not found.' }
            return {
                success: true,
                message: 'Attendance registered successfully.'
            }
        } catch (error: any) {
            console.error('Error on service registering attendance:', error);
            return {
                success: false,
                message: `Internal server error registering attendance. ${error.message}`,
            };
        }
    }

    //Eliminar invitación por ID
    public static async delete(invitationId: string) {
        try {
            const deleteInvitation = await InvitationDAO.delete(invitationId);
            if (deleteInvitation > 0) {
                return { success: true, message: ' Invitation deleted successfully.' }
            }
            else {
                return { success: false, message: ' Invitation not found or already deleted.' }
            }

        } catch (error: any) {
            console.error('Error on services deleting invitation:', error);
            return {
                success: false,
                message: `Internal server error deleting invitation. ${error.message}`,
            };
        }
    }

}