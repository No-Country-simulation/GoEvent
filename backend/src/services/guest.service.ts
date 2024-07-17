import { Guest } from "../models/guest/guest.model"
import { ICreateGuest, IFindGuest, IGuestResponse, IUpdateGuest } from "../types/guest.types";


class GuestService {
    constructor(private guestModel: typeof Guest) {
        this.guestModel = guestModel;
    }
    #handleError(error: any, trying: string) {
        const err = new Error(`Error ${trying} guests. ${error.message}`)
        err.name = error.name ?? "GuestServiceError"
        throw err
    }


    async getAllTest(): Promise<Guest[] | undefined> {
        try {
            return await this.guestModel.findAll();
        } catch (error: any) {
            this.#handleError(error, "getting");
        }
    }

    async getAll(user_id: string): Promise<Guest[] | undefined> {
        try {
            const guestFromUser = await this.guestModel.findAll({ where: { user_id } })
            return guestFromUser;
        } catch (error: any) {
            this.#handleError(error, "getting");
        }
    }

    async getOne(guest: IFindGuest): Promise<Guest | undefined> {
        try {
            const guestFinded = await this.guestModel.findOne({
                where: guest
            });
            if (!guestFinded) { throw new Error(`Guest with id:${guest.id} not found.`) };
            return guestFinded;
        } catch (error: any) {
            this.#handleError(error, "getting");
        }
    }

    async createOne(user_id: string, guest: ICreateGuest): Promise<IGuestResponse | undefined> {
        try {
            const alreadyExist = await this.guestModel.findOne(
                { where: { email: guest.email, user_id } }
            );
            if (alreadyExist) { throw new Error(`Guest with email:${guest.email} already exists.`) }
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

    async updateOne(guest: IFindGuest, data: IUpdateGuest): Promise<IGuestResponse | undefined> {
        try {
            const updateThis = await this.getOne(guest)
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

    async deleteOne(guest: IFindGuest): Promise<IGuestResponse | undefined> {
        try {
            const guestFinded = await this.getOne(guest)
            const deleteOne = await guestFinded?.destroy();
            return {
                success: true,
                message: "Guest deleted successfully",
                data: deleteOne
            }
        } catch (error: any) {
            this.#handleError(error, "deleting");
        }
    }

    async deleteAll(user_id: string): Promise<IGuestResponse | undefined> {
        try {
            const deleteAll = await this.guestModel.destroy({ where: { user_id } })
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