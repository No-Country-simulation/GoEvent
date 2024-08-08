export interface IEventGuest {
    guest_id: string,
    guest_fullname: string,
    guest_description: string,
    guest_email: string,
    guest_phone: string,
    event_id: string,
    invitation_id: string,
    invitation_status: string,
    invitation_attendance: Date,
}
