import { Guest } from "../models/guest.model"
import IGuest from "../types/guest.types";


class GuestService {
    constructor(private guestModel: typeof Guest) {
        this.guestModel = guestModel;
    }

    async getAll(): Promise<any> {
        try {
            return await this.guestModel.findAll(); 
        } catch (error: any) {            
            throw new Error(`Error getting guests. ${error.message}`)
        }
    }

    async getAllInEvent(eid: string): Promise<any> {
        try {
            const getAllInEvent = await this.guestModel.findAll({ where: { event_id: eid } })
            return getAllInEvent;

        } catch (error: any) {
            throw new Error(`Error getting guests. ${error.message}`)
        }
    }

    async getOne(gid: string): Promise<Guest> {
        try {
            const guest = await this.guestModel.findByPk(gid);
            if (!guest) { throw new Error(`Guest with id:${gid} not found.`) }
            return guest;
        } catch (error: any) {
            throw new Error(`Error getting guest. ${error.message}`)
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
            throw new Error(`Error creating guest: ${error.message}`)
        }
    }

    async updateOne(gid: string, data: Partial<IGuest>) {
        try {
            const updateThis = await this.getOne(gid)
            const updateGuest = await updateThis.update(data);

            return {
                success: true,
                message: "Guest created successfully",
                data: updateGuest
            }
        } catch (error: any) {
            throw new Error(`Error updating guest: ${error.message}`)
        }
    }

    async deleteOne(gid: string) {
        try {
            const guest = await this.getOne(gid)
            const deleteOne = await guest.destroy();
            return {
                success: true,
                message: "Guest deleted successfully",
                data: deleteOne
            }
        } catch (error: any) {
            throw new Error(`Error deleting guest: ${error.message}`)
        }
    }

    async deleteAll(eid: string) {
        try {
            const deleteAll = await this.guestModel.destroy({ where: { event_id: eid } })
            return deleteAll;
        } catch (error: any) {
            throw new Error(`Error deleting guests: ${error.message}`)
        }
    }
}

const guestService = new GuestService(Guest);
export default guestService;