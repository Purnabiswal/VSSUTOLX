import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';
import { emailValidation, required } from '../utils/validators';

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const registerUser = useAuthStore((state) => state.register);
  const loading = useAuthStore((state) => state.loading);
  const pushToast = useNotificationStore((state) => state.pushToast);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      navigate('/dashboard');
    } catch (err) {
      pushToast({ message: err.message });
    }
  };

  return (
    <section className="container-page grid min-h-[70vh] place-items-center py-10">
      <SEO title="Register" />
      <form onSubmit={handleSubmit(onSubmit)} className="surface w-full max-w-lg rounded-md p-6">
        <h1 className="text-2xl font-extrabold text-secondary">Create Account</h1>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Input label="Full name" {...register('name', required('Name'))} error={errors.name?.message} />
          <Input label="Branch" {...register('branch', required('Branch'))} error={errors.branch?.message} />
          <Input label="Year" type="number" min="1" max="5" {...register('year')} error={errors.year?.message} />
          <Input label="Email" className="sm:col-span-2" {...register('email', emailValidation)} error={errors.email?.message} />
          <Input label="Password" type="password" className="sm:col-span-2" {...register('password', required('Password'))} error={errors.password?.message} />
          <Button type="submit" className="sm:col-span-2" disabled={loading}>{loading ? 'Creating account...' : 'Register'}</Button>
        </div>
      </form>
    </section>
  );
}
