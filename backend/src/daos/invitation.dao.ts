import { Invitation } from "../models";
import { InvitationAttributes, InvitationStatus } from "../types/invitation.types";
import { UniqueConstraintError } from "sequelize";

export default class InvitationDAO {
    private constructor() { }

    //Crear invitación
    public static async create(invitation: InvitationAttributes) {
        try {
            const createdInvitation = await Invitation.create({
                ...invitation,
                status: InvitationStatus.PENDING,
                type: invitation.type
            });
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
    public static async registerAttendance(invitationId: string, qr_code: number) {
        try {
            const invitation = await Invitation.update(
                {
                    attendance: new Date(),
                    status: 'accepted' as InvitationStatus
                },
                {
                    where:
                        { id: invitationId, qr_code },
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
            console.error('Error on DAO delete invitation: ', error.erros);
            throw new Error(`Unique constrain error: ${error.errors.map((e: any) => e.message).join(', ')}`);
        }
    }
}