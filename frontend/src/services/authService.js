import { mockDelay } from './api';
import { users } from '../data/mockData';

export const authService = {
  login: async ({ email }) => {
    const user = users.find((item) => item.email === email) || users[0];
    localStorage.setItem('vssut_olx_token', 'mock-vssut-token');
    return mockDelay({ user, token: 'mock-vssut-token' });
  },
  register: async (payload) => {
    const user = { id: crypto.randomUUID(), role: 'user', avatar: 'https://i.pravatar.cc/120?img=5', ...payload };
    localStorage.setItem('vssut_olx_token', 'mock-vssut-token');
    return mockDelay({ user, token: 'mock-vssut-token' });
  },
  forgotPassword: async (email) => mockDelay({ ok: true, message: `Reset link sent to ${email}` }),
  logout: async () => {
    localStorage.removeItem('vssut_olx_token');
    return mockDelay({ ok: true });
  },
  me: async () => mockDelay({ user: users[0] }),
};
