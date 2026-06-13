import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaFlag, FaHeart, FaShareAlt } from 'react-icons/fa';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import Button from '../components/Button';
import ImageCarousel from '../components/ImageCarousel';
import ProductCard from '../components/ProductCard';
import ProfileCard from '../components/ProfileCard';
import Loader from '../components/Loader';
import { useProductStore } from '../store/productStore';
import { useWishlistStore } from '../store/wishlistStore';
import { formatCurrency, formatDate } from '../utils/formatters';

export default function ProductDetails() {
  const { id } = useParams();
  const { currentProduct, related, loading, fetchProduct } = useProductStore();
  const toggle = useWishlistStore((state) => state.toggle);
  useEffect(() => { fetchProduct(id); }, [fetchProduct, id]);
  if (loading || !currentProduct) return <Loader />;
  return (
    <section className="container-page py-8">
      <SEO title={currentProduct.title} description={currentProduct.description} image={currentProduct.images[0]} />
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Products', to: '/products' }, { label: currentProduct.title }]} />
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div><ImageCarousel images={currentProduct.images} /></div>
        <aside className="space-y-5">
          <div className="surface rounded-md p-5">
            <p className="text-sm font-semibold uppercase text-primary">{currentProduct.category}</p>
            <h1 className="mt-2 text-3xl font-extrabold text-secondary">{currentProduct.title}</h1>
            <p className="mt-2 text-3xl font-extrabold text-primary">{formatCurrency(currentProduct.price)}</p>
            <p className="mt-4 text-sm text-slate-500">{currentProduct.location} · Posted {formatDate(currentProduct.postedAt)} · {currentProduct.status}</p>
            <p className="mt-5 text-slate-600">{currentProduct.description}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button onClick={() => toggle(currentProduct.id)}><FaHeart /> Wishlist</Button>
              <Button to="/dashboard/messages" variant="secondary">Chat Seller</Button>
              <Button variant="outline"><FaShareAlt /> Share</Button>
              <Button variant="outline"><FaFlag /> Report</Button>
            </div>
          </div>
          <ProfileCard user={currentProduct.seller} action="Seller Profile" />
        </aside>
      </div>
      <div className="mt-12">
        <h2 className="mb-5 text-2xl font-extrabold text-secondary">Related Products</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{related.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </div>
    </section>
  );
}
