import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Bed, 
  Calendar, 
  Users, 
  FileText, 
  CreditCard,
  UserCircle,
  CheckSquare
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/utils/cn';

export function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  const adminLinks = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/rooms', icon: Bed, label: 'Rooms' },
    { to: '/admin/bookings', icon: Calendar, label: 'Bookings' },
    { to: '/admin/users', icon: Users, label: 'Users' },
    { to: '/admin/reports', icon: FileText, label: 'Reports' }
  ];

  const receptionistLinks = [
    { to: '/receptionist', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/receptionist/check-in', icon: CheckSquare, label: 'Check-in' },
    { to: '/receptionist/check-out', icon: CheckSquare, label: 'Check-out' },
    { to: '/receptionist/payments', icon: CreditCard, label: 'Payments' }
  ];

  const customerLinks = [
    { to: '/customer', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/customer/book', icon: Calendar, label: 'Book Room' },
    { to: '/customer/bookings', icon: Calendar, label: 'My Bookings' },
    { to: '/customer/profile', icon: UserCircle, label: 'Profile' }
  ];

  const links = user?.role === 'admin' 
    ? adminLinks 
    : user?.role === 'receptionist' 
    ? receptionistLinks 
    : customerLinks;

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-800 min-h-screen p-4">
      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;
          
          return (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
