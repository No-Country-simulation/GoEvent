import axios, { InternalAxiosRequestConfig } from "axios";
import { loadFromLocalStorage } from "../utils";
import { userAndToken } from "../types";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
console.log(baseUrl);
// instancia de axios para predefinir valores

const api = axios.create({
  baseURL: baseUrl || "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Antes de hacer cada llamada, pasa por aqui para agregar el token

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const user = loadFromLocalStorage<userAndToken>("user");

  // si existe el token lo agrega

  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

export default api;
