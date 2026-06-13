import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuthStore } from '../store/authStore';
import { emailValidation, required } from '../utils/validators';

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const registerUser = useAuthStore((state) => state.register);
  const navigate = useNavigate();
  const onSubmit = async (data) => { await registerUser(data); navigate('/dashboard'); };
  return (
    <section className="container-page grid min-h-[70vh] place-items-center py-10">
      <SEO title="Register" />
      <form onSubmit={handleSubmit(onSubmit)} className="surface w-full max-w-lg rounded-md p-6">
        <h1 className="text-2xl font-extrabold text-secondary">Create Account</h1>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <input
  {...register('name', required('Name'))}
/>
          <Input label="Department" {...register('department', required('Department'))} error={errors.department?.message} />
          <Input label="Email" className="sm:col-span-2" {...register('email', emailValidation)} error={errors.email?.message} />
          <Input label="Password" type="password" className="sm:col-span-2" {...register('password', required('Password'))} error={errors.password?.message} />
          <Button type="submit" className="sm:col-span-2">Register</Button>
        </div>
      </form>
    </section>
  );
}
