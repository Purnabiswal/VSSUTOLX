import { create } from 'zustand';

export const useNotificationStore = create((set) => ({
  notifications: [],
  toast: null,
  unreadCount: 0,
  pushToast: (toast) => {
    set({ toast });
    window.setTimeout(() => set({ toast: null }), 3200);
  },
  addNotification: (notification) => set((state) => ({
    notifications: [{
      ...notification,
      id: notification._id || notification.id,
      title: notification.type || 'Notification',
      body: notification.message || notification.body,
    }, ...state.notifications],
    unreadCount: state.unreadCount + (notification.read ? 0 : 1),
  })),
  markAllRead: () => set((state) => ({ notifications: state.notifications.map((item) => ({ ...item, read: true })), unreadCount: 0 })),
}));
