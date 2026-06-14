import { create } from 'zustand';
import { notificationService } from '../services';

export const useNotificationStore = create((set) => ({
  notifications: [],
  toast: null,
  unreadCount: 0,
  pushToast: (toast) => {
    set({ toast });
    window.setTimeout(() => set({ toast: null }), 3200);
  },
  pushError: (error) => {
    set({ toast: { message: error?.message || 'Something went wrong', tone: 'danger' } });
    window.setTimeout(() => set({ toast: null }), 3200);
  },
  fetchNotifications: async () => {
    const notifications = await notificationService.getNotifications();
    set({
      notifications,
      unreadCount: notifications.filter((item) => !item.read).length,
    });
    return notifications;
  },
  addNotification: (notification) => set((state) => ({
    notifications: [notificationService.normalize(notification), ...state.notifications],
    unreadCount: state.unreadCount + (notification.read ? 0 : 1),
  })),
  markAllRead: async () => {
    const notifications = await notificationService.markAllRead();
    set({ notifications, unreadCount: 0 });
    return notifications;
  },
}));
