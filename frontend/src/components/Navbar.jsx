import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaBell, FaPlus, FaUserCircle } from 'react-icons/fa';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';
import Button from './Button';
import Drawer from './Drawer';
import SearchBar from './SearchBar';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const hydrate = useAuthStore((state) => state.hydrate);
  const unreadCount = useNotificationStore((state) => state.unreadCount);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center gap-4 px-6 lg:px-10">
        <Link to="/" className="shrink-0 text-xl font-extrabold text-primary">VSSUT OLX</Link>
        <div className="hidden flex-1 justify-center lg:flex"><SearchBar compact /></div>
        <div className="ml-auto hidden items-center gap-2 md:flex">
          <Button to="/dashboard/listings/new" size="sm"><FaPlus /> SELL</Button>
          {user ? (
            <>
              <Button to="/dashboard/notifications" variant="ghost" size="sm" aria-label="Notifications"><FaBell />{unreadCount > 0 && <span className="text-xs text-danger">{unreadCount}</span>}</Button>
              <Button to="/dashboard" variant="outline" size="sm"><FaUserCircle /> Profile</Button>
            </>
          ) : (
            <>
              <Button to="/login" variant="ghost" size="sm">Login</Button>
              <Button to="/register" size="sm">Register</Button>
            </>
          )}
        </div>
        <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><FaBars /></Button>
      </div>
      {open && (
        <Drawer open={open} onClose={() => setOpen(false)}>
          <div className="grid gap-4">
            <SearchBar compact />
            <Button to="/dashboard/listings/new" onClick={() => setOpen(false)}><FaPlus /> SELL</Button>
            {user ? <Button to="/dashboard">Profile</Button> : <Button to="/login">Login</Button>}
          </div>
        </Drawer>
      )}
    </header>
  );
}
