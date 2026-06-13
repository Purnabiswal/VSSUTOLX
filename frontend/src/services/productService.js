import api from './api';

const fallbackImage = 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=900&q=80';

const imageUrl = (image) => (typeof image === 'string' ? image : image?.url);

export const normalizeProduct = (product) => {
  if (!product) return product;
  return {
    ...product,
    id: product._id || product.id,
    postedAt: product.createdAt || product.postedAt,
    images: product.images?.length ? product.images.map(imageUrl).filter(Boolean) : [fallbackImage],
    seller: product.seller
      ? {
          ...product.seller,
          id: product.seller._id || product.seller.id,
          avatar: product.seller.profileImage?.url || product.seller.avatar,
        }
      : { name: 'VSSUT seller' },
  };
};

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
