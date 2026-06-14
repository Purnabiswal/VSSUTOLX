import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="container-page grid gap-8 py-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="text-xl font-extrabold text-primary">VSSUT OLX</Link>
          <p className="mt-3 max-w-md text-sm text-slate-500">A trusted campus marketplace for VSSUT students to buy, sell, and exchange essentials with confidence.</p>
        </div>
        <div>
          <h4 className="font-bold text-secondary">Marketplace</h4>
          <div className="mt-3 grid gap-2 text-sm text-slate-500">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/about">About</Link>
            <Link to="/dashboard/listings/new">Sell item</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-secondary">Legal</h4>
          <div className="mt-3 grid gap-2 text-sm text-slate-500">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
