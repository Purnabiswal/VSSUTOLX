import { create } from 'zustand';
import { authService } from '../services/authService';
import { TOKEN_STORAGE_KEY } from '../services/api';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem(TOKEN_STORAGE_KEY),
  loading: false,
  error: null,
  login: async (payload) => {
    set({ loading: true, error: null });
    try {
      const data = await authService.login(payload);
      set({ user: data.user, token: data.accessToken, loading: false });
      return data.user;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  register: async (payload) => {
    set({ loading: true, error: null });
    try {
      const normalized = { ...payload, year: payload.year ? Number(payload.year) : undefined };
      const data = await authService.register(normalized);
      set({ user: data.user, token: data.accessToken, loading: false });
      return data.user;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  logout: async () => {
    await authService.logout();
    set({ user: null, token: null });
  },
  hydrateCurrentUser: async () => {
    if (!localStorage.getItem(TOKEN_STORAGE_KEY)) return null;
    try {
      const data = await authService.me();
      set({ user: data.user });
      return data.user;
    } catch {
      set({ user: null, token: null });
      return null;
    }
  },
  hydrate: async () => useAuthStore.getState().hydrateCurrentUser(),
}));
