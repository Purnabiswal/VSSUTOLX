import { FaTimes } from 'react-icons/fa';
import Button from './Button';

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4">
      <div className="w-full max-w-lg rounded-md bg-white shadow-soft">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-bold text-secondary">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close modal"><FaTimes /></Button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
