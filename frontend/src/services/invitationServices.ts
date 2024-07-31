import { InvitationType } from "../types";
import { handleApiCall } from "../utils";
import api from "./api";

export const createInvitation = async (invitationData: InvitationType) =>
  await handleApiCall(api.post("/invitation/create", invitationData));

export const registerAttendance = async (eventId: string, qrCode: string) =>
  await handleApiCall(
    api.post(`/invitation/registerAttendance/${eventId}/${qrCode}`),
  );
