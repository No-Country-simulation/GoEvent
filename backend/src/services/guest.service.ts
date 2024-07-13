import { Guest } from "../models/guest.model"
import IGuest from "../types/guest.types";


export default class GuestService {
    private guestModel: typeof Guest;

    constructor(guestModel: typeof Guest) {
        this.guestModel = guestModel;
    }

    async getAll(): Promise<Guest[]> {
        try {
            return await this.guestModel.findAll();
        } catch (error: any) {
            throw new Error(`Error getting guests: ${error.message}`)
        }
    }

    async getOne(gid: string): Promise<Guest> {
        try {
            const guest = await this.guestModel.findByPk(gid);
            if (!guest) { throw new Error(`Guest with id:${gid} not found.`) }
            return guest;
        } catch (error: any) {
            throw new Error(`Error getting guest: ${error.message}`)
        }
    }

    async createOne(guest: IGuest) {
        try {
            const createGuest = await this.guestModel.create(guest);
            console.log(createGuest);

            if (createGuest) {
                return {
                    success: true,
                    message: "Guest created successfully",
                    data: createGuest
                }
            }
            return {
                success: false,
                message: "Guest was not created successfully",
                data: createGuest
            }

        } catch (error: any) {
            throw new Error(`Error creating guest: ${error.message}`)
        }
    }

    async updateOne() {
        try {

        } catch (error: any) {
            throw new Error(`Error updating guest: ${error.message}`)
        }
    }

    async deleteOne(gid: string) {
        try {
            const guest = await this.getOne(gid)
            const deleteOne = await guest.destroy();
            console.log(deleteOne);
            return {
                success: true,
                message: "Guest deleted successfully",
                data: deleteOne
            }
        } catch (error: any) {
            return {
                success: false,
                message: `Error deleting guest`,
                error
            }
        }
    }

    async deleteAll() {
        try {

        } catch (error: any) {
            throw new Error(`Error deleting guests: ${error.message}`)
        }
    }
}