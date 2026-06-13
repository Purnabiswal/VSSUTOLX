import SEO from '../../components/SEO';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import { useNotificationStore } from '../../store/notificationStore';
import { formatDate } from '../../utils/formatters';

export default function Notifications() {
  const { notifications, markAllRead } = useNotificationStore();
  return (
    <div>
      <SEO title="Notifications" />
      <div className="mb-6 flex items-center justify-between"><h1 className="text-3xl font-extrabold text-secondary">Notifications</h1><Button variant="outline" onClick={markAllRead}>Mark all read</Button></div>
      <div className="surface rounded-md">
        {notifications.map((item) => <div key={item.id} className="border-b border-slate-100 p-4 last:border-b-0"><div className="flex items-center gap-2"><h3 className="font-bold text-secondary">{item.title}</h3>{!item.read && <Badge tone="blue">New</Badge>}</div><p className="mt-1 text-sm text-slate-500">{item.body}</p><p className="mt-2 text-xs text-slate-400">{formatDate(item.createdAt)}</p></div>)}
      </div>
    </div>
  );
}
