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
export interface Event{
  id: string;
  name: string;
  description: string;
  location: string;
  template_image: null | string;
  time: string;
  date: string;
  user_id: string;
  status: string;
  type: string;
  created_at: null | string;
  updated_at: null | string;
}
export interface userAndToken {
  token: string;
  user: userData;
}
