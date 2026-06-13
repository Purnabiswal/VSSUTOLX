import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useWishlistStore } from '../store/wishlistStore';
import { formatCurrency, timeAgo } from '../utils/formatters';
import Button from './Button';
import Badge from './Badge';

export default function ProductCard({ product }) {
  const ids = useWishlistStore((state) => state.ids);
  const toggle = useWishlistStore((state) => state.toggle);
  const wished = ids.includes(product.id);
  return (
    <article className="surface group overflow-hidden rounded-md transition hover:-translate-y-0.5 hover:shadow-soft">
      <Link to={`/products/${product.id}`} className="block aspect-[4/3] overflow-hidden bg-slate-100">
        <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy" />
      </Link>
      <div className="p-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <Link to={`/products/${product.id}`} className="line-clamp-2 font-bold text-secondary hover:text-primary">{product.title}</Link>
            <p className="mt-1 text-lg font-extrabold text-primary">{formatCurrency(product.price)}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => toggle(product.id)} aria-label="Toggle wishlist">
            {wished ? <FaHeart className="text-danger" /> : <FaRegHeart />}
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <Badge>{product.category}</Badge>
          <span>{product.seller.name}</span>
          <span>{timeAgo(product.postedAt)}</span>
        </div>
      </div>
    </article>
  );
}
