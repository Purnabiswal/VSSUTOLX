import { useEffect } from 'react';
import { FaShieldAlt, FaUsers, FaTags } from 'react-icons/fa';
import SEO from '../components/SEO';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import Button from '../components/Button';
import { categories } from '../constants/categories';
import { useProductStore } from '../store/productStore';
import { useWishlistStore } from '../store/wishlistStore';
import { FaBars } from "react-icons/fa";

export default function Home() {
  const { featured, latest, fetchHome } = useProductStore();
  const fetchWishlist = useWishlistStore((state) => state.fetchWishlist);
  useEffect(() => {
    fetchHome();
    fetchWishlist();
  }, [fetchHome, fetchWishlist]);

  return (
    <>
      <SEO title="Campus Marketplace" />



      <section className="border-y bg-white">
        <div className="container-page">
          <div className="flex items-center gap-3 overflow-x-auto py-3 scrollbar-hide">

            <button
              className="flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white"
            >
              <FaBars />
              ALL CATEGORIES
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                className="shrink-0 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm text-slate-700 transition hover:bg-slate-100"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>





      {/* <section className="bg-secondary text-white">
        <div className="container-page grid min-h-[520px] items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-3 font-semibold text-blue-200">Trusted buying and selling for VSSUT students</p>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">VSSUT OLX</h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-200">Find books, cycles, calculators, furniture, hostel essentials, and deals posted by people around campus.</p>
            <div className="mt-8 max-w-2xl"><SearchBar /></div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/products">Browse Listings</Button>
              <Button to="/dashboard/listings/new" variant="outline">Sell an Item</Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-md shadow-soft">
            <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80" alt="Campus marketplace" className="h-full min-h-80 w-full object-cover" />
          </div>
        </div>
      </section> */}
      <section className="container-page py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div><h2 className="text-2xl font-extrabold text-secondary">Featured Listings</h2><p className="text-sm text-slate-500">Popular deals picked for campus buyers.</p></div>
          <Button to="/products" variant="outline">View all</Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{featured.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>
      {/* <section className="container-page py-8">
        <h2 className="mb-6 text-2xl font-extrabold text-secondary">Categories</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{categories.map((category) => <CategoryCard key={category.id} category={category} />)}</div>
      </section> */}
      {/* <section className="container-page py-10">
        <div className="grid gap-4 md:grid-cols-3">
          {[['Active students', '2,400+', <FaUsers key="users" className="text-2xl text-primary" />], ['Verified listings', '980+', <FaShieldAlt key="shield" className="text-2xl text-primary" />], ['Average deal value', '₹1,250', <FaTags key="tags" className="text-2xl text-primary" />]].map(([label, value, icon]) => (
            <div key={label} className="surface rounded-md p-6">{icon}<p className="mt-4 text-3xl font-extrabold text-secondary">{value}</p><p className="text-sm text-slate-500">{label}</p></div>
          ))}
        </div>
      </section> */}
      <section className="container-page py-8">
        <h2 className="mb-6 text-2xl font-extrabold text-secondary">Latest Listings</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{latest.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>
      <section className="container-page py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {['Sold my cycle in one evening.', 'Found semester books at half price.', 'The chat made pickup coordination simple.'].map((quote, index) => (
            <blockquote key={quote} className="surface rounded-md p-6 text-slate-600">"{quote}"<footer className="mt-4 font-bold text-secondary">Student {index + 1}</footer></blockquote>
          ))}
        </div>
      </section>
    </>
  );
}
