import { create } from 'zustand';
import { productService } from '../services';

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
