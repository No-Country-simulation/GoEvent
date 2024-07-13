import { type Request, type Response } from "express";
import GuestService from "../services/guest.service";
import HTTP_STATUS from "../constants/httpStatusCodes";


export default class GuestController {
    private guestService: GuestService;

    constructor(guestService: GuestService) {
        this.guestService = guestService;
    }

    async getAll(req: Request, res: Response) {
        try {
            const guests = await this.guestService.getAll();
            res.status(HTTP_STATUS.OK).json(guests);

        } catch (error: any) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
                .json({
                    message: "Internal server error.", error: error.message
                })
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const { gid } = req.params
            const guest = await this.guestService.getOne(gid);
            res.status(HTTP_STATUS.OK).json(guest);
        } catch (error: any) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
                .json({
                    message: "Internal server error.", error: error.message
                })
        }
    }

    async createOne(req: Request, res: Response) {
        try {
            const guest = await this.guestService.createOne(req.body);
            console.log(guest);

            res.status(HTTP_STATUS.CREATED).json(guest);
        } catch (error: any) {
            console.log(error);

            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
                .json({
                    message: "Internal server error.", error: error.message
                })
        }
    }

    async updateOne(req: Request, res: Response) {
        try {

        } catch (error: any) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
                .json({
                    message: "Internal server error.", error: error.message
                })
        }
    }

    async deleteOne(req: Request, res: Response) {
        try {

        } catch (error: any) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
                .json({
                    message: "Internal server error.", error: error.message
                })
        }
    }

    async deleteAll(req: Request, res: Response) {
        try {

        } catch (error: any) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
                .json({
                    message: "Internal server error.", error: error.message
                })
        }
    }
}