import { create } from 'zustand';
import { notifications } from '../data/mockData';

export const useNotificationStore = create((set) => ({
  notifications,
  toast: null,
  unreadCount: notifications.filter((item) => !item.read).length,
  pushToast: (toast) => {
    set({ toast });
    window.setTimeout(() => set({ toast: null }), 3200);
  },
  markAllRead: () => set((state) => ({ notifications: state.notifications.map((item) => ({ ...item, read: true })), unreadCount: 0 })),
}));
