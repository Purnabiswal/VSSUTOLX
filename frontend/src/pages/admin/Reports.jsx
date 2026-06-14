import { useEffect, useState } from 'react';
import SEO from '../../components/SEO';
import Badge from '../../components/Badge';
import { adminService } from '../../services';

export default function Reports() {
  const [reports, setReports] = useState([]);
  useEffect(() => { adminService.getReports().then(setReports); }, []);
  return <div><SEO title="Reports" /><h1 className="mb-6 text-3xl font-extrabold text-secondary">Reports</h1><div className="surface rounded-md">{reports.map((report) => <div key={report.id} className="border-b border-slate-100 p-4 last:border-b-0"><div className="flex items-center justify-between gap-3"><h3 className="font-bold text-secondary">{report.reason}</h3><Badge tone="red">{report.status || 'open'}</Badge></div><p className="mt-1 text-sm text-slate-500">{report.product?.title || 'Removed product'}</p></div>)}</div></div>;
}
