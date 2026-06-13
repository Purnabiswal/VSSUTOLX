import { create } from 'zustand';
import { authService } from '../services/authService';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('vssut_olx_token'),
  loading: false,
  login: async (payload) => {
    set({ loading: true });
    const data = await authService.login(payload);
    set({ user: data.user, token: data.token, loading: false });
    return data.user;
  },
  register: async (payload) => {
    set({ loading: true });
    const data = await authService.register(payload);
    set({ user: data.user, token: data.token, loading: false });
    return data.user;
  },
  logout: async () => {
    await authService.logout();
    set({ user: null, token: null });
  },
  hydrate: async () => {
    if (!localStorage.getItem('vssut_olx_token')) return;
    const data = await authService.me();
    set({ user: data.user, token: 'mock-vssut-token' });
  },
}));
