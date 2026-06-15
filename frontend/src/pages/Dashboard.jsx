import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaBell, FaHeart, FaList } from 'react-icons/fa';
import { Badge, Button, EmptyState, Input, Loader, ProductCard, Select, SEO, Textarea, WishlistCard } from '../components';
import { productService, userService } from '../services';
import { useAuthStore, useNotificationStore, useProductStore, useWishlistStore } from '../store';
import { categories, fieldErrors, formatCurrency, formatDate, locations, priceValidation, required, whatsappValidation } from '../utils';

export function DashboardHome() {
  const user = useAuthStore((state) => state.user);
  const unread = useNotificationStore((state) => state.unreadCount);
  const wishlistCount = useWishlistStore((state) => state.ids.length);
  const fetchWishlist = useWishlistStore((state) => state.fetchWishlist);
  const [listingCount, setListingCount] = useState(0);

  useEffect(() => {
    fetchWishlist().catch(() => {});
    productService.getProducts({ limit: 50 }).then((data) => {
      setListingCount(data.items.filter((product) => product.seller?.id === user?.id).length);
    }).catch(() => {});
  }, [fetchWishlist, user?.id]);

  const stats = [
    ['My listings', listingCount, <FaList key="list" className="text-xl text-primary" />],
    ['Wishlist', wishlistCount, <FaHeart key="heart" className="text-xl text-primary" />],
    ['Notifications', unread, <FaBell key="bell" className="text-xl text-primary" />],
  ];

  return (
    <div>
      <SEO title="Dashboard" />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-3xl font-extrabold text-secondary">Dashboard</h1><p className="text-slate-500">Manage your listings, wishlist, and profile.</p></div>
        <Button to="/dashboard/listings/new">Create Listing</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value, icon]) => <div key={label} className="surface rounded-md p-5">{icon}<p className="mt-4 text-3xl font-extrabold text-secondary">{value}</p><p className="text-sm text-slate-500">{label}</p></div>)}
      </div>
    </div>
  );
}

