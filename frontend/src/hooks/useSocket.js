import { useEffect } from 'react';
import { chatService } from '../services/chatService';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';

export function useSocket() {
  const token = useAuthStore((state) => state.token);
  const addNotification = useNotificationStore((state) => state.addNotification);

  useEffect(() => {
    if (!token) return undefined;
    const socket = chatService.connect();
    socket.on('notification:new', addNotification);
    return () => {
      socket.off('notification:new', addNotification);
      if (socket.connected) socket.disconnect();
    };
  }, [addNotification, token]);
}
