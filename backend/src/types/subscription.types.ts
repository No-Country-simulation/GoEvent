export enum SubscriptionTypeEnum {
    FREE = 'free',
    PREMIUM = 'premium',
}

export interface SubscriptionTypeAttributes {
    id: string;
    type: SubscriptionTypeEnum;
    max_events: number;
    price: number;
}