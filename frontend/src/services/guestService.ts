import { GuestType } from "../types";
import { handleApiCall } from "../utils";
import api from "./api";

interface DeleteGuestResponse {
  success: boolean;
  error?: string;
}

export const createGuest = async (guestData: GuestType) =>
  await handleApiCall(api.post("/guest", guestData));

export const getAllGuests = async () => {
  return await handleApiCall(api.get("/guest"));
};

export const deleteGuest = async (guest_id: string): Promise<DeleteGuestResponse> => {
  try {
    const response = await api.delete(`/guest/${guest_id}`);
    return { success: response.status === 200, error: undefined };
  } catch (error) {
    // Maneja el error como un Error en TypeScript
    if (error instanceof Error) {
      console.error("Error deleting guest:", error.message);
      return { success: false, error: error.message };
    } else {
      // Maneja cualquier otro tipo de error
      console.error("Unknown error deleting guest:", error);
      return { success: false, error: "Unknown error occurred" };
    }
  }
};