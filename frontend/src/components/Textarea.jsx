import { forwardRef } from 'react';

const Textarea = forwardRef(function Textarea({ label, error, className = '', ...props }, ref) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-semibold text-secondary">{label}</span>}
      <textarea ref={ref} className={`min-h-32 w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-3 text-sm text-secondary outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100 ${className}`} {...props} />
      {error && <span className="mt-1 block text-sm text-danger">{error}</span>}
    </label>
  );
});

export default Textarea;
