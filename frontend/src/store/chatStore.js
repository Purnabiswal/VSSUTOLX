import { create } from 'zustand';
import { chatService } from '../services/chatService';

export const useChatStore = create((set) => ({
  conversations: [],
  activeConversation: null,
  loading: false,
  fetchConversations: async () => {
    set({ loading: true });
    const conversations = await chatService.getConversations();
    set({ conversations, activeConversation: conversations[0] || null, loading: false });
  },
  openConversation: async (id) => {
    const activeConversation = await chatService.getConversation(id);
    set({ activeConversation });
  },
  sendMessage: async (id, text) => {
    const message = await chatService.sendMessage(id, text);
    set((state) => ({
      activeConversation: state.activeConversation?.id === id ? { ...state.activeConversation, messages: [...state.activeConversation.messages, message] } : state.activeConversation,
      conversations: state.conversations.map((item) => (item.id === id ? { ...item, messages: [...item.messages, message] } : item)),
    }));
  },
}));
