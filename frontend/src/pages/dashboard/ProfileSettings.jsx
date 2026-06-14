import { useForm } from 'react-hook-form';
import SEO from '../../components/SEO';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuthStore } from '../../store/authStore';
import { userService } from '../../services';
import { useNotificationStore } from '../../store/notificationStore';
import { whatsappValidation } from '../../utils/validators';
import { fieldErrors } from '../../utils/apiErrors';

export default function ProfileSettings() {
  const user = useAuthStore((state) => state.user);
  const hydrateCurrentUser = useAuthStore((state) => state.hydrateCurrentUser);
  const { register, handleSubmit, setError, formState: { errors } } = useForm({ values: user || {} });
  const pushToast = useNotificationStore((state) => state.pushToast);
  const onSubmit = async (data) => {
    try {
      await userService.updateProfile(data);
      await hydrateCurrentUser();
      pushToast({ message: 'Profile updated' });
    } catch (err) {
      Object.entries(fieldErrors(err)).forEach(([field, message]) => setError(field, { type: 'server', message }));
      pushToast({ message: err.message });
    }
  };
  return (
    <div>
      <SEO title="Profile Settings" />
      <h1 className="mb-6 text-3xl font-extrabold text-secondary">Profile Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="surface grid max-w-2xl gap-4 rounded-md p-5">
        <Input label="Name" {...register('name')} error={errors.name?.message} />
        <Input label="Email" {...register('email')} disabled />
        <Input label="Branch" {...register('branch')} error={errors.branch?.message} />
        <Input label="Year" type="number" min="1" max="5" {...register('year')} error={errors.year?.message} />
        <Input label="WhatsApp Number" inputMode="numeric" maxLength="10" {...register('whatsappNumber', whatsappValidation)} error={errors.whatsappNumber?.message} />
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
}
