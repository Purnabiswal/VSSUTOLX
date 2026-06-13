import { useEffect, useState } from 'react';
import SEO from '../../components/SEO';
import { adminService } from '../../services/adminService';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  useEffect(() => { adminService.getDashboard().then(setData); }, []);
  const stats = data ? [
    ['Users', data.totalUsers],
    ['Listings', data.totalProducts],
    ['Active Listings', data.activeProducts],
    ['Reports', data.reportsCount],
  ] : [];

  return (
    <div>
      <SEO title="Admin Dashboard" />
      <h1 className="mb-6 text-3xl font-extrabold text-secondary">Admin Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(([label, value]) => <div key={label} className="surface rounded-md p-5"><p className="text-3xl font-extrabold text-secondary">{value}</p><p className="text-sm text-slate-500">{label}</p></div>)}</div>
      <div className="surface mt-6 rounded-md p-5">
        <h2 className="font-bold text-secondary">Monthly Listings</h2>
        <div className="mt-4 space-y-3">
          {data?.monthlyListings.map((item) => <div key={`${item._id.year}-${item._id.month}`}><div className="mb-1 flex justify-between text-sm"><span>{item._id.month}/{item._id.year}</span><span>{item.count}</span></div><div className="h-2 rounded bg-slate-100"><div className="h-2 rounded bg-primary" style={{ width: `${Math.min(item.count * 10, 100)}%` }} /></div></div>)}
        </div>
      </div>
    </div>
  );
}
