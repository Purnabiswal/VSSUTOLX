import api from './api';

export const contactService = {
  sendMessage: async (payload) => {
    const { data } = await api.post('/contact', payload);
    return data;
  },
};
