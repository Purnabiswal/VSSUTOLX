import { useState } from 'react';
import { useForm } from 'react-hook-form';
import SEO from '../components/SEO';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Button from '../components/Button';
import { contactService } from '../services';
import { emailValidation, required } from '../utils/validators';
import { fieldErrors } from '../utils/apiErrors';

export default function Contact() {
  const [status, setStatus] = useState(null);
  const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    setStatus(null);
    try {
      const response = await contactService.sendMessage(data);
      setStatus({ type: 'success', message: response.message });
      reset();
    } catch (error) {
      Object.entries(fieldErrors(error)).forEach(([field, message]) => setError(field, { type: 'server', message }));
      setStatus({ type: 'error', message: error.message });
    }
  };

  return (
    <section className="container-page py-12">
      <SEO title="Contact" />
      <h1 className="text-3xl font-extrabold text-secondary">Contact</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="surface mt-6 grid max-w-2xl gap-4 rounded-md p-6">
        {status && <p className={status.type === 'success' ? 'text-sm font-semibold text-success' : 'text-sm font-semibold text-danger'}>{status.message}</p>}
        <Input label="Name" {...register('name', required('Name'))} error={errors.name?.message} />
        <Input label="Email" {...register('email', emailValidation)} error={errors.email?.message} />
        <Textarea label="Message" {...register('message', required('Message'))} error={errors.message?.message} />
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send Message'}</Button>
      </form>
    </section>
  );
}