export function MyListings() {
  const user = useAuthStore((state) => state.user);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getProducts({ limit: 50 }).then((data) => {
      setProducts(data.items.filter((product) => product.seller?.id === user?.id));
      setLoading(false);
    });
  }, [user?.id]);

  return (
    <div>
      <SEO title="My Listings" />
      <div className="mb-6 flex items-center justify-between"><h1 className="text-3xl font-extrabold text-secondary">My Listings</h1><Button to="/dashboard/listings/new">New Listing</Button></div>
      <div className="surface overflow-hidden rounded-md">
        {loading ? <Loader /> : products.map((product) => (
          <div key={product.id} className="grid gap-4 border-b border-slate-100 p-4 last:border-b-0 md:grid-cols-[80px_1fr_auto] md:items-center">
            <img src={product.images[0]} alt={product.title} className="h-20 w-20 rounded-md object-cover" />
            <div><Link to={`/products/${product.id}`} className="font-bold text-secondary hover:text-primary">{product.title}</Link><p className="text-sm text-slate-500">{formatCurrency(product.price)} · {product.location}</p></div>
            <div className="flex items-center gap-2"><Badge tone={product.status === 'sold' ? 'slate' : 'green'}>{product.status}</Badge><Button to={`/dashboard/listings/${product.id}/edit`} variant="outline" size="sm">Edit</Button></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CreateListing() {
  const user = useAuthStore((state) => state.user);
  const hydrateCurrentUser = useAuthStore((state) => state.hydrateCurrentUser);
  const [images, setImages] = useState([]);
  const { register, handleSubmit, watch, setError, setValue, formState: { errors } } = useForm({
    defaultValues: { category: 'Books', location: locations[0], whatsappNumber: '' },
  });
  const createProduct = useProductStore((state) => state.createProduct);
  const pushToast = useNotificationStore((state) => state.pushToast);
  const navigate = useNavigate();
  const imagePreviews = useMemo(() => images.map((image) => globalThis.URL.createObjectURL(image)), [images]);
  useEffect(() => {
    if (user?.whatsappNumber) setValue('whatsappNumber', user.whatsappNumber);
  }, [setValue, user?.whatsappNumber]);
  useEffect(() => () => imagePreviews.forEach((url) => globalThis.URL.revokeObjectURL(url)), [imagePreviews]);
  const preview = {
    id: 'preview',
    title: watch('title') || 'Listing title',
    price: Number(watch('price')) || 0,
    category: watch('category') || 'Books',
    seller: { name: 'You' },
    postedAt: new Date().toISOString(),
    images: imagePreviews.length ? imagePreviews : ['https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=900&q=80'],
  };

  const onSubmit = async (data) => {
    try {
      if (!images.length) {
        setError('images', { type: 'manual', message: 'At least one image is required' });
        pushToast({ message: 'At least one image is required' });
        return;
      }
      if (!data.whatsappNumber) {
        setError('whatsappNumber', { type: 'manual', message: 'WhatsApp number is required to publish a listing' });
        pushToast({ message: 'WhatsApp number is required to publish a listing' });
        return;
      }
      if (data.whatsappNumber !== user?.whatsappNumber) {
        await userService.updateProfile({ ...user, whatsappNumber: data.whatsappNumber });
        await hydrateCurrentUser();
      }
      const product = await createProduct({ ...data, images });
      navigate(`/products/${product.id}`);
    } catch (err) {
      Object.entries(fieldErrors(err)).forEach(([field, message]) => setError(field, { type: 'server', message }));
      pushToast({ message: err.message });
    }
  };

  return (
    <div>
      <SEO title="Create Listing" />
      <h1 className="mb-6 text-3xl font-extrabold text-secondary">Create Listing</h1>
      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <form onSubmit={handleSubmit(onSubmit)} className="surface grid gap-4 rounded-md p-5">
          <Input label="Title" {...register('title', required('Title'))} error={errors.title?.message} />
          <Textarea label="Description" {...register('description', required('Description'))} error={errors.description?.message} />
          <Input label="Price" type="number" {...register('price', priceValidation)} error={errors.price?.message} />
          <Select label="Category" {...register('category')}>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</Select>
          <Select label="Location" {...register('location')}>{locations.map((item) => <option key={item} value={item}>{item}</option>)}</Select>
          <Input label="WhatsApp Number" inputMode="numeric" maxLength="10" {...register('whatsappNumber', whatsappValidation)} error={errors.whatsappNumber?.message} />
          <Input label="Images" type="file" accept="image/*" multiple onChange={(event) => setImages(Array.from(event.target.files || []).slice(0, 6))} error={errors.images?.message} />
          <Button type="submit">Publish Listing</Button>
        </form>
        <div><p className="mb-3 font-bold text-secondary">Preview</p><ProductCard product={preview} /></div>
      </div>
    </div>
  );
}

export function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const { currentProduct, loading, fetchProduct, updateProduct } = useProductStore();
  const pushToast = useNotificationStore((state) => state.pushToast);
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm();

  useEffect(() => {
    fetchProduct(id).then((product) => {
      reset({
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        location: product.location,
      });
    }).catch((err) => pushToast({ message: err.message }));
  }, [fetchProduct, id, pushToast, reset]);

  const onSubmit = async (data) => {
    try {
      const product = await updateProduct(id, { ...data, images });
      navigate(`/products/${product.id}`);
    } catch (err) {
      Object.entries(fieldErrors(err)).forEach(([field, message]) => setError(field, { type: 'server', message }));
      pushToast({ message: err.message });
    }
  };

  if (loading || !currentProduct) return <Loader />;

  return (
    <div>
      <SEO title="Edit Listing" />
      <h1 className="mb-6 text-3xl font-extrabold text-secondary">Edit Listing</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="surface grid max-w-3xl gap-4 rounded-md p-5">
        <Input label="Title" {...register('title', required('Title'))} error={errors.title?.message} />
        <Textarea label="Description" {...register('description', required('Description'))} error={errors.description?.message} />
        <Input label="Price" type="number" {...register('price', priceValidation)} error={errors.price?.message} />
        <Select label="Category" {...register('category')}>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</Select>
        <Select label="Location" {...register('location')}>{locations.map((item) => <option key={item} value={item}>{item}</option>)}</Select>
        <Input label="Replace images" type="file" accept="image/*" multiple onChange={(event) => setImages(Array.from(event.target.files || []).slice(0, 6))} />
        <Button type="submit">Save Listing</Button>
      </form>
    </div>
  );
}

export function Wishlist() {
  const { items, fetchWishlist } = useWishlistStore();
  useEffect(() => { fetchWishlist(); }, [fetchWishlist]);
  return (
    <div>
      <SEO title="Wishlist" />
      <h1 className="mb-6 text-3xl font-extrabold text-secondary">Wishlist</h1>
      {items.length ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{items.map((product) => <WishlistCard key={product.id} product={product} />)}</div> : <EmptyState title="Wishlist is empty" action="Browse Products" to="/products" />}
    </div>
  );
}

export function ProfileSettings() {
  const user = useAuthStore((state) => state.user);
  const hydrateCurrentUser = useAuthStore((state) => state.hydrateCurrentUser);
  const { register, handleSubmit, setError, formState: { errors } } = useForm({ values: user || {} });
  const pushToast = useNotificationStore((state) => state.pushToast);
  const onSubmit = async (data) => {
    try {
      await userService.updateProfile(data);
      await hydrateCurrentUser();
      pushToast({ message: 'Profile updated' });
    } catch (err) {
      Object.entries(fieldErrors(err)).forEach(([field, message]) => setError(field, { type: 'server', message }));
      pushToast({ message: err.message });
    }
  };
  return (
    <div>
      <SEO title="Profile Settings" />
      <h1 className="mb-6 text-3xl font-extrabold text-secondary">Profile Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="surface grid max-w-2xl gap-4 rounded-md p-5">
        <Input label="Name" {...register('name')} error={errors.name?.message} />
        <Input label="Email" {...register('email')} disabled />
        <Input label="Branch" {...register('branch')} error={errors.branch?.message} />
        <Input label="Year" type="number" min="1" max="5" {...register('year')} error={errors.year?.message} />
        <Input label="WhatsApp Number" inputMode="numeric" maxLength="10" {...register('whatsappNumber', whatsappValidation)} error={errors.whatsappNumber?.message} />
        <Input label="Phone Number" inputMode="numeric" maxLength="10" {...register('phoneNumber')} error={errors.phoneNumber?.message} />
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
}

export function Notifications() {
  const { notifications, fetchNotifications, markAllRead } = useNotificationStore();
  useEffect(() => { fetchNotifications(); }, [fetchNotifications]);
  return (
    <div>
      <SEO title="Notifications" />
      <div className="mb-6 flex items-center justify-between"><h1 className="text-3xl font-extrabold text-secondary">Notifications</h1><Button variant="outline" onClick={markAllRead}>Mark all read</Button></div>
      <div className="surface rounded-md">
        {notifications.length ? notifications.map((item) => <div key={item.id} className="border-b border-slate-100 p-4 last:border-b-0"><div className="flex items-center gap-2"><h3 className="font-bold text-secondary">{item.title}</h3>{!item.read && <Badge tone="blue">New</Badge>}</div><p className="mt-1 text-sm text-slate-500">{item.body}</p><p className="mt-2 text-xs text-slate-400">{formatDate(item.createdAt)}</p></div>) : <EmptyState title="No notifications" message="You are all caught up." />}
      </div>
    </div>
  );
}

export function Logout() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      navigate('/login', { replace: true });
    };
    performLogout();
  }, [logout, navigate]);

  return <div className="flex items-center justify-center py-20">Logging out...</div>;
}
