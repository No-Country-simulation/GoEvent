interface userData {
  created_at: string;
  credit: number;
  email: string;
  fullname: string;
  id: string;
  is_active: boolean;
  password: null | string;
  phone: null | string;
  profile_image: null | string;
  subscription_type_id: string;
  subscription_type: string;
  updated_at: string;
}
export interface userAndToken {
  token: string;
  user: userData;
}
