import api from "./api";

interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  let response = await api.post("/auth/login", data);
  console.log(response.data);
  // luego se puede hacer lo que desee con la informacion
};
