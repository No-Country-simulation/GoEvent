import axios, { InternalAxiosRequestConfig } from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// instancia de axios para predefinir valores

const api = axios.create({
  baseURL: baseUrl || "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Antes de hacer cada llamada, pasa por aqui para agregar el token

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = null;

  // si existe el token lo agrega

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
