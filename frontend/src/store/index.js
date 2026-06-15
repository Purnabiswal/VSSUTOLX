import { create } from 'zustand';
import { authService, notificationService, productService, wishlistService } from '../services';
import { TOKEN_STORAGE_KEY } from '../services/api';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem(TOKEN_STORAGE_KEY),
  loading: false,
  error: null,
  login: async (payload) => {
    set({ loading: true, error: null });
    try {
      const data = await authService.login(payload);
      set({ user: data.user, token: data.accessToken, loading: false });
      return data.user;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  register: async (payload) => {
    set({ loading: true, error: null });
    try {
      const normalized = { ...payload, year: payload.year ? Number(payload.year) : undefined };
      const data = await authService.register(normalized);
      set({ user: data.user, token: data.accessToken, loading: false });
      return data.user;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  logout: async () => {
    await authService.logout();
    set({ user: null, token: null });
  },
  hydrateCurrentUser: async () => {
    if (!localStorage.getItem(TOKEN_STORAGE_KEY)) return null;
    try {
      const data = await authService.me();
      set({ user: data.user });
      return data.user;
    } catch {
      set({ user: null, token: null });
      return null;
    }
  },
  hydrate: async () => useAuthStore.getState().hydrateCurrentUser(),
}));

export const useProductStore = create((set) => ({
  products: [],
  meta: null,
  featured: [],
  latest: [],
  currentProduct: null,
  related: [],
  loading: false,
  error: null,
  fetchProducts: async (params) => {
    set({ loading: true, error: null });
    try {
      const data = await productService.getProducts(params);
      set({ products: data.items, meta: data.meta, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  fetchHome: async () => {
    set({ loading: true, error: null });
    try {
      const [featured, latest] = await Promise.all([productService.getFeatured(), productService.getLatest()]);
      set({ featured, latest, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  fetchProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      const product = await productService.getProductById(id);
      const related = await productService.getRelated(product);
      set({ currentProduct: product, related, loading: false });
      return product;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  createProduct: productService.createProduct,
  updateProduct: productService.updateProduct,
  deleteProduct: productService.deleteProduct,
  markSold: productService.markSold,
}));

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

export const useNotificationStore = create((set) => ({
  notifications: [],
  toast: null,
  unreadCount: 0,
  pushToast: (toast) => {
    set({ toast });
    window.setTimeout(() => set({ toast: null }), 3200);
  },
  pushError: (error) => {
    set({ toast: { message: error?.message || 'Something went wrong', tone: 'danger' } });
    window.setTimeout(() => set({ toast: null }), 3200);
  },
  fetchNotifications: async () => {
    const notifications = await notificationService.getNotifications();
    set({
      notifications,
      unreadCount: notifications.filter((item) => !item.read).length,
    });
    return notifications;
  },
  addNotification: (notification) => set((state) => ({
    notifications: [notificationService.normalize(notification), ...state.notifications],
    unreadCount: state.unreadCount + (notification.read ? 0 : 1),
  })),
  markAllRead: async () => {
    const notifications = await notificationService.markAllRead();
    set({ notifications, unreadCount: 0 });
    return notifications;
  },
}));
