import { Guest } from "../models/guest/guest.model"
import { ICreateGuest, IGuestResponse, IUpdateGuest } from "../types/guest.types";


class GuestService {
    constructor(private guestModel: typeof Guest) {
        this.guestModel = guestModel;
    }
    #handleError(error: any, trying: string) {
        const err = new Error(`Error ${trying} guests. ${error.message}`)
        err.name = error.name ?? "GuestServiceError"
        throw err
    }


    async getAll(): Promise<Guest[] | undefined> {
        try {
            return await this.guestModel.findAll();
        } catch (error: any) {
            this.#handleError(error, "getting");
        }
    }

    async getAllInEvent(eid: number): Promise<Guest[] | undefined> {
        try {
            const getAllInEvent = await this.guestModel.findAll({ where: { event_id: eid } })
            return getAllInEvent;
        } catch (error: any) {
            this.#handleError(error, "getting");
        }
    }

    async getOne(eid: number, gid: number): Promise<Guest | undefined> {
        try {
            const guest = await this.guestModel.findOne({
                where: {
                    event_id: eid,
                    id: gid
                }
            });
            if (!guest) { throw new Error(`Guest with id:${gid} not found.`) };
            return guest;
        } catch (error: any) {
            this.#handleError(error, "getting");
        }
    }

    async createOne(eid: number, guest: ICreateGuest): Promise<IGuestResponse | undefined> {
        try {
            const guestInEvent = await this.getAllInEvent(eid);
            if (guestInEvent?.find(g => g.email === guest.email)) { throw new Error(`Guest with email:${guest.email} already exists.`) }
            const createGuest = await this.guestModel.create(guest);
            return {
                success: true,
                message: "Guest created successfully",
                data: createGuest
            }
        } catch (error: any) {
            this.#handleError(error, "creating");
        }
    }

    async updateOne(vid: number, gid: number, data: IUpdateGuest): Promise<IGuestResponse | undefined> {
        try {
            const updateThis = await this.getOne(vid, gid)
            const updateGuest = await updateThis?.update(data);

            return {
                success: true,
                message: "Guest created successfully",
                data: updateGuest
            }
        } catch (error: any) {
            this.#handleError(error, "updating");
        }
    }

    async deleteOne(vid: number, gid: number): Promise<IGuestResponse | undefined> {
        try {
            const guest = await this.getOne(vid, gid)
            const deleteOne = await guest?.destroy();
            return {
                success: true,
                message: "Guest deleted successfully",
                data: deleteOne
            }
        } catch (error: any) {
            this.#handleError(error, "deleting");
        }
    }

    async deleteAll(eid: number): Promise<IGuestResponse | undefined> {
        try {
            const deleteAll = await this.guestModel.destroy({ where: { event_id: eid } })
            return {
                success: true,
                message: "Guest deleted successfully",
                data: deleteAll
            }
        } catch (error: any) {
            this.#handleError(error, "deleting");
        }
    }
}

const guestService = new GuestService(Guest);
export default guestService;