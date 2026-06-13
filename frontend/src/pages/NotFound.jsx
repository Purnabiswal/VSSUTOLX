import SEO from '../components/SEO';
import EmptyState from '../components/EmptyState';

export default function NotFound() {
  return <section className="container-page py-12"><SEO title="Not Found" /><EmptyState title="Page not found" message="The page you are looking for does not exist." action="Go home" to="/" /></section>;
}
