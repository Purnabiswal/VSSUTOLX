import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import Input from '../components/Input';
import Select from '../components/Select';
import Loader from '../components/Loader';
import { categories, sortOptions } from '../constants/categories';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';

export default function Products() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');
  const [category, setCategory] = useState(params.get('category') || '');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebounce(query);
  const debouncedMinPrice = useDebounce(minPrice);
  const debouncedMaxPrice = useDebounce(maxPrice);
  const { products, loading } = useProducts({ query: debouncedQuery, category, sort, minPrice: debouncedMinPrice, maxPrice: debouncedMaxPrice });
  const pageSize = 6;
  const paged = useMemo(() => products.slice((page - 1) * pageSize, page * pageSize), [products, page]);

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
