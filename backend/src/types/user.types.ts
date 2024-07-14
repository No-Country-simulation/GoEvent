export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

export interface UserAttributes {
    id: string;
    fullname: string;
    email: string;
    password: string;
    profile_image: string;
    phone: string;
    credit_card: string;
    subscription_type_id: number;
    role: UserRole;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}