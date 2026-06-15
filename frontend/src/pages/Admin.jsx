import { useEffect, useState } from 'react';
import { Avatar, Badge, SEO } from '../components';
import { adminService } from '../services';
import { formatCurrency } from '../utils';

export function AdminDashboard() {
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

export function ManageUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => { adminService.getUsers().then(setUsers); }, []);
  return <div><SEO title="Manage Users" /><h1 className="mb-6 text-3xl font-extrabold text-secondary">Manage Users</h1><div className="surface rounded-md">{users.map((user) => <div key={user.id} className="flex items-center gap-4 border-b border-slate-100 p-4 last:border-b-0"><Avatar src={user.avatar} name={user.name} /><div className="flex-1"><p className="font-bold text-secondary">{user.name}</p><p className="text-sm text-slate-500">{user.email}</p></div><Badge tone={user.role === 'admin' ? 'blue' : 'slate'}>{user.role}</Badge></div>)}</div></div>;
}

export function ManageListings() {
  const [listings, setListings] = useState([]);
  useEffect(() => { adminService.getListings().then(setListings); }, []);
  return <div><SEO title="Manage Listings" /><h1 className="mb-6 text-3xl font-extrabold text-secondary">Manage Listings</h1><div className="surface rounded-md">{listings.map((item) => <div key={item.id} className="grid gap-4 border-b border-slate-100 p-4 last:border-b-0 md:grid-cols-[80px_1fr_auto] md:items-center"><img src={item.images[0]} alt={item.title} className="h-20 w-20 rounded-md object-cover" /><div><p className="font-bold text-secondary">{item.title}</p><p className="text-sm text-slate-500">{item.seller?.name || 'VSSUT seller'} · {formatCurrency(item.price)}</p></div><Badge tone={item.status === 'sold' ? 'slate' : 'green'}>{item.status}</Badge></div>)}</div></div>;
}

export function Reports() {
  const [reports, setReports] = useState([]);
  useEffect(() => { adminService.getReports().then(setReports); }, []);
  return <div><SEO title="Reports" /><h1 className="mb-6 text-3xl font-extrabold text-secondary">Reports</h1><div className="surface rounded-md">{reports.map((report) => <div key={report.id} className="border-b border-slate-100 p-4 last:border-b-0"><div className="flex items-center justify-between gap-3"><h3 className="font-bold text-secondary">{report.reason}</h3><Badge tone="red">{report.status || 'open'}</Badge></div><p className="mt-1 text-sm text-slate-500">{report.product?.title || 'Removed product'}</p></div>)}</div></div>;
}

export function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  useEffect(() => { adminService.getDashboard().then(setAnalytics); }, []);
  const bars = analytics?.monthlyRegistrations || [];

  return (
    <div>
      <SEO title="Analytics" />
      <h1 className="mb-6 text-3xl font-extrabold text-secondary">Analytics</h1>
      <div className="surface rounded-md p-6">
        <h2 className="font-bold text-secondary">Monthly Registrations</h2>
        <div className="mt-6 grid gap-4">{bars.map((bar) => <div key={`${bar._id.year}-${bar._id.month}`}><div className="mb-1 flex justify-between text-sm font-semibold text-slate-600"><span>{bar._id.month}/{bar._id.year}</span><span>{bar.count}</span></div><div className="h-3 rounded bg-slate-100"><div className="h-3 rounded bg-primary" style={{ width: `${Math.min(bar.count * 10, 100)}%` }} /></div></div>)}</div>
      </div>
    </div>
  );
}
