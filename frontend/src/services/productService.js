import { mockDelay } from './api';
import { products } from '../data/mockData';

let productDb = [...products];

const filterProducts = (items, params = {}) => {
  let result = [...items];
  if (params.query) {
    const query = params.query.toLowerCase();
    result = result.filter((item) => `${item.title} ${item.description} ${item.location}`.toLowerCase().includes(query));
  }
  if (params.category) result = result.filter((item) => item.category === params.category);
  if (params.minPrice) result = result.filter((item) => item.price >= Number(params.minPrice));
  if (params.maxPrice) result = result.filter((item) => item.price <= Number(params.maxPrice));
  if (params.sort === 'price-low') result.sort((a, b) => a.price - b.price);
  if (params.sort === 'price-high') result.sort((a, b) => b.price - a.price);
  if (!params.sort || params.sort === 'newest') result.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
  return result;
};

export const productService = {
  getProducts: async (params) => mockDelay({ items: filterProducts(productDb, params), total: filterProducts(productDb, params).length }),
  getFeatured: async () => mockDelay(productDb.filter((item) => item.featured)),
  getLatest: async () => mockDelay([...productDb].sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt)).slice(0, 6)),
  getProductById: async (id) => mockDelay(productDb.find((item) => item.id === id)),
  getRelated: async (product) => mockDelay(productDb.filter((item) => item.category === product?.category && item.id !== product.id).slice(0, 4)),
  createProduct: async (payload) => {
    const product = {
      id: crypto.randomUUID(),
      postedAt: new Date().toISOString(),
      featured: false,
      condition: 'Good',
      images: payload.images?.length ? payload.images : ['https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=900&q=80'],
      seller: { id: 'me', name: 'You', avatar: 'https://i.pravatar.cc/120?img=5', rating: 5 },
      ...payload,
      price: Number(payload.price),
    };
    productDb = [product, ...productDb];
    return mockDelay(product);
  },
  updateProduct: async (id, payload) => {
    productDb = productDb.map((item) => (item.id === id ? { ...item, ...payload, price: Number(payload.price) } : item));
    return mockDelay(productDb.find((item) => item.id === id));
  },
  deleteProduct: async (id) => {
    productDb = productDb.filter((item) => item.id !== id);
    return mockDelay({ ok: true });
  },
};
