import { LoginData, RegisterData } from "../types";
import { handleApiCall } from "../utils";
import { saveToLocalStorage } from "../utils/localStorageUtils";
import api from "./api";

export const login = async (data: LoginData) => {
  let response = await handleApiCall(api.post("/auth/login", data));

  // luego se puede hacer lo que desee con la informacion
  if (response.success) {
    const { user, token } = response.data;
    saveToLocalStorage("user", { user, token });
  }

  return response;
};

export const register = async (data: RegisterData) => {
  let response = await handleApiCall(api.post("/auth/register", data));
  return response;
};
