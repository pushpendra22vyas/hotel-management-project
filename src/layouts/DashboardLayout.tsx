import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/shared/Navbar';
import { Sidebar } from '@/components/shared/Sidebar';

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
