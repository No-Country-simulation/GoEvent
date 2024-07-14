import { InvitationStatus } from './invitation.status';
import { InvitationType } from './invitation.type';

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