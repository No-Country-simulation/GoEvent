export enum InvitationStatus {
    NOTSENT = 'notsent',
    SENT = 'sent',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
}

export enum InvitationType {
    FREE = 'free',
    PAY = 'pay',
}

export interface InvitationAttributes {
    id: string;
    event_id: string;
    guest_id: string;
    status: InvitationStatus;
    type: InvitationType;
    qr_code: string;
    cost: number;
    paid: boolean;
    attendance: Date;
}

