import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SEO } from '../components';
import { Button } from '../components';
import { Input } from '../components';
import { useAuthStore } from '../store';
import { useNotificationStore } from '../store';
import { emailValidation, required } from '../utils';
import { AuthModal } from '../components';



export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const pushToast = useNotificationStore((state) => state.pushToast);
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate('/dashboard');
    } catch (err) {
      pushToast({ message: err.message });
    }
  };

  return (
    <AuthModal title="Login">
      <SEO title="Login" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6 grid gap-4">
          <Input label="Email" {...register('email', emailValidation)} error={errors.email?.message} />
          <Input label="Password" type="password" {...register('password', required('Password'))} error={errors.password?.message} />
          <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</Button>
        </div>
        <div className="mt-4 flex justify-between text-sm text-slate-500"><Link to="/forgot-password">Forgot password?</Link>
          <Link
            to="/register"
            replace
            state={{
              backgroundLocation:
                location.state?.backgroundLocation || location
            }}
          >
            Create account
          </Link>
        </div>
      </form>
    </AuthModal>
  );
}
