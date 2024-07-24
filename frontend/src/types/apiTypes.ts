export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  fullname?: string;
  firstName?: string;
  lastName?: string;
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

export interface GuestType {
  fullname: string;
  email: string;
  phone: string;
}

export interface Guest2Type {
  id: string;
  fullname: string;
  user_id: string;
  email: string;
  phone: string;
}

export interface InvitationType {
  event_id: string;
  guest_id: string;
  qr_code: string;
}
