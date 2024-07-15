export default interface IGuest {
    id: string,
    fullname: string,
    description: string,
    email: string,
    phone: string,

    user_id: string,
    event_id: string
}

export interface ICreateGuest extends Omit<IGuest, "id"> { }
export interface IUpdateGuest extends Partial<ICreateGuest> { }

export interface IGuestResponse {
    data: any,
    message: string,
    success: boolean
}