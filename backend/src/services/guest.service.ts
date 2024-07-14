import { Guest } from "../models/guest.model"
import IGuest from "../types/guest.types";


class GuestService {
    constructor(private guestModel: typeof Guest) {
        this.guestModel = guestModel;
    }
    #handleError(error: any, trying: string) {
        const err = new Error(`Error ${trying} guests. ${error.message}`)
        err.name = error.name ?? "GuestServiceError"
        throw err
    }


    async getAll(): Promise<any> {
        try {
            return await this.guestModel.findAll();
        } catch (error: any) {
            this.#handleError(error, "getting");
        }
    }

    async getAllInEvent(eid: string): Promise<any> {
        try {
            const getAllInEvent = await this.guestModel.findAll({ where: { event_id: eid } })
            return getAllInEvent;

        } catch (error: any) {
            this.#handleError(error, "getting");
        }
    }

    async getOne(gid: string) {
        try {
            const guest = await this.guestModel.findByPk(gid);
            if (!guest) { throw new Error(`Guest with id:${gid} not found.`) }
            return guest;
        } catch (error: any) {
            this.#handleError(error, "getting");
        }
    }

    async createOne(guest: IGuest) {
        try {
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

    async updateOne(gid: string, data: Partial<IGuest>) {
        try {
            const updateThis = await this.getOne(gid)
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

    async deleteOne(gid: string) {
        try {
            const guest = await this.getOne(gid)
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

    async deleteAll(eid: string) {
        try {
            const deleteAll = await this.guestModel.destroy({ where: { event_id: eid } })
            return deleteAll;
        } catch (error: any) {
            this.#handleError(error, "deleting");
        }
    }
}

const guestService = new GuestService(Guest);
export default guestService;