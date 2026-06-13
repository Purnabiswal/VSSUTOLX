import { FaStar } from 'react-icons/fa';
import Avatar from './Avatar';
import Button from './Button';

export default function ProfileCard({ user, action = 'View Profile' }) {
  return (
    <div className="surface rounded-md p-5">
      <div className="flex items-center gap-4">
        <Avatar src={user.avatar} name={user.name} size="lg" />
        <div>
          <h3 className="font-bold text-secondary">{user.name}</h3>
          <p className="text-sm text-slate-500">{user.branch || 'VSSUT'}{user.year ? ` · Year ${user.year}` : ''}</p>
          <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-amber-600"><FaStar /> {user.rating || 'New'}</p>
        </div>
      </div>
      <Button to={`/sellers/${user.id}`} className="mt-4 w-full" variant="outline">{action}</Button>
    </div>
  );
}
