import { useEffect } from 'react';
import { useProductStore } from '../store/productStore';

export function useProducts({ query = '', category = '', sort = 'newest', minPrice = '', maxPrice = '', page, limit = 50 } = {}) {
  const products = useProductStore((state) => state.products);
  const loading = useProductStore((state) => state.loading);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts({ query, category, sort, minPrice, maxPrice, page, limit });
  }, [fetchProducts, query, category, sort, minPrice, maxPrice, page, limit]);

  return { products, loading };
}
