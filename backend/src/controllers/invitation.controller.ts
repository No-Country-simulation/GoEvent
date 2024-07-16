import type { Request, Response } from 'express';
import InvitationService from '../services/invitation.service';
import HTTP_STATUS from '../constants/httpStatusCodes';

export default class InvitationController {
    private constructor() {}

    // Crear una nueva invitación
    public static async create(req: Request, res: Response) {
        try {
            const serviceResponse = await InvitationService.create(req.body);
            if (serviceResponse.success === false) {
                res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
            return;
        }
            res.status(HTTP_STATUS.CREATED).json(serviceResponse);
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error });
        }
    }

    // Obtener invitaciones por ID de evento
    public static async findInvitationByEventId(req: Request, res: Response) {
        try {
            const eventId = req.params.eventId as string;
            const serviceResponse = await InvitationService.findInvitationByEventId(eventId);
            if (serviceResponse.success === false) {
                res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
            return;
        }
            res.status(HTTP_STATUS.OK).json(serviceResponse);
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error });
        }
    }
    

    // Actualizar invitación por ID
    public static async update(req: Request, res: Response) {
        try {
            const invitationId = req.params.invitationId as string;
            const serviceResponse = await InvitationService.update(req.body, invitationId);
            if (serviceResponse.success === false) {
                res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
            return;
        }
            res.status(HTTP_STATUS.OK).json(serviceResponse);
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error });
        }
    }

    // Eliminar invitación por ID
    public static async delete(req: Request, res: Response) {
        try {
            const invitationId = req.params.invitationId as string;
            const serviceResponse = await InvitationService.delete(invitationId);
            if (serviceResponse.success === false) {
                res.status(HTTP_STATUS.BAD_REQUEST).json(serviceResponse);
            return;
        }
            res.status(HTTP_STATUS.OK).json(serviceResponse);
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error });
        }
    }
}

