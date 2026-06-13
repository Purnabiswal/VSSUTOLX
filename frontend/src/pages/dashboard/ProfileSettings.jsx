import { useForm } from 'react-hook-form';
import SEO from '../../components/SEO';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuthStore } from '../../store/authStore';
import { userService } from '../../services/userService';
import { useNotificationStore } from '../../store/notificationStore';

export default function ProfileSettings() {
  const user = useAuthStore((state) => state.user);
  const { register, handleSubmit } = useForm({ values: user || {} });
  const pushToast = useNotificationStore((state) => state.pushToast);
  const onSubmit = async (data) => { await userService.updateProfile(data); pushToast({ message: 'Profile updated' }); };
  return (
    <div>
      <SEO title="Profile Settings" />
      <h1 className="mb-6 text-3xl font-extrabold text-secondary">Profile Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="surface grid max-w-2xl gap-4 rounded-md p-5">
        <Input label="Name" {...register('name')} />
        <Input label="Email" {...register('email')} />
        <Input label="Department" {...register('department')} />
        <Input label="Location" {...register('location')} />
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
}
