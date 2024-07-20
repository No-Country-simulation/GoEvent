import { handleApiCall } from "../utils";
import api from "./api";

export const createEvent = async (dataEvent: any) =>
  await handleApiCall(api.post("/event/create", dataEvent));

export const getEvents = async (userId: string) =>
  await handleApiCall(api.get(`/event/find/${userId}`));

export const deleteEvent = async (eventId: string) =>
  await handleApiCall(api.delete(`/event/delete/${eventId}`));
