import { useEffect, useState } from 'react';
import SEO from '../../components/SEO';
import { adminService } from '../../services/adminService';

export default function Analytics() {
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
