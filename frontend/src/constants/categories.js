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
