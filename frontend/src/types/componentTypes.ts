export interface ProtectedRouteProps {
  element: React.ReactElement;
  redirectTo: string;
}

export enum EventStatus {
  DRAFT = "draft",
  SCHEDULED = "scheduled",
  ONGOING = "ongoing",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}
