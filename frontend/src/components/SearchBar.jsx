import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Button from './Button';

export default function SearchBar({ compact = false, initialValue = '' }) {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();
  const submit = (event) => {
    event.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };
  return (
    <form onSubmit={submit} className={`flex w-full items-center gap-2 rounded-md border border-slate-300 bg-white p-1.5 ${compact ? 'max-w-xl' : 'shadow-soft'}`}>
      <FaSearch className="ml-3 shrink-0 text-slate-400" />
      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search books, cycles, electronics..." className="h-10 min-w-0 flex-1 bg-transparent px-2 text-sm outline-none" />
      <Button type="submit" size="sm">Search</Button>
    </form>
  );
}
