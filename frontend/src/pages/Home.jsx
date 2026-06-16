import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components';
import { ProductCard } from '../components';
import { Button } from '../components';
import { categories } from '../utils';
import { useProductStore } from '../store';
import { FaBars } from "react-icons/fa";

export default function Home() {
  const { featured, latest, fetchHome } = useProductStore();
  useEffect(() => {
    fetchHome();
  }, [fetchHome]);

  return (
    <>
      <SEO title="Campus Marketplace" />



      <section className="border-y bg-white">
        <div className="w-full px-6 lg:px-10">
          <div className="flex flex-wrap justify-center items-center gap-3 py-3">

            <Link
              to="/products"
              className="flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white"
            >
              <FaBars />
              ALL CATEGORIES
            </Link>

            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${encodeURIComponent(category.id)}`}
                className="shrink-0 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm text-slate-700 transition hover:bg-slate-100"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>



      <section className="w-full flex justify-center py-8 ">
        <div
          className="relative w-[90%] h-[450px] rounded-[40px] overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/vssut-olx-banner.png')",
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/45"></div>

          {/* Content */}
          <div className="relative z-10 flex items-center h-full px-10 md:px-16">
            <div className="max-w-2xl text-white">
              {/* Logo Badge */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl border border-white flex items-center justify-center bg-white/10 backdrop-blur-sm">
                  <span className="font-bold text-xl">V</span>
                </div>

                <span className="text-3xl font-bold tracking-wide">
                  VSSUT OLX
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
                Buy, Sell & Exchange
                <br />
                Within VSSUT Campus
              </h1>

              <p className="text-lg md:text-xl text-gray-200 mb-8">
                Discover great deals from students. Trade books, gadgets,
                furniture, cycles, electronics and more.
              </p>

              <div className="flex gap-4 flex-wrap">
                <Link
                  to="/products"
                  className="px-7 py-3 bg-primary hover:opacity-90 text-white rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Browse Listings
                </Link>

                <Link
                  to="/dashboard/listings/new"
                  className="px-6 py-3 border border-white rounded-xl font-semibold hover:bg-white hover:text-black transition"
                >
                  Post an Item
                </Link>
              </div>
            </div>
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
            <img src="" alt="Campus marketplace" className="h-full min-h-80 w-full object-cover" />
          </div>
        </div>
      </section> */}




      {/* <section className="container-page py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-secondary">
              Featured Listings
            </h2>
            <p className="text-sm text-slate-500">
              Popular deals picked for campus buyers.
            </p>
          </div>

          <Button to="/products" variant="outline">
            View all
          </Button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
 */}






      <section className="container-page py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div><h2 className="text-2xl font-extrabold text-secondary">Featured Listings</h2><p className="text-sm text-slate-500">Popular deals picked for campus buyers.</p></div>
          <Button to="/products" variant="outline">View all</Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{featured.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>





      <section className="container-page py-8">
        <h2 className="mb-6 text-2xl font-extrabold text-secondary">Latest Listings</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{latest.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>
      {/* <section className="container-page py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {['Sold my cycle in one evening.', 'Found semester books at half price.', 'WhatsApp made pickup coordination simple.'].map((quote, index) => (
            <blockquote key={quote} className="surface rounded-md p-6 text-slate-600">"{quote}"<footer className="mt-4 font-bold text-secondary">Student {index + 1}</footer></blockquote>
          ))}
        </div>
      </section> */}
    </>
  );
}
