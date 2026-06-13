import SEO from '../../components/SEO';

export default function Analytics() {
  const bars = [{ label: 'Books', value: 70 }, { label: 'Electronics', value: 58 }, { label: 'Cycles', value: 36 }, { label: 'Furniture', value: 28 }];
  return <div><SEO title="Analytics" /><h1 className="mb-6 text-3xl font-extrabold text-secondary">Analytics</h1><div className="surface rounded-md p-6"><h2 className="font-bold text-secondary">Listing Distribution</h2><div className="mt-6 grid gap-4">{bars.map((bar) => <div key={bar.label}><div className="mb-1 flex justify-between text-sm font-semibold text-slate-600"><span>{bar.label}</span><span>{bar.value}%</span></div><div className="h-3 rounded bg-slate-100"><div className="h-3 rounded bg-primary" style={{ width: `${bar.value}%` }} /></div></div>)}</div></div></div>;
}
