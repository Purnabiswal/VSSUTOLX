import { create } from 'zustand';
import { chatService } from '../services/chatService';
import { useAuthStore } from './authStore';

export const useChatStore = create((set) => ({
  conversations: [],
  activeConversation: null,
  loading: false,
  fetchConversations: async () => {
    set({ loading: true });
    const currentUserId = useAuthStore.getState().user?.id;
    const conversations = await chatService.getConversations(currentUserId);
    set({ conversations, activeConversation: conversations[0] || null, loading: false });
  },
  openConversation: async (id) => {
    const currentUserId = useAuthStore.getState().user?.id;
    const activeConversation = await chatService.getConversation(id, currentUserId);
    set({ activeConversation });
  },
  createConversation: async (payload) => {
    const currentUserId = useAuthStore.getState().user?.id;
    const conversation = await chatService.createConversation(payload, currentUserId);
    set((state) => ({
      activeConversation: conversation,
      conversations: state.conversations.some((item) => item.id === conversation.id)
        ? state.conversations.map((item) => (item.id === conversation.id ? conversation : item))
        : [conversation, ...state.conversations],
    }));
    return conversation;
  },
  sendMessage: async (id, text) => {
    const message = await chatService.sendMessage(id, text);
    set((state) => ({
      activeConversation: state.activeConversation?.id === id ? { ...state.activeConversation, messages: [...state.activeConversation.messages, message] } : state.activeConversation,
      conversations: state.conversations.map((item) => (item.id === id ? { ...item, messages: [...item.messages, message], lastMessage: message } : item)),
    }));
  },
}));
