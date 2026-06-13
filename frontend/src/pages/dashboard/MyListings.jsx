import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import Loader from '../../components/Loader';
import { productService } from '../../services/productService';
import { useAuthStore } from '../../store/authStore';
import { formatCurrency } from '../../utils/formatters';

export default function MyListings() {
  const user = useAuthStore((state) => state.user);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getProducts({ limit: 50 }).then((data) => {
      setProducts(data.items.filter((product) => product.seller?.id === user?.id));
      setLoading(false);
    });
  }, [user?.id]);

  return (
    <div>
      <SEO title="My Listings" />
      <div className="mb-6 flex items-center justify-between"><h1 className="text-3xl font-extrabold text-secondary">My Listings</h1><Button to="/dashboard/listings/new">New Listing</Button></div>
      <div className="surface overflow-hidden rounded-md">
        {loading ? <Loader /> : products.map((product) => (
          <div key={product.id} className="grid gap-4 border-b border-slate-100 p-4 last:border-b-0 md:grid-cols-[80px_1fr_auto] md:items-center">
            <img src={product.images[0]} alt={product.title} className="h-20 w-20 rounded-md object-cover" />
            <div><Link to={`/products/${product.id}`} className="font-bold text-secondary hover:text-primary">{product.title}</Link><p className="text-sm text-slate-500">{formatCurrency(product.price)} · {product.location}</p></div>
            <div className="flex items-center gap-2"><Badge tone={product.status === 'sold' ? 'slate' : 'green'}>{product.status}</Badge><Button to={`/dashboard/listings/${product.id}/edit`} variant="outline" size="sm">Edit</Button></div>
          </div>
        ))}
      </div>
    </div>
  );
}
