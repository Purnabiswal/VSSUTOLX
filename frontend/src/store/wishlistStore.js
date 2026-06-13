import { create } from 'zustand';
import { wishlistService } from '../services/wishlistService';

export const useWishlistStore = create((set, get) => ({
  items: [],
  ids: [],
  loading: false,
  fetchWishlist: async () => {
    set({ loading: true });
    try {
      const items = await wishlistService.getWishlist();
      set({ items, ids: items.map((item) => item.id), loading: false });
      return items;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  toggle: async (productId) => {
    const exists = get().ids.includes(productId);
    const ids = exists ? await wishlistService.removeFromWishlist(productId) : await wishlistService.addToWishlist(productId);
    set((state) => ({
      ids,
      items: exists ? state.items.filter((item) => item.id !== productId) : state.items,
    }));
    return { added: !exists, ids };
  },
}));
