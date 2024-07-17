export default interface IGuest {
    id: string,
    fullname: string,
    email: string,
    phone: string,

    user_id: string,
}

export interface ICreateGuest extends Omit<IGuest, "id"> { }
export interface IUpdateGuest extends Partial<ICreateGuest> { }
export interface IFindGuest extends Pick<IGuest, "id" | "user_id"> { }

export interface IGuestResponse {
    data: any,
    message: string,
    success: boolean
}