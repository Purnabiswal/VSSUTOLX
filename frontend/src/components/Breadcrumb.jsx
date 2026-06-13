import { Link } from 'react-router-dom';

export default function Breadcrumb({ items }) {
  return (
    <nav className="mb-5 text-sm text-slate-500">
      {items.map((item, index) => (
        <span key={item.label}>
          {item.to ? <Link className="hover:text-primary" to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
          {index < items.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </nav>
  );
}
