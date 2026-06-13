import SEO from '../components/SEO';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Button from '../components/Button';

export default function Contact() {
  return <section className="container-page py-12"><SEO title="Contact" /><h1 className="text-3xl font-extrabold text-secondary">Contact</h1><form className="surface mt-6 grid max-w-2xl gap-4 rounded-md p-6"><Input label="Name" /><Input label="Email" /><Textarea label="Message" /><Button>Send Message</Button></form></section>;
}
