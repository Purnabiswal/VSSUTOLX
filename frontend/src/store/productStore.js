import { create } from 'zustand';
import { productService } from '../services/productService';

export const useProductStore = create((set) => ({
  products: [],
  featured: [],
  latest: [],
  currentProduct: null,
  related: [],
  loading: false,
  fetchProducts: async (params) => {
    set({ loading: true });
    const data = await productService.getProducts(params);
    set({ products: data.items, loading: false });
    return data;
  },
  fetchHome: async () => {
    set({ loading: true });
    const [featured, latest] = await Promise.all([productService.getFeatured(), productService.getLatest()]);
    set({ featured, latest, loading: false });
  },
  fetchProduct: async (id) => {
    set({ loading: true });
    const product = await productService.getProductById(id);
    const related = await productService.getRelated(product);
    set({ currentProduct: product, related, loading: false });
    return product;
  },
  createProduct: productService.createProduct,
  updateProduct: productService.updateProduct,
}));
