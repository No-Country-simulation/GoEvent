import { EventType } from "../types";
import { handleApiCall } from "../utils";
import api from "./api";

export const createEvent = async (dataEvent: any) =>
  await handleApiCall(api.post("/event/create", dataEvent));

export const updateEventImage = async (dataEvent: any) =>
  await handleApiCall(api.put(`/event/updateTemplate`, dataEvent));

export const getEvents = async (userId: string) =>
  await handleApiCall(api.get(`/event/find/${userId}`));

export const deleteEvent = async (eventId: string) =>
  await handleApiCall(api.delete(`/event/delete/${eventId}`));

export const getOneEvent = async (userId: string, eventId = "") => {
  const response = await handleApiCall(api.get(`/event/find/${userId}`));
  if (response.success) {
    const filterOfEvents = response.data.events.find(
      (e: EventType) => e.id === eventId,
    );
    return filterOfEvents
      ? { success: true, data: filterOfEvents }
      : { success: false, error: "EL evento no fue encontrado" };
  }
  return response;
};

export const getGuestsOfEvent = async (eventId: string) =>
  await handleApiCall(api.get(`/event/findGuests/${eventId}`));

export const sendInvitationByEvent = async (eventId: string) =>
  await handleApiCall(
    api.get(`/invitation/sendInvitationByEventId/${eventId}`),
  );
  