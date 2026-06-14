import { useEffect, useState } from 'react';
import SEO from '../../components/SEO';
import Badge from '../../components/Badge';
import { adminService } from '../../services';
import { formatCurrency } from '../../utils/formatters';

export default function ManageListings() {
  const [listings, setListings] = useState([]);
  useEffect(() => { adminService.getListings().then(setListings); }, []);
  return <div><SEO title="Manage Listings" /><h1 className="mb-6 text-3xl font-extrabold text-secondary">Manage Listings</h1><div className="surface rounded-md">{listings.map((item) => <div key={item.id} className="grid gap-4 border-b border-slate-100 p-4 last:border-b-0 md:grid-cols-[80px_1fr_auto] md:items-center"><img src={item.images[0]} alt={item.title} className="h-20 w-20 rounded-md object-cover" /><div><p className="font-bold text-secondary">{item.title}</p><p className="text-sm text-slate-500">{item.seller?.name || 'VSSUT seller'} · {formatCurrency(item.price)}</p></div><Badge tone={item.status === 'sold' ? 'slate' : 'green'}>{item.status}</Badge></div>)}</div></div>;
}
