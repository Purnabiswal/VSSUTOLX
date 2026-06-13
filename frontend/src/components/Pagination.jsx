import Button from './Button';

export default function Pagination({ page, totalPages, onChange }) {
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
