import { InvitationType } from "../types";
import { handleApiCall } from "../utils";
import api from "./api";

export const createInvitation = async (invitationData: InvitationType) =>
  await handleApiCall(api.post("/invitation/create", invitationData));
