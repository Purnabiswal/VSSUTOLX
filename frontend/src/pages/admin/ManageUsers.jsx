import { useEffect, useState } from 'react';
import SEO from '../../components/SEO';
import Avatar from '../../components/Avatar';
import Badge from '../../components/Badge';
import { adminService } from '../../services/adminService';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => { adminService.getUsers().then(setUsers); }, []);
  return <div><SEO title="Manage Users" /><h1 className="mb-6 text-3xl font-extrabold text-secondary">Manage Users</h1><div className="surface rounded-md">{users.map((user) => <div key={user.id} className="flex items-center gap-4 border-b border-slate-100 p-4 last:border-b-0"><Avatar src={user.avatar} name={user.name} /><div className="flex-1"><p className="font-bold text-secondary">{user.name}</p><p className="text-sm text-slate-500">{user.email}</p></div><Badge tone={user.role === 'admin' ? 'blue' : 'slate'}>{user.role}</Badge></div>)}</div></div>;
}
