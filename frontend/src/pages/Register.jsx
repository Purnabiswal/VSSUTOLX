import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { SEO } from '../components';
import { Button } from '../components';
import { Input } from '../components';
import { useAuthStore } from '../store';
import { useNotificationStore } from '../store';
import { emailValidation, required } from '../utils';
import { AuthModal } from '../components';


export default function Register() {
  const location = useLocation();
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
    <AuthModal title="Register">
      <SEO title="Register" />
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="mt-6 flex flex-col gap-4">
          <Input
            label="Full name"
            {...register('name', required('Name'))}
            error={errors.name?.message}
          />

          <Input
            label="Branch"
            {...register('branch', required('Branch'))}
            error={errors.branch?.message}
          />

          <Input
            label="Year"
            type="number"
            min="1"
            max="5"
            {...register('year')}
            error={errors.year?.message}
          />

          <Input
            label="Email"
            {...register('email', emailValidation)}
            error={errors.email?.message}
          />

          <Input
            label="Password"
            type="password"
            {...register('password', required('Password'))}
            error={errors.password?.message}
          />

          <Button type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </Button>
          <div className="mt-4 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              replace
              className="text-primary"
              state={{
                backgroundLocation:
                  location.state?.backgroundLocation || location
              }}
            >
              Login
            </Link>
          </div>
        </div>
      </form>
    </AuthModal>
  );
}
