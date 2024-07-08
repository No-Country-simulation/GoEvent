import { LoginData } from "../types";
import api from "./api";

export const login = async (data: LoginData) => {
  let response = await api.post("/auth/login", data);
  console.log(response.data);
  // luego se puede hacer lo que desee con la informacion
};
