import { GuestType } from "../types";
import { handleApiCall } from "../utils";
import api from "./api";

export const createGuest = async (guestData: GuestType) =>
  await handleApiCall(api.post("/guest", guestData));

export const getAllGuests = async () => {
  return await handleApiCall(api.get("/guest"));
};
