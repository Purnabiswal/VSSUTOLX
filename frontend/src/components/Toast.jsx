import { useNotificationStore } from '../store/notificationStore';

export default function Toast() {
  const toast = useNotificationStore((state) => state.toast);
  if (!toast) return null;
  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm rounded-md bg-secondary px-4 py-3 text-sm font-semibold text-white shadow-soft">
      {toast.message}
    </div>
  );
}
