import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { adminNav } from '../constants/navigation';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-appbg">
      <Navbar />
      <div className="container-page grid gap-6 py-8 lg:grid-cols-[260px_1fr]">
        <Sidebar title="Admin" items={adminNav} />
        <main className="min-w-0"><Outlet /></main>
      </div>
    </div>
  );
}
