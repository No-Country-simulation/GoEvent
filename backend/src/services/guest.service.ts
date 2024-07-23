import { Guest } from "../models/guest/guest.model"
import { ICreateGuest, IFindGuest, IGuestResponse, IUpdateGuest } from "../types/guest.types";
import GuestHelper from "../helpers/guest.helper";
import InvitationDAO from "../daos/invitation.dao";
import AuthHelper from "../helpers/auth.helper";

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

    async createOne(user_id: string, guest: ICreateGuest, event_id: string): Promise<IGuestResponse | undefined> {
        try {
            const alreadyExist = await this.guestModel.findOne(
                { where: { email: guest.email, user_id } }
            );
            if (alreadyExist) { throw new Error(`Guest with email:${guest.email} already exists.`) }
            const createGuest = await this.guestModel.create({ ...guest, user_id });
            let message = "Guest created successfully";

            // Si tiene id de evento, crea la invitacion
            if (event_id) {
                const qr_code = AuthHelper.generateCode();
                await InvitationDAO.create({
                    guest_id: createGuest.id,
                    event_id,
                    qr_code: qr_code as unknown as string,
                })
                message = "Guest and invitation created successfully"
            }

            return {
                success: true,
                message,
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

    async createMany(user_id: string, excelFile: any, dictionary: Record<string, string>, event_id: string): Promise<{ success: boolean; message: string; data: any[] }> {
        const results: Array<{ guest: Partial<ICreateGuest>, success: boolean, error?: string }> = [];

        try {
            if (!excelFile || !dictionary || !event_id) this.#handleError("File not found", "uploading");

            const guests = await GuestHelper.excelImport(excelFile, dictionary);

            for (const guest of guests) {
                if (guest.fullname && guest.email) {
                    const data = {
                        fullname: guest.fullname,
                        email: guest.email,
                        phone: guest.phone ? guest.phone : '',
                    };

                    try {
                        const createGuest = await this.createOne(user_id, data, event_id);
                        if (createGuest) {
                            results.push({ guest, success: true });
                        } else {
                            throw new Error("Error creating guest");
                        }
                    } catch (error: any) {
                        results.push({ guest, success: false, error: error.message });
                    }
                } else {
                    results.push({ guest, success: false, error: "Missing fullname or email" });
                }
            }

            return {
                success: results.every(result => result.success),
                message: results.every(result => result.success) ? "All guests and invitations processed successfully" : "Some guests could not be processed",
                data: results
            };
        } catch (error: any) {
            this.#handleError(error, "creating");
            return {
                success: false,
                message: "An error occurred",
                data: results
            };
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