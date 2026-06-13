import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-primary text-white hover:bg-blue-700',
  secondary: 'bg-secondary text-white hover:bg-slate-900',
  outline: 'border border-slate-300 bg-white text-secondary hover:bg-slate-50',
  ghost: 'text-secondary hover:bg-slate-100',
  danger: 'bg-danger text-white hover:bg-red-700',
};

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
};

export default function Button({ children, variant = 'primary', size = 'md', className = '', to, type = 'button', ...props }) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-md font-semibold transition focus-ring disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`;
  if (to) return <Link to={to} className={classes} {...props}>{children}</Link>;
  return <button type={type} className={classes} {...props}>{children}</button>;
}
