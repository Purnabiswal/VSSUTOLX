import { useEffect } from 'react';
import { useProductStore } from '../store/productStore';

export function useProducts({ query = '', category = '', sort = 'newest', minPrice = '', maxPrice = '' } = {}) {
  const products = useProductStore((state) => state.products);
  const loading = useProductStore((state) => state.loading);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts({ query, category, sort, minPrice, maxPrice });
  }, [fetchProducts, query, category, sort, minPrice, maxPrice]);

  return { products, loading };
}
