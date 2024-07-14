import { EventStatus } from "./event.status";
import { EventType } from "./event.type";

export interface EventAttributes {
    id: string;
    name: string;
    description: string;
    location: string;
    time: Date;
    date: Date;
    user_id: string;
    status: EventStatus;
    type: EventType;
    created_at: Date;
    updated_at: Date;
}