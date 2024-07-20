import { GuestType } from "../types";
import api from "./api";

export const createGuest = async (guestData: GuestType) =>
  await api.post("/guest", guestData);
