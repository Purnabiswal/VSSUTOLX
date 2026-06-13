import { FaBook, FaBicycle, FaCouch, FaLaptop, FaStickyNote, FaTools, FaWrench } from 'react-icons/fa';

export const categories = [
  { id: 'Books', name: 'Books', icon: FaBook, color: 'bg-blue-50 text-primary' },
  { id: 'Electronics', name: 'Electronics', icon: FaLaptop, color: 'bg-cyan-50 text-cyan-700' },
  { id: 'Cycles', name: 'Cycles', icon: FaBicycle, color: 'bg-lime-50 text-lime-700' },
  { id: 'Hostel Items', name: 'Hostel Items', icon: FaCouch, color: 'bg-emerald-50 text-emerald-700' },
  { id: 'Lab Equipment', name: 'Lab Equipment', icon: FaTools, color: 'bg-amber-50 text-amber-700' },
  { id: 'Project Components', name: 'Project Components', icon: FaWrench, color: 'bg-rose-50 text-rose-700' },
  { id: 'Notes', name: 'Notes', icon: FaStickyNote, color: 'bg-violet-50 text-violet-700' },
  { id: 'Furniture', name: 'Furniture', icon: FaCouch, color: 'bg-slate-100 text-secondary' },
  { id: 'Others', name: 'Others', icon: FaWrench, color: 'bg-slate-100 text-secondary' },
];

export const locations = ['Pulaha Hall', 'Atri Hall', 'Vasistha Hall', 'Rohini Hall', 'Angira Hall', 'Campus Gate', 'Burla'];

export const sortOptions = [
  { label: 'Newest first', value: 'newest' },
  { label: 'Price: low to high', value: 'price-low' },
  { label: 'Price: high to low', value: 'price-high' },
];
