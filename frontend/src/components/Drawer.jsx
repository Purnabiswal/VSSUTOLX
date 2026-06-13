import { FaTimes } from 'react-icons/fa';
import Button from './Button';

export default function Drawer({ open, children, onClose }) {
  return (
    <div className={`fixed inset-0 z-40 transition ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-slate-950/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <aside className={`absolute right-0 top-0 h-full w-80 max-w-[86vw] bg-white p-4 shadow-soft transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="mb-4 flex justify-end">
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close menu"><FaTimes /></Button>
        </div>
        {children}
      </aside>
    </div>
  );
}
