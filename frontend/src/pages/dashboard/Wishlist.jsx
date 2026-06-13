import { useEffect } from 'react';
import SEO from '../../components/SEO';
import WishlistCard from '../../components/WishlistCard';
import EmptyState from '../../components/EmptyState';
import { useWishlistStore } from '../../store/wishlistStore';

export default function Wishlist() {
  const { items, fetchWishlist } = useWishlistStore();
  useEffect(() => { fetchWishlist(); }, [fetchWishlist]);
  return (
    <div>
      <SEO title="Wishlist" />
      <h1 className="mb-6 text-3xl font-extrabold text-secondary">Wishlist</h1>
      {items.length ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{items.map((product) => <WishlistCard key={product.id} product={product} />)}</div> : <EmptyState title="Wishlist is empty" action="Browse Products" to="/products" />}
    </div>
  );
}
