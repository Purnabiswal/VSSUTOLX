import { useEffect } from 'react';
import { chatService } from '../services/chatService';

export function useSocket() {
  useEffect(() => {
    const socket = chatService.connect();
    return () => {
      if (socket.connected) socket.disconnect();
    };
  }, []);
}
