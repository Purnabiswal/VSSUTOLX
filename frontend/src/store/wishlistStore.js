import { create } from 'zustand';
import { wishlistService } from '../services/wishlistService';

export const useWishlistStore = create((set, get) => ({
  items: [],
  ids: [],
  fetchWishlist: async () => {
    const items = await wishlistService.getWishlist();
    set({ items, ids: items.map((item) => item.id) });
  },
  toggle: async (productId) => {
    await wishlistService.toggleWishlist(productId);
    const ids = get().ids.includes(productId) ? get().ids.filter((id) => id !== productId) : [...get().ids, productId];
    set({ ids });
  },
}));
