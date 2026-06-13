import api from './api';
import { normalizeProduct } from './productService';

export const normalizeUser = (user) => {
  if (!user) return user;
  return {
    ...user,
    id: user._id || user.id,
    avatar: user.profileImage?.url || user.avatar,
  };
};

export const userService = {
  getSeller: async (id) => {
    const { data } = await api.get(`/users/${id}`);
    return normalizeUser(data.user);
  },
  getSellerListings: async (sellerId) => {
    const { data } = await api.get('/products', { params: { limit: 50 } });
    return data.products.map(normalizeProduct).filter((item) => item.seller?.id === sellerId);
  },
  updateProfile: async (payload) => {
    const body = {
      name: payload.name,
      branch: payload.branch,
      year: payload.year ? Number(payload.year) : undefined,
    };
    const { data } = await api.put('/users/profile', body);
    return normalizeUser(data.user);
  },
};
