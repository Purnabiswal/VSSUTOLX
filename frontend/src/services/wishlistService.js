import { mockDelay } from './api';
import { products } from '../data/mockData';

let ids = ['p1', 'p3'];

export const wishlistService = {
  getWishlist: async () => mockDelay(products.filter((product) => ids.includes(product.id))),
  toggleWishlist: async (productId) => {
    ids = ids.includes(productId) ? ids.filter((id) => id !== productId) : [...ids, productId];
    return mockDelay({ ids });
  },
};
