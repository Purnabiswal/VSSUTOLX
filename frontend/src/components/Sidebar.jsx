import { NavLink } from 'react-router-dom';

export default function Sidebar({ items, title }) {
  return (
    <aside className="surface sticky top-24 h-fit rounded-md p-3">
      <p className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-400">{title}</p>
      <nav className="space-y-1">
        {items.map((item) => (
          <NavLink key={item.to} to={item.to} end className={({ isActive }) => `block rounded-md px-3 py-2 text-sm font-semibold ${isActive ? 'bg-blue-50 text-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-secondary'}`}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
