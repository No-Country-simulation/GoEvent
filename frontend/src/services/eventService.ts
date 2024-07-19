import { handleApiCall } from "../utils";
import api from "./api";

export const createEvent = async (dataEvent: any) => {
  const response = await handleApiCall(api.post("/event/create", dataEvent));
  console.log(response);
};

export const getEvents = async (userId: string) => {
  const response = await handleApiCall(api.get(`/event/find/${userId}`));
  return response;
};
