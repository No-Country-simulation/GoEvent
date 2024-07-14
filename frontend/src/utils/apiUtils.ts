import { AxiosResponse } from "axios";

// Para evitar el uso de tryCatch en cada llama se creo este manejador de
// errores

export const handleApiCall = async (apiCall: Promise<AxiosResponse>) => {
  try {
    const response = await apiCall;
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error };
  }
};
