import { Link } from 'react-router-dom';

export default function CategoryCard({ category }) {
  const Icon = category.icon;
  return (
    <Link to={`/products?category=${category.id}`} className="surface flex items-center gap-4 rounded-md p-4 transition hover:-translate-y-0.5 hover:shadow-soft">
      <span className={`grid h-12 w-12 place-items-center rounded-md text-xl ${category.color}`}><Icon /></span>
      <span className="font-bold text-secondary">{category.name}</span>
    </Link>
  );
}
