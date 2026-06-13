import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuthStore } from '../store/authStore';
import { emailValidation, required } from '../utils/validators';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { email: 'ananya@vssut.ac.in', password: 'password' } });
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const onSubmit = async (data) => { await login(data); navigate('/dashboard'); };
  return (
    <section className="container-page grid min-h-[70vh] place-items-center py-10">
      <SEO title="Login" />
      <form onSubmit={handleSubmit(onSubmit)} className="surface w-full max-w-md rounded-md p-6">
        <h1 className="text-2xl font-extrabold text-secondary">Login</h1>
        <div className="mt-6 grid gap-4">
          <Input label="Email" {...register('email', emailValidation)} error={errors.email?.message} />
          <Input label="Password" type="password" {...register('password', required('Password'))} error={errors.password?.message} />
          <Button type="submit" className="w-full">Login</Button>
        </div>
        <div className="mt-4 flex justify-between text-sm text-slate-500"><Link to="/forgot-password">Forgot password?</Link><Link to="/register">Create account</Link></div>
      </form>
    </section>
  );
}
