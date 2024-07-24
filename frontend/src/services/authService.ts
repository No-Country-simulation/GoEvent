import { LoginData, RegisterData } from "../types";
import { handleApiCall } from "../utils";
import { saveToLocalStorage } from "../utils/localStorageUtils";
import api from "./api";

export const login = async (data: LoginData, setUser: any) => {
  let response = await handleApiCall(api.post("/auth/login", data));

  if (response.success) {
    const { user, token } = response.data;
    setUser({ user, token });
  }
  return response;
};

export const register = async (data: RegisterData) =>
  await handleApiCall(api.post("/auth/register", data));
