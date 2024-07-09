import { LoginData, RegisterData } from "../types";
import { saveToLocalStorage } from "../utils/localStorageUtils";
import api from "./api";

export const login = async (data: LoginData) => {
  try {
    let response = await api.post("/auth/login", data);
    saveToLocalStorage("user", response.data);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: error };
  }
  // luego se puede hacer lo que desee con la informacion
};

export const register = async (data: RegisterData) => {
  let response = await api.post("/auth/register", data);
  console.log(response.data);
};
