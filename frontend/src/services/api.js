import axios from 'axios';

const api = axios.create({
  baseURL: '/mock-api',
  timeout: 800,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('vssut_olx_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  },
);

export const mockDelay = (payload, delay = 220) =>
  new Promise((resolve) => {
    window.setTimeout(() => resolve(payload), delay);
  });

export default api;
