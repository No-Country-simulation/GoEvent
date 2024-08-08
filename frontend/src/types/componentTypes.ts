export interface ProtectedRouteProps {
  element: React.ReactElement;
  redirectTo: string;
}

export interface guestType {
  event_id: string;
  guest_fullname: string;
  guest_email: string;
  guest_id: string;
  guest_phone: string;
  invitation_attendance: null;
  invitation_id: string;
  invitation_qr_code: string;
  invitation_status: string;
  user_id: string;
}

export enum EventStatus {
  DRAFT = "draft",
  SCHEDULED = "scheduled",
  ONGOING = "ongoing",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}
