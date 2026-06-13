import { io } from 'socket.io-client';
import { mockDelay } from './api';
import { conversations } from '../data/mockData';

let socket;
let chatDb = [...conversations];

export const chatService = {
  connect: () => {
    if (!socket) socket = io('http://localhost:4000', { autoConnect: false, transports: ['websocket'] });
    return socket;
  },
  getConversations: async () => mockDelay(chatDb),
  getConversation: async (id) => mockDelay(chatDb.find((item) => item.id === id)),
  sendMessage: async (conversationId, text) => {
    const message = { id: crypto.randomUUID(), senderId: 'me', text, createdAt: new Date().toISOString() };
    chatDb = chatDb.map((item) => (item.id === conversationId ? { ...item, messages: [...item.messages, message] } : item));
    return mockDelay(message, 120);
  },
};
