import { forwardRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  FaBars,
  FaBell,
  FaBoxOpen,
  FaHeart,
  FaPlus,
  FaRegHeart,
  FaSearch,
  FaStar,
  FaTimes,
  FaTrash,
  FaGithub,
  FaUserCircle,
} from 'react-icons/fa';
import { useAuthStore, useNotificationStore, useWishlistStore } from '../store';
import { formatCurrency, pageTitle, seoDefaults, timeAgo } from '../utils';



const buttonVariants = {
  primary: 'bg-primary text-white hover:bg-[#e25f00]',
  secondary: 'bg-secondary text-white hover:bg-slate-900',
  outline: 'border border-slate-300 bg-white text-secondary hover:bg-slate-50',
  ghost: 'text-secondary hover:bg-slate-100',
  danger: 'bg-danger text-white hover:bg-red-700',
  whatsapp:
    'bg-[#25D366] text-white hover:bg-[#20BD5A]',
};

const buttonSizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  to,
  as,
  type = 'button',
  state,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-md font-semibold transition focus-ring disabled:cursor-not-allowed disabled:opacity-60 ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`;

  if (to)
    return (
      <Link
        to={to}
        state={state}
        className={classes}
        {...props}
      >
        {children}
      </Link>
    );

  if (as === 'a')
    return (
      <a className={classes} {...props}>
        {children}
      </a>
    );

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}

export function Avatar({ src, name = 'User', size = 'md' }) {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-lg',
  };

  return src ? (
    <img
      src={src}
      alt={name}
      className={`${sizes[size]} rounded-full object-cover`}
      loading="lazy"
    />
  ) : (
    <div
      className={`${sizes[size]} grid place-items-center rounded-full bg-green-100 text-green-700 font-bold`}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export function Badge({ children, tone = 'slate' }) {
  const tones = {
    slate: 'bg-slate-100 text-slate-700',
    blue: 'bg-blue-50 text-primary',
    green: 'bg-green-50 text-success',
    red: 'bg-red-50 text-danger',
  };
  return <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

export function Breadcrumb({ items }) {
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

export function Spinner({ className = 'h-5 w-5' }) {
  return <span className={`${className} inline-block animate-spin rounded-full border-2 border-current border-r-transparent`} aria-label="Loading" />;
}

export function Loader({ label = 'Loading' }) {
  return (
    <div className="grid min-h-64 place-items-center">
      <div className="flex items-center gap-3 rounded-md bg-white px-4 py-3 text-sm font-semibold text-secondary shadow-sm">
        <Spinner />
        {label}
      </div>
    </div>
  );
}

export const Input = forwardRef(function Input({ label, error, className = '', ...props }, ref) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-semibold text-secondary">{label}</span>}
      <input ref={ref} className={`h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-secondary outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100 ${className}`} {...props} />
      {error && <span className="mt-1 block text-sm text-danger">{error}</span>}
    </label>
  );
});

export const Select = forwardRef(function Select({ label, error, children, className = '', ...props }, ref) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-semibold text-secondary">{label}</span>}
      <select ref={ref} className={`h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-secondary outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100 ${className}`} {...props}>
        {children}
      </select>
      {error && <span className="mt-1 block text-sm text-danger">{error}</span>}
    </label>
  );
});

export const Textarea = forwardRef(function Textarea({ label, error, className = '', ...props }, ref) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-semibold text-secondary">{label}</span>}
      <textarea ref={ref} className={`min-h-32 w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-3 text-sm text-secondary outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100 ${className}`} {...props} />
      {error && <span className="mt-1 block text-sm text-danger">{error}</span>}
    </label>
  );
});

export function SEO({ title, description = seoDefaults.description, image = seoDefaults.image }) {
  const resolvedTitle = title ? pageTitle(title) : seoDefaults.title;
  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}

export function EmptyState({ title = 'Nothing here yet', message = 'Try adjusting filters or creating something new.', action, to }) {
  return (
    <div className="surface rounded-md px-6 py-12 text-center">
      <FaBoxOpen className="mx-auto mb-3 text-4xl text-slate-300" />
      <h3 className="text-lg font-bold text-secondary">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">{message}</p>
      {action && <Button to={to} className="mt-5">{action}</Button>}
    </div>
  );
}

export function Drawer({ open, children, onClose }) {
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

export function Modal({ open, title, children, onClose }) {
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
export function SearchBar({ compact = false, initialValue = '' }) {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form
      onSubmit={submit}
      className="flex w-full items-center rounded-full bg-[#f3f4f8] px-5 py-3"
    >

      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search books, cycles, electronics..."
        className="ml-4 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
      />

      <button
        type="submit"
        className="text-slate-500 transition hover:text-primary"
      >
        <FaSearch size={18} />
      </button>
    </form>
  );
}
export function ImageCarousel({ images = [] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="h-[500px] rounded-md bg-slate-100">
        <img
          src={images[active]}
          alt="Product"
          className="w-full h-full object-contain"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button key={image} type="button" onClick={() => setActive(index)} className={`aspect-square overflow-hidden rounded-md border ${active === index ? 'border-primary' : 'border-slate-200'}`}>
              <img src={image} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// export function ProductCard({ product }) {
//   const ids = useWishlistStore((state) => state.ids);
//   const toggle = useWishlistStore((state) => state.toggle);
//   const user = useAuthStore((state) => state.user);
//   const pushToast = useNotificationStore((state) => state.pushToast);
//   const wished = ids.includes(product.id);
//   const onToggle = async () => {
//     if (!user) {
//       pushToast({ message: 'Unauthorized. Please login.' });
//       return;
//     }
//     try {
//       const result = await toggle(product.id);
//       pushToast({ message: result.added ? 'Added to wishlist' : 'Removed from wishlist' });
//     } catch (error) {
//       pushToast({ message: error.message });
//     }
//   };

//   return (
//     <article className="surface group overflow-hidden rounded-md transition hover:-translate-y-0.5 hover:shadow-soft">
//       <Link to={`/products/${product.id}`} className="block aspect-[4/3] overflow-hidden bg-slate-100">
//         <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy" />
//       </Link>
//       <div className="p-4">
//         <div className="mb-3 flex items-start justify-between gap-3">
//           <div>
//             <Link to={`/products/${product.id}`} className="line-clamp-2 font-bold text-secondary hover:text-primary">{product.title}</Link>
//             <p className="mt-1 text-lg font-extrabold text-primary">{formatCurrency(product.price)}</p>
//           </div>
//           <Button variant="ghost" size="sm" onClick={onToggle} aria-label="Toggle wishlist">
//             {wished ? <FaHeart className="text-danger" /> : <FaRegHeart />}
//           </Button>
//         </div>
//         <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
//           <Badge>{product.category}</Badge>
//           <span>{product.seller?.name || 'VSSUT seller'}</span>
//           <span>{timeAgo(product.postedAt)}</span>
//         </div>
//       </div>
//     </article>
//   );
// }

export function ProductCard({ product }) {
  const ids = useWishlistStore((state) => state.ids);
  const toggle = useWishlistStore((state) => state.toggle);
  const user = useAuthStore((state) => state.user);
  const pushToast = useNotificationStore((state) => state.pushToast);

  const wished = ids.includes(product.id);

  const onToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      pushToast({ message: 'Unauthorized. Please login.' });
      return;
    }

    try {
      const result = await toggle(product.id);

      pushToast({
        message: result.added
          ? 'Added to wishlist'
          : 'Removed from wishlist',
      });
    } catch (error) {
      pushToast({ message: error.message });
    }
  };

  return (
    <article className="group">
      <Link
        to={`/products/${product.id}`}
        className="block"
      >
        {/* Image */}
        <div className="relative overflow-hidden rounded-3xl">
          <div className="aspect-[4/3] overflow-hidden bg-slate-100">
            <img
              src={product.images[0]}
              alt={product.title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Wishlist */}
          <div className="absolute right-3 top-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              aria-label="Toggle wishlist"
              className="rounded-full bg-white/90 backdrop-blur"
            >
              {wished ? (
                <FaHeart className="text-danger" />
              ) : (
                <FaRegHeart />
              )}
            </Button>
          </div>

          {/* Price */}
          <div className="absolute bottom-3 left-3">
            <p className="text-2xl font-extrabold text-white">
              {formatCurrency(product.price)}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="mt-4 px-1">
          <h3 className="line-clamp-2 text-lg font-bold text-secondary group-hover:text-primary">
            {product.title}
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Badge>{product.category}</Badge>
            <span>•</span>
            <span>{product.seller?.name || 'VSSUT Seller'}</span>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            {timeAgo(product.postedAt)}
          </p>
        </div>
      </Link>
    </article>
  );
}

export function WishlistCard({ product }) {
  const toggle = useWishlistStore((state) => state.toggle);
  return (
    <div className="relative">
      <ProductCard product={product} />
      <Button className="absolute right-3 top-3" variant="danger" size="sm" onClick={() => toggle(product.id)} aria-label="Remove from wishlist">
        <FaTrash />
      </Button>
    </div>
  );
}

export function ProfileCard({ user, action = 'View Profile' }) {
  return (
    <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-100">
      <div className="flex items-center gap-3">
        <Avatar
          src={user.avatar}
          name={user.name}
          size="lg"
        />

        <div className="flex-1 min-w-0">
          <h3 className="truncate text-base font-bold text-secondary">
            {user.name}
          </h3>

          <p className="text-sm text-slate-500">
            {user.branch || 'VSSUT'}
            {user.year ? ` · Year ${user.year}` : ''}
          </p>

          {user.phoneNumber && (
            <p className="mt-1 text-sm text-slate-500">
              Phone: {user.phoneNumber}
            </p>
          )}
        </div>
      </div>

      <Button
        to={`/sellers/${user.id}`}
        variant="outline"
        className="mt-4 w-full rounded-2xl border-0 bg-slate-100 text-[#009E60] hover:bg-slate-200"
      >
        {action}
      </Button>
    </div>
  );
}

export function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <Button variant="outline" size="sm" disabled={page === 1} onClick={() => onChange(page - 1)}>Prev</Button>
      {Array.from({ length: totalPages }, (_, index) => (
        <Button key={index + 1} size="sm" variant={page === index + 1 ? 'primary' : 'outline'} onClick={() => onChange(index + 1)}>{index + 1}</Button>
      ))}
      <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => onChange(page + 1)}>Next</Button>
    </div>
  );
}

export function CategoryCard({ category }) {
  const Icon = category.icon;
  return (
    <Link to={`/products?category=${category.id}`} className="surface flex items-center gap-4 rounded-md p-4 transition hover:-translate-y-0.5 hover:shadow-soft">
      <span className={`grid h-12 w-12 place-items-center rounded-md text-xl ${category.color}`}><Icon /></span>
      <span className="font-bold text-secondary">{category.name}</span>
    </Link>
  );
}

export function Sidebar({ items, title }) {
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

export function Navbar() {
  const [open, setOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const hydrate = useAuthStore((state) => state.hydrate);
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const location = useLocation();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-20 items-center px-6 lg:px-10">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0"
        >
          <img
            src="/images/logo.png"
            alt="VSSUT OLX Logo"
            className="h-11 w-11 object-contain"
          />

          <div className="leading-none">
            <div className="text-xl font-extrabold text-primary">
              VSSUT OLX
            </div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500">
              Campus Marketplace
            </div>
          </div>
        </Link>

        {/* Search */}
        <div className="hidden flex-1 justify-center px-8 lg:flex">
          <div className="w-full max-w-3xl">
            <SearchBar compact />
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden shrink-0 items-center gap-3 md:flex">

          <Button
            to="/dashboard/listings/new"
            size="sm"
            className="rounded-xl"
          >
            <FaPlus />
            SELL
          </Button>

          {user ? (
            <>
              <Link
                to="/dashboard/notifications"
                className="relative flex h-11 w-11 items-center justify-center rounded-full text-secondary transition hover:bg-slate-100"
              >
                <FaBell size={18} />

                {unreadCount > 0 && (
                  <span className="absolute right-1 top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-danger px-1 text-[10px] text-white">
                    {unreadCount}
                  </span>
                )}
              </Link>

              <Link
                to="/dashboard"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-white transition hover:bg-slate-800"
              >
                <FaUserCircle size={24} />
              </Link>
            </>
          ) : (
            <>
              <Button
                to="/login"
                state={{ backgroundLocation: location }}
                variant="ghost"
                size="sm"
                className="rounded-xl"
              >
                Login
              </Button>

              <Button
                to="/register"
                state={{ backgroundLocation: location }}
                size="sm"
                className="rounded-xl"
              >
                Register
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <FaBars />
        </Button>
      </div>

      {open && (
        <Drawer open={open} onClose={() => setOpen(false)}>
          <div className="grid gap-4">
            <SearchBar compact />

            <Button
              to="/dashboard/listings/new"
              onClick={() => setOpen(false)}
            >
              <FaPlus />
              SELL
            </Button>

            {user ? (
              <Button to="/dashboard">Profile</Button>
            ) : (
              <Button to="/login">Login</Button>
            )}
          </div>
        </Drawer>
      )}
    </header>
  );
}



export function Footer() {
  return (
    <footer className="mt-16 bg-black text-white">
      <div className="container-page grid gap-8 py-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link
            to="/"
            className="text-xl font-extrabold text-primary"
          >
            VSSUT OLX
          </Link>

          <p className="mt-3 max-w-md text-sm text-slate-400">
            A trusted campus marketplace for VSSUT students to buy,
            sell, and exchange essentials with confidence.
          </p>

          <a
            href="https://github.com/Purnabiswal"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center text-slate-400 transition-all duration-200 hover:text-primary hover:scale-110"
          >
            <FaGithub size={28} />
          </a>
        </div>

        <div>
          <h4 className="font-bold text-white">
            Marketplace
          </h4>

          <div className="mt-3 grid gap-2 text-sm text-slate-400">
            <Link to="/" className="hover:text-primary transition">
              Home
            </Link>

            <Link to="/products" className="hover:text-primary transition">
              Products
            </Link>

            <Link to="/about" className="hover:text-primary transition">
              About
            </Link>

            <Link
              to="/dashboard/listings/new"
              className="hover:text-primary transition"
            >
              Sell Item
            </Link>

            <Link to="/contact" className="hover:text-primary transition">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white">
            Legal
          </h4>

          <div className="mt-3 grid gap-2 text-sm text-slate-400">
            <Link to="/privacy" className="hover:text-primary transition">
              Privacy Policy
            </Link>

            <Link to="/terms" className="hover:text-primary transition">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} VSSUT OLX. All rights reserved.
      </div>
    </footer>
  );
}

export function Toast() {
  const toast = useNotificationStore((state) => state.toast);
  if (!toast) return null;
  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm rounded-md bg-secondary px-4 py-3 text-sm font-semibold text-white shadow-soft">
      {toast.message}
    </div>
  );
}


export function AuthModal({ children, title }) {
  const navigate = useNavigate();
  const location = useLocation();

  const closeModal = () => {
    navigate(
      location.state?.backgroundLocation?.pathname || "/",
      { replace: true }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeModal}
      />

      <div className="relative z-10 w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <button
          onClick={closeModal}
          className="absolute right-4 top-4 text-slate-500 transition hover:text-black"
        >
          <FaTimes />
        </button>

        <h1 className="mb-6 text-2xl font-bold text-secondary">
          {title}
        </h1>

        {children}
      </div>
    </div>
  );
}