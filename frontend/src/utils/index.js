import { FaBasketballBall, FaBicycle, FaBook, FaCouch, FaLaptop, FaTools } from 'react-icons/fa';

export const categories = [
  { id: 'Books', name: 'Books', icon: FaBook, color: 'bg-blue-50 text-primary' },
  { id: 'Electronics', name: 'Electronics', icon: FaLaptop, color: 'bg-cyan-50 text-cyan-700' },
  { id: 'Cycles', name: 'Cycles', icon: FaBicycle, color: 'bg-lime-50 text-lime-700' },
  { id: 'Furniture', name: 'Furniture', icon: FaCouch, color: 'bg-slate-100 text-secondary' },
  { id: 'Sports', name: 'Sports', icon: FaBasketballBall, color: 'bg-orange-50 text-orange-700' },
  { id: 'Hostel Essentials', name: 'Hostel Essentials', icon: FaTools, color: 'bg-emerald-50 text-emerald-700' },
];

export const locations = ['Pulaha Hall', 'Atri Hall', 'Vasistha Hall', 'Rohini Hall', 'Angira Hall', 'Campus Gate', 'Burla'];

export const sortOptions = [
  { label: 'Newest first', value: 'newest' },
  { label: 'Price: low to high', value: 'price-low' },
  { label: 'Price: high to low', value: 'price-high' },
];

export const dashboardNav = [
  { label: 'Overview', to: '/dashboard' },
  { label: 'My Listings', to: '/dashboard/listings' },
  { label: 'Create Listing', to: '/dashboard/listings/new' },
  { label: 'Wishlist', to: '/dashboard/wishlist' },
  { label: 'Notifications', to: '/dashboard/notifications' },
  { label: 'Settings', to: '/dashboard/settings' },
  { label: 'Logout', to: '/dashboard/logout' },
];

export const adminNav = [
  { label: 'Admin Home', to: '/admin' },
  { label: 'Users', to: '/admin/users' },
  { label: 'Listings', to: '/admin/listings' },
  { label: 'Reports', to: '/admin/reports' },
  { label: 'Analytics', to: '/admin/analytics' },
];

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

export const formatDate = (date) =>
  new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(date));

export const timeAgo = (date) => {
  const diff = Math.round((Date.now() - new Date(date).getTime()) / 86400000);
  if (diff <= 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  return `${diff} days ago`;
};

export const seoDefaults = {
  title: 'VSSUT OLX | Campus Marketplace',
  description: 'Buy, sell, and discover trusted second-hand products inside the VSSUT campus community.',
  image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
};

export const pageTitle = (title) => `${title} | VSSUT OLX`;

const statusMessages = {
  401: 'Unauthorized. Please login.',
  403: 'You do not have permission to perform this action.',
  404: 'Listing not found.',
  409: 'Email already exists.',
  422: 'Please fix the highlighted fields.',
  500: 'Server error. Please try again.',
};

export function apiErrorDetails(error) {
  const details = error?.details || error?.response?.data?.details || error?.response?.data?.errors || [];
  return Array.isArray(details) ? details : [];
}

export function parseApiError(error) {
  const status = error?.response?.status;
  const data = error?.response?.data;
  const details = data?.details || data?.errors || [];
  const detailMessage = Array.isArray(details)
    ? details.map((item) => item.msg || item.message).filter(Boolean).join(', ')
    : '';
  const message = detailMessage || data?.message || statusMessages[status] || error?.message || 'Something went wrong';
  return { message, status, details };
}

export function fieldErrors(error) {
  return apiErrorDetails(error).reduce((fields, item) => {
    const key = item.path || item.param || item.field;
    const message = item.msg || item.message;
    if (key && message) fields[key] = message;
    return fields;
  }, {});
}

export const required = (label) => ({ required: `${label} is required` });

export const priceValidation = {
  required: 'Price is required',
  min: { value: 1, message: 'Price must be greater than 0' },
};

export const emailValidation = {
  required: 'Email is required',
  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
};

export const whatsappValidation = {
  required: 'WhatsApp number is required',
  pattern: {
    value: /^[6-9]\d{9}$/,
    message: 'WhatsApp number must be a valid Indian mobile number',
  },
};

const whatsappMessage = (productTitle) => [
  'Hello, I found your listing on VSSUT OLX.',
  '',
  'I am interested in:',
  productTitle,
  '',
  'Can we discuss?',
].join('\n');

export const normalizeIndianWhatsappNumber = (number) => {
  const digits = String(number || '').replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) return digits;
  if (/^[6-9]\d{9}$/.test(digits)) return `91${digits}`;
  return '';
};

export const buildWhatsappLink = ({ number, productTitle = 'your listing' }) => {
  const normalized = normalizeIndianWhatsappNumber(number);
  if (!normalized) return '';
  return `https://wa.me/${normalized}?text=${encodeURIComponent(whatsappMessage(productTitle))}`;
};
