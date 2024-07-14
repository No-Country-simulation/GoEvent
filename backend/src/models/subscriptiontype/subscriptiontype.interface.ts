import { SubscriptionTypeEnum } from "./subscriptiontype.enum";

export interface SubscriptionTypeAttributes {
    id: number;
    type: SubscriptionTypeEnum;
    max_events: number;
    price: number;
}