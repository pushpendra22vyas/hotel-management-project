import { Link, useLocation } from 'react-router-dom';
import { Hotel, Moon, Sun, User, LogOut } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const isPublicRoute = ['/', '/about', '/rooms', '/contact', '/login'].includes(location.pathname);

  return (
    <nav className="border-b bg-white dark:bg-gray-900 dark:border-gray-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Hotel className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl">Luxury Stay</span>
          </Link>

          <div className="flex items-center space-x-6">
            {isPublicRoute && !isAuthenticated && (
              <>
                <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Home</Link>
                <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">About</Link>
                <Link to="/rooms" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Rooms</Link>
                <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Contact</Link>
              </>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button size="sm">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
