import api from './api';

const normalizeNotification = (notification) => ({
  ...notification,
  id: notification._id || notification.id,
  title: notification.type || 'Notification',
  body: notification.message || notification.body,
});

export const notificationService = {
  getNotifications: async () => {
    const { data } = await api.get('/notifications');
    return data.notifications.map(normalizeNotification);
  },
  markAllRead: async () => {
    const { data } = await api.patch('/notifications/read');
    return data.notifications.map(normalizeNotification);
  },
};
