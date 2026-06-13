export default function Badge({ children, tone = 'slate' }) {
  const tones = {
    slate: 'bg-slate-100 text-slate-700',
    blue: 'bg-blue-50 text-primary',
    green: 'bg-green-50 text-success',
    red: 'bg-red-50 text-danger',
  };
  return <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}
