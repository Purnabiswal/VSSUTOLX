import { io } from 'socket.io-client';
import api, { TOKEN_STORAGE_KEY } from './api';
import { normalizeProduct } from './productService';
import { normalizeUser } from './userService';

let socket;

const apiOrigin = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '');

export const normalizeMessage = (message) => ({
  ...message,
  id: message._id || message.id,
  text: message.message || message.text,
  senderId: message.sender?._id || message.sender?.id || message.sender,
});

export const normalizeChat = (chat, currentUserId) => {
  const participants = chat.participants?.map(normalizeUser) || [];
  const participant = participants.find((user) => user.id !== currentUserId) || participants[0] || {};
  return {
    ...chat,
    id: chat._id || chat.id,
    participant,
    product: normalizeProduct(chat.product),
    messages: chat.messages?.map(normalizeMessage) || (chat.lastMessage ? [normalizeMessage(chat.lastMessage)] : []),
  };
};

export const chatService = {
  connect: () => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!socket) socket = io(apiOrigin, { autoConnect: false, transports: ['websocket'], auth: { token }, withCredentials: true });
    socket.auth = { token };
    if (token && !socket.connected) socket.connect();
    return socket;
  },
  getConversations: async (currentUserId) => {
    const { data } = await api.get('/chats');
    return data.chats.map((chat) => normalizeChat(chat, currentUserId));
  },
  getConversation: async (id, currentUserId) => {
    const [{ data: chatData }, { data: messageData }] = await Promise.all([
      api.get(`/chats/${id}`),
      api.get(`/messages/${id}`),
    ]);
    return { ...normalizeChat(chatData.chat, currentUserId), messages: messageData.messages.map(normalizeMessage) };
  },
  createConversation: async (payload, currentUserId) => {
    const { data } = await api.post('/chats', payload);
    return normalizeChat(data.chat, currentUserId);
  },
  sendMessage: async (chatId, text) => {
    const { data } = await api.post('/messages', { chatId, message: text });
    return normalizeMessage(data.message);
  },
};
