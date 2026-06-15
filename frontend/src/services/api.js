import axios from "axios";
import { parseApiError } from '../utils';

export const TOKEN_STORAGE_KEY = "vssut_olx_token";

const api = axios.create({
  // baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  baseURL: import.meta.env.VITE_API_URL || "https://vssutolx.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (config.data instanceof globalThis.FormData) {
    delete config.headers['Content-Type'];
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const parsed = parseApiError(error);
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
    const normalized = new Error(parsed.message);
    normalized.status = parsed.status;
    normalized.details = parsed.details;
    return Promise.reject(normalized);
  },
);

export default api;
