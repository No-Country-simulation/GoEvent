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
  const response = await getEvents(userId);

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

export const filterEvents = async (eventStatus: string, userId: string) => {
  const response = await getEvents(userId);

  if (response.success) {
    if (eventStatus === "all")
      return { success: true, data: response.data.events };

    const filterOfEvents = response.data.events.filter(
      (e: EventType) => e.status === eventStatus,
    );
    return { success: true, data: filterOfEvents };
  }

  return response;
};

export const updateEvent = async (dataEvent: any) =>
  await handleApiCall(api.put("/event/update", dataEvent));
