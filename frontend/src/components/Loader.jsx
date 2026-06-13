import Spinner from './Spinner';

export default function Loader({ label = 'Loading' }) {
  return (
    <div className="grid min-h-64 place-items-center">
      <div className="flex items-center gap-3 rounded-md bg-white px-4 py-3 text-sm font-semibold text-secondary shadow-sm">
        <Spinner />
        {label}
      </div>
    </div>
  );
}
