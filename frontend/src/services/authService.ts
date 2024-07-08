import { LoginData, RegisterData } from "../types";
import api from "./api";

export const login = async (data: LoginData) => {
  let response = await api.post("/auth/login", data);
  console.log(response.data);
  // luego se puede hacer lo que desee con la informacion
};

export const register = async (data: RegisterData) => {
  let response = await api.post("/auth/register", data);
  console.log(response.data);
};
