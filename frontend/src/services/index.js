import api, { TOKEN_STORAGE_KEY } from './api';

const fallbackImage = '/images/product-placeholder.jpg';

const storeTokens = (data) => {
  if (data.accessToken) localStorage.setItem(TOKEN_STORAGE_KEY, data.accessToken);
  if (data.refreshToken) localStorage.setItem(`${TOKEN_STORAGE_KEY}_refresh`, data.refreshToken);
};

const clearTokens = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(`${TOKEN_STORAGE_KEY}_refresh`);
};

const imageUrl = (image) => (typeof image === 'string' ? image : image?.url);

export const normalizeUser = (user) => {
  if (!user) return user;
  return {
    ...user,
    id: user._id || user.id,
    avatar: user.profileImage?.url || user.avatar,
  };
};

export const normalizeProduct = (product) => {
  if (!product) return product;
  return {
    ...product,
    id: product._id || product.id,
    postedAt: product.createdAt || product.postedAt,
    images: product.images?.length ? product.images.map(imageUrl).filter(Boolean) : [fallbackImage],
    seller: product.seller ? normalizeUser(product.seller) : { name: 'VSSUT seller' },
  };
};

const normalizeNotification = (notification) => ({
  ...notification,
  id: notification._id || notification.id,
  title: notification.type || 'Notification',
  body: notification.message || notification.body,
});

const toProductParams = (params = {}) => ({
  keyword: params.query || undefined,
  category: params.category || undefined,
  minPrice: params.minPrice || undefined,
  maxPrice: params.maxPrice || undefined,
  sort: params.sort || undefined,
  page: params.page || undefined,
  limit: params.limit || undefined,
});

const toFormData = (payload) => {
  const formData = new globalThis.FormData();
  ['title', 'description', 'price', 'category', 'location'].forEach((field) => {
    if (payload[field] !== undefined && payload[field] !== '') formData.append(field, payload[field]);
  });
  payload.images?.forEach((image) => {
    if (image instanceof globalThis.File) formData.append('images', image);
  });
  return formData;
};

const hasFileImages = (payload) => payload.images?.some((image) => image instanceof globalThis.File);

export const authService = {
  register: async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    storeTokens(data);
    return data;
  },
  login: async (payload) => {
    const { data } = await api.post('/auth/login', payload);
    storeTokens(data);
    return data;
  },
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      clearTokens();
    }
  },
  me: async () => {
    const { data } = await api.get('/auth/me');
    return data;
  },
  forgotPassword: async (email) => {
    const { data } = await api.post('/auth/forgot-password', { email });
    return data;
  },
  resetPassword: async (payload) => {
    const { data } = await api.post('/auth/reset-password', payload);
    storeTokens(data);
    return data;
  },
};

export const productService = {
  getProducts: async (params) => {
    const { data } = await api.get('/products', { params: toProductParams(params) });
    const items = data.products.map(normalizeProduct);
    return { items, total: data.meta.total, meta: data.meta };
  },
  getFeatured: async () => {
    const { items } = await productService.getProducts({ sort: 'popular', limit: 4 });
    return items;
  },
  getLatest: async () => {
    const { items } = await productService.getProducts({ sort: 'newest', limit: 8 });
    return items;
  },
  getProductById: async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return normalizeProduct(data.product);
  },
  getRelated: async (product) => {
    if (!product?.category) return [];
    const { items } = await productService.getProducts({ category: product.category, limit: 4 });
    return items.filter((item) => item.id !== product.id).slice(0, 4);
  },
  createProduct: async (payload) => {
    const body = hasFileImages(payload) ? toFormData(payload) : payload;
    const { data } = await api.post('/products', body);
    return normalizeProduct(data.product);
  },
  updateProduct: async (id, payload) => {
    const body = hasFileImages(payload) ? toFormData(payload) : payload;
    const { data } = await api.put(`/products/${id}`, body);
    return normalizeProduct(data.product);
  },
  deleteProduct: async (id) => {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  },
  markSold: async (id) => {
    const { data } = await api.patch(`/products/${id}/sold`);
    return normalizeProduct(data.product);
  },
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
      whatsappNumber: payload.whatsappNumber?.trim() || '',
      phoneNumber: payload.phoneNumber?.trim() || '',
    };
    const { data } = await api.put('/users/profile', body);
    return normalizeUser(data.user);
  },
};

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

export const notificationService = {
  getNotifications: async () => {
    const { data } = await api.get('/notifications');
    return data.notifications.map(normalizeNotification);
  },
  markAllRead: async () => {
    const { data } = await api.patch('/notifications/read');
    return data.notifications.map(normalizeNotification);
  },
  normalize: normalizeNotification,
};

export const contactService = {
  sendMessage: async (payload) => {
    const { data } = await api.post('/contact', payload);
    return data;
  },
};

export const reportService = {
  createReport: async ({ product, reason }) => {
    const { data } = await api.post('/reports', { product, reason });
    return data.report;
  },
};

export const adminService = {
  getDashboard: async () => {
    const { data } = await api.get('/admin/analytics');
    return data.analytics;
  },
  getUsers: async () => {
    const { data } = await api.get('/admin/users');
    return data.users.map(normalizeUser);
  },
  getListings: async () => {
    const { data } = await api.get('/admin/products');
    return data.products.map(normalizeProduct);
  },
  getReports: async () => {
    const { data } = await api.get('/admin/reports');
    return data.reports.map((report) => ({ ...report, id: report._id || report.id }));
  },
  banUser: async (id) => {
    const { data } = await api.patch(`/admin/users/${id}/ban`);
    return normalizeUser(data.user);
  },
  deleteListing: async (id) => {
    const { data } = await api.delete(`/admin/products/${id}`);
    return data;
  },
};
