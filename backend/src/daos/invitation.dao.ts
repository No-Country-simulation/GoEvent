import { Invitation, InvitationCreationAttributes } from "../models";
import { InvitationAttributes, InvitationStatus } from "../types/invitation.types";
import { UniqueConstraintError } from "sequelize";

export default class InvitationDAO {
    private constructor() { }

    //Crear invitación
    public static async create(invitation: InvitationCreationAttributes) {
        try {
            const createdInvitation = await Invitation.create(invitation);
            return createdInvitation.toJSON();
        } catch (error: UniqueConstraintError | any) {
            console.error('Error on DAO create invitation: ', error.errors);
            throw new Error(`Unique constrain error: ${error.errors.map((e: any) => e.message).join(', ')}`);
        }
    }

    //Buscar invitación por ID de evento
    public static async findInvitationByEventId(eventId: string) {
        try {
            const invitations = await Invitation.findAll({ where: { event_id: eventId } });
            return invitations.map((invitation) => invitation.toJSON());
        } catch (error) {
            console.error('Error on DAO find invitation by event ID: ', error);
            throw new Error('Error fetching invitations for the given event ID');
        }
    }

    //Buscar invitación por guest and event
    public static async findInvitationByGuestAndEvent(guestId: string, eventId: string) {
        try {
            const invitations = await Invitation.findAll({ where: { guest_id: guestId, event_id: eventId } });
            return invitations.map((invitation) => invitation.toJSON());
        } catch (error) {
            console.error('Error on DAO find invitation by guest and event: ', error);
            throw new Error('Error fetching invitations for the given guest and event');
        }
    }

    //Actualizar invitación por ID
    public static async update(invitation: Partial<InvitationAttributes>, id: string) {
        try {
            const updatedInvitation = await Invitation.update({
                ...invitation,
                status: invitation.status,
                type: invitation.type
            }, { where: { id } });
            return updatedInvitation;
        } catch (error: UniqueConstraintError | any) {
            console.error('Error on DAO update invitation: ', error.errors);
            throw new Error(`Unique constrain error: ${error.errors.map((e: any) => e.message).join(', ')}`);
        }
    }

    //Registrar asistencia
    public static async registerAttendance(eventId: string, qr_code: number) {
        try {
            const invitation = await Invitation.update(
                {
                    attendance: new Date(),
                    status: 'accepted' as InvitationStatus
                },
                {
                    where:
                        { event_id: eventId, qr_code },
                    returning: true
                }
            );
            return invitation;
        } catch (error: UniqueConstraintError | any) {
            console.error('Error on DAO register attendance: ', error.errors);
            throw new Error(`Attendance -> ${error.errors.map((e: any) => e.message).join(', ')}`);
        }
    }

    //Eliminar invitación por ID
    public static async delete(invitationId: string) {
        try {
            const deleteInvitation = await Invitation.destroy({ where: { id: invitationId } });
            return deleteInvitation;
        } catch (error: UniqueConstraintError | any) {
            console.error('Error on DAO delete invitation: ', error.errors);
            throw new Error(`Unique constrain error: ${error.errors.map((e: any) => e.message).join(', ')}`);
        }
    }
}