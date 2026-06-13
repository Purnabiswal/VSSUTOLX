import { FaTrash } from 'react-icons/fa';
import ProductCard from './ProductCard';
import Button from './Button';
import { useWishlistStore } from '../store/wishlistStore';

export default function WishlistCard({ product }) {
  const toggle = useWishlistStore((state) => state.toggle);
  return (
    <div className="relative">
      <ProductCard product={product} />
      <Button className="absolute right-3 top-3" variant="danger" size="sm" onClick={() => toggle(product.id)} aria-label="Remove from wishlist">
        <FaTrash />
      </Button>
    </div>
  );
}
