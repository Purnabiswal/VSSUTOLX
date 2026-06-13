import { FaBook, FaBicycle, FaCouch, FaGamepad, FaLaptop, FaMobileAlt, FaTshirt, FaWrench } from 'react-icons/fa';

export const categories = [
  { id: 'books', name: 'Books', icon: FaBook, color: 'bg-blue-50 text-primary' },
  { id: 'electronics', name: 'Electronics', icon: FaLaptop, color: 'bg-cyan-50 text-cyan-700' },
  { id: 'mobiles', name: 'Mobiles', icon: FaMobileAlt, color: 'bg-emerald-50 text-emerald-700' },
  { id: 'cycles', name: 'Cycles', icon: FaBicycle, color: 'bg-lime-50 text-lime-700' },
  { id: 'furniture', name: 'Furniture', icon: FaCouch, color: 'bg-amber-50 text-amber-700' },
  { id: 'fashion', name: 'Fashion', icon: FaTshirt, color: 'bg-rose-50 text-rose-700' },
  { id: 'gaming', name: 'Gaming', icon: FaGamepad, color: 'bg-violet-50 text-violet-700' },
  { id: 'services', name: 'Services', icon: FaWrench, color: 'bg-slate-100 text-secondary' },
];

export const locations = ['Pulaha Hall', 'Atri Hall', 'Vasistha Hall', 'Rohini Hall', 'Angira Hall', 'Campus Gate', 'Burla'];

export const sortOptions = [
  { label: 'Newest first', value: 'newest' },
  { label: 'Price: low to high', value: 'price-low' },
  { label: 'Price: high to low', value: 'price-high' },
];
