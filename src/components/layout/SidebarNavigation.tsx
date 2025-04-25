
import { Fragment, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { 
  Book, 
  Home, 
  BarChart, 
  Users, 
  Award,
  FileText,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/store';
import { logout } from '@/lib/store/slices/authSlice';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  requiredPermission?: string;
  adminOnly?: boolean;
}

export const SidebarNavigation = () => {
  const { user, hasPermission, isAdmin } = useAuth();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navigation: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Courses', href: '/courses', icon: Book },
    { name: 'Assessments', href: '/assessments', icon: FileText },
    { name: 'Certificates', href: '/certificates', icon: Award },
    { name: 'Reports', href: '/reports', icon: BarChart, requiredPermission: 'view_reports' },
    { name: 'Users', href: '/users', icon: Users, requiredPermission: 'view_users' },
  ];

  const filteredNavigation = navigation.filter(item => {
    if (item.adminOnly && !isAdmin) return false;
    if (item.requiredPermission && !hasPermission(item.requiredPermission as any)) return false;
    return true;
  });

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(prev => !prev)}
          className="bg-kombee-background-light border-kombee-purple/30"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5 text-kombee-purple" />
          ) : (
            <Menu className="h-5 w-5 text-kombee-purple" />
          )}
        </Button>
      </div>

      {/* Sidebar for desktop and mobile */}
      <div
        className={cn(
          'bg-kombee-background-light text-white fixed z-30 h-full transition-all duration-300 ease-in-out',
          isMobileMenuOpen 
            ? 'left-0 w-64' 
            : 'left-[-100%] lg:left-0 w-64'
        )}
      >
        <div className="flex flex-col h-full">
          <div className="px-4 py-6 border-b border-kombee-purple/20">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="https://www.kombee.com/_next/static/media/logo-loader.34d8b33b.svg" 
                alt="Kombee Surat" 
                className="h-8"
              />
            </div>
            {user && (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-kombee-purple mb-2">
                  <img 
                    src={user.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-sm font-medium">{user.name}</h3>
                <p className="text-xs text-gray-400">{user.position}</p>
              </div>
            )}
          </div>

          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {filteredNavigation.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) => cn(
                      'flex items-center px-4 py-3 text-sm rounded-md transition-colors',
                      isActive 
                        ? 'bg-kombee-purple text-white font-medium' 
                        : 'text-gray-300 hover:bg-kombee-purple/20'
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="px-4 py-6 border-t border-kombee-purple/20">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center bg-transparent border-kombee-purple/30 hover:bg-kombee-purple/20 text-white"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};
