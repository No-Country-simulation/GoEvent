import InvitationDAO from '../daos/invitation.dao';
import { InvitationAttributes } from "../types/invitation.types";

export default class InvitationService {
    private constructor() {}

    //Crear invitación
    public static async create(invitation: InvitationAttributes) {
        try {
            const createdInvitation = await InvitationDAO.create(invitation);
            return { success: true, message: 'Invitation created successfully.', invitation: createdInvitation}
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

    //Eliminar invitación por ID
    public static async delete(invitationId: string) {
        try {
            const deleteInvitation = await InvitationDAO.delete(invitationId);
            if(deleteInvitation > 0) {
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