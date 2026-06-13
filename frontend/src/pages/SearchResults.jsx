import { useSearchParams } from 'react-router-dom';
import Products from './Products';

export default function SearchResults() {
  const [params] = useSearchParams();
  return <Products key={params.toString()} />;
}
