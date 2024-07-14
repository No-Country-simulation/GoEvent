export enum SubscriptionTypeEnum {
    FREE = 'free',
    PREMIUM = 'premium',
}

export interface SubscriptionTypeAttributes {
    id: number;
    type: SubscriptionTypeEnum;
    max_events: number;
    price: number;
}