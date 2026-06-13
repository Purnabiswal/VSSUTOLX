import { FaBoxOpen } from 'react-icons/fa';
import Button from './Button';

export default function EmptyState({ title = 'Nothing here yet', message = 'Try adjusting filters or creating something new.', action, to }) {
  return (
    <div className="surface rounded-md px-6 py-12 text-center">
      <FaBoxOpen className="mx-auto mb-3 text-4xl text-slate-300" />
      <h3 className="text-lg font-bold text-secondary">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">{message}</p>
      {action && <Button to={to} className="mt-5">{action}</Button>}
    </div>
  );
}
