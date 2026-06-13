import { forwardRef } from 'react';

const Select = forwardRef(function Select({ label, error, children, className = '', ...props }, ref) {
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

export default Select;
