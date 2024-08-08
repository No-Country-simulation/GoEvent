import { Request, Response, NextFunction } from 'express';
import guestService from "../services/guest.service";
import HTTP_STATUS from "../constants/httpStatusCodes";


class GuestController {
    constructor() {
    }

    async getAllTest(req: Request, res: Response, next: NextFunction) {
        try {
            const guests = await guestService.getAllTest();
            res.status(HTTP_STATUS.OK).json(guests);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = req.user as string
            const guests = await guestService.getAll(user_id);
            res.status(HTTP_STATUS.OK).json(guests);
        } catch (error) {
            next(error);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const user_id = req.user as string
            const guest = await guestService.getOne({ id, user_id });
            res.status(HTTP_STATUS.OK).json(guest);
        } catch (error) {
            next(error);
        }
    }

    async createOne(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = req.user as string
            const event_id = req.body.event_id
            const guest = await guestService.createOne(user_id, req.body, event_id);
            res.status(HTTP_STATUS.CREATED).json(guest);
        } catch (error) {
            next(error);
        }
    }

    async updateOne(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = req.user as string
            const { id } = req.params
            const guestUpdate = await guestService.updateOne({ id, user_id }, req.body)
            res.status(HTTP_STATUS.OK).json(guestUpdate)
        } catch (error) {
            next(error);
        }
    }

    async createMany(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = req.user as string
            const event_id = req.params.event_id
            const guests = await guestService.createMany(user_id, req.file, req.body, event_id);
            res.status(HTTP_STATUS.CREATED).json(guests);
        } catch (error) {
            next(error);
        }
    }

    async deleteOne(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = req.user as string
            const { id } = req.params
            const guestDelete = await guestService.deleteOne({ id, user_id })
            res.status(HTTP_STATUS.OK).json(guestDelete)
        } catch (error) {
            next(error);
        }
    }

    async deleteAll(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = req.user as string
            const guestsDelete = await guestService.deleteAll(user_id)
            res.status(HTTP_STATUS.OK).json(guestsDelete)
        } catch (error) {
            next(error);
        }
    }
}

const guestController = new GuestController()
export default guestController