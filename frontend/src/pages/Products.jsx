import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEO } from '../components';
import { ProductCard } from '../components';
import { Pagination } from '../components';
import { EmptyState } from '../components';
import { Input } from '../components';
import { Select } from '../components';
import { Loader } from '../components';
import { categories, sortOptions } from '../utils';
import { useProductStore } from '../store';

function useDebouncedValue(value, delay = 350) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timer);
  }, [delay, value]);
  return debounced;
}

export default function Products() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');
  const [category, setCategory] = useState(params.get('category') || '');
  const [minPrice, setMinPrice] = useState(params.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(params.get('maxPrice') || '');
  const [sort, setSort] = useState(params.get('sort') || 'newest');
  const [page, setPage] = useState(Number(params.get('page')) || 1);
  const debouncedQuery = useDebouncedValue(query);
  const debouncedMinPrice = useDebouncedValue(minPrice);
  const debouncedMaxPrice = useDebouncedValue(maxPrice);
  const products = useProductStore((state) => state.products);
  const loading = useProductStore((state) => state.loading);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const pageSize = 6;
  const paged = useMemo(() => products.slice((page - 1) * pageSize, page * pageSize), [products, page]);

  useEffect(() => {
    fetchProducts({ query: debouncedQuery, category, sort, minPrice: debouncedMinPrice, maxPrice: debouncedMaxPrice, limit: 50 });
  }, [category, debouncedMaxPrice, debouncedMinPrice, debouncedQuery, fetchProducts, sort]);

  useEffect(() => {
    const next = {};
    if (debouncedQuery) next.q = debouncedQuery;
    if (category) next.category = category;
    if (debouncedMinPrice) next.minPrice = debouncedMinPrice;
    if (debouncedMaxPrice) next.maxPrice = debouncedMaxPrice;
    if (sort && sort !== 'newest') next.sort = sort;
    if (page > 1) next.page = String(page);
    setParams(next, { replace: true });
  }, [category, debouncedMaxPrice, debouncedMinPrice, debouncedQuery, page, setParams, sort]);

  useEffect(() => {
    setPage(1);
  }, [category, debouncedMaxPrice, debouncedMinPrice, debouncedQuery, sort]);

  return (
    <section className="container-page py-8">
      <SEO title="Products" />
      <div className="mb-6"><h1 className="text-3xl font-extrabold text-secondary">Products</h1><p className="text-slate-500">Filter, sort, and discover campus listings.</p></div>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="surface h-fit rounded-md p-4">
          <div className="grid gap-4">
            <Input label="Search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search listings" />
            <Select label="Category" value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="">All categories</option>
              {categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </Select>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Min price" type="number" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} />
              <Input label="Max price" type="number" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} />
            </div>
            <Select label="Sort" value={sort} onChange={(event) => setSort(event.target.value)}>
              {sortOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </Select>
          </div>
        </aside>
        <div>
          {loading ? <Loader /> : paged.length ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{paged.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <EmptyState title="No listings found" message="Try a different search or category." />}
          <Pagination page={page} totalPages={Math.ceil(products.length / pageSize)} onChange={setPage} />
        </div>
      </div>
    </section>
  );
}
