import api from './api';
import { normalizeProduct } from './productService';

export const wishlistService = {
  getWishlist: async () => {
    const { data } = await api.get('/wishlist');
    return data.wishlist.map(normalizeProduct);
  },
  addToWishlist: async (productId) => {
    const { data } = await api.post(`/wishlist/${productId}`);
    return data.wishlist.map((id) => id.toString());
  },
  removeFromWishlist: async (productId) => {
    const { data } = await api.delete(`/wishlist/${productId}`);
    return data.wishlist.map((id) => id.toString());
  },
};
