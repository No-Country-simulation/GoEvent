export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  fullname: string;
}

export interface EventType {
  id: string;
  name: string;
  description: string;
  location: string;
  time: string;
  date: string;
  user_id: string;
  status: string;
  type: string;
  created_at: string;
  updated_at: string;
}
