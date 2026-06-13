import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { dashboardNav } from '../constants/navigation';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-appbg">
      <Navbar />
      <div className="container-page grid gap-6 py-8 lg:grid-cols-[260px_1fr]">
        <Sidebar title="Dashboard" items={dashboardNav} />
        <main className="min-w-0"><Outlet /></main>
      </div>
    </div>
  );
}
