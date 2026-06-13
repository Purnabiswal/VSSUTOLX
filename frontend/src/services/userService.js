import { mockDelay } from './api';
import { products, users } from '../data/mockData';

export const userService = {
  getSeller: async (id) => mockDelay(users.find((item) => item.id === id)),
  getSellerListings: async (sellerId) => mockDelay(products.filter((item) => item.seller.id === sellerId)),
  updateProfile: async (payload) => mockDelay({ ...users[0], ...payload }),
};
