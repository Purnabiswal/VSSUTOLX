import { useForm } from 'react-hook-form';
import SEO from '../components/SEO';
import Button from '../components/Button';
import Input from '../components/Input';
import { authService } from '../services';
import { useNotificationStore } from '../store/notificationStore';
import { emailValidation } from '../utils/validators';

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const pushToast = useNotificationStore((state) => state.pushToast);
  const onSubmit = async ({ email }) => {
    try {
      const res = await authService.forgotPassword(email);
      pushToast({ message: res.message });
    } catch (err) {
      pushToast({ message: err.message });
    }
  };
  return (
    <section className="container-page grid min-h-[70vh] place-items-center py-10">
      <SEO title="Forgot Password" />
      <form onSubmit={handleSubmit(onSubmit)} className="surface w-full max-w-md rounded-md p-6">
        <h1 className="text-2xl font-extrabold text-secondary">Reset Password</h1>
        <div className="mt-6 grid gap-4"><Input label="Email" {...register('email', emailValidation)} error={errors.email?.message} /><Button type="submit">Send reset link</Button></div>
      </form>
    </section>
  );
}
