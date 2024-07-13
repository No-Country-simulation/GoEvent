import { Request, Response, NextFunction } from 'express';
import guestService from "../services/guest.service";
import HTTP_STATUS from "../constants/httpStatusCodes";


class GuestController {
    constructor() {
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const guests = await guestService.getAll();
            res.status(HTTP_STATUS.OK).json(guests);
        } catch (error) {
            next(error);
        }
    }

    async getAllInEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const { eid } = req.params
            const guests = await guestService.getAllInEvent(eid);
            res.status(HTTP_STATUS.OK).json(guests);
        } catch (error) {
            next(error);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { gid } = req.params
            const guest = await guestService.getOne(gid);
            res.status(HTTP_STATUS.OK).json(guest);
        } catch (error) {
            next(error);
        }
    }

    async createOne(req: Request, res: Response, next: NextFunction) {
        try {
            const guest = await guestService.createOne(req.body);
            res.status(HTTP_STATUS.CREATED).json(guest);
        } catch (error) {
            next(error);
        }
    }

    async updateOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { gid } = req.params
            const guestUpdate = await guestService.updateOne(gid, req.body)
            res.status(HTTP_STATUS.OK).json(guestUpdate)
        } catch (error) {
            next(error);
        }
    }

    async deleteOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { gid } = req.params
            const guestDelete = await guestService.deleteOne(gid)
            res.status(HTTP_STATUS.OK).json(guestDelete)
        } catch (error) {
            next(error);
        }
    }

    async deleteAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { eid } = req.params
            const guestsDelete = await guestService.deleteAll(eid)
            res.status(HTTP_STATUS.OK).json(guestsDelete)
        } catch (error) {
            next(error);
        }
    }
}

const guestController = new GuestController()
export default guestController