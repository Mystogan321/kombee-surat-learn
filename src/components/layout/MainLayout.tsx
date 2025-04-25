
import { ReactNode } from 'react';
import { SidebarNavigation } from './SidebarNavigation';
import { useAuth } from '@/hooks/use-auth';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { user } = useAuth();
  const { notifications } = useSelector((state: RootState) => state.notifications);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-kombee-background text-white">
      <SidebarNavigation />

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-kombee-background-light border-b border-kombee-purple/20 shadow-md px-4 py-3 lg:px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium ml-10 lg:ml-0">Kombee Training Portal</h1>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-300 hover:text-white hover:bg-kombee-purple/20"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge 
                      className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center p-0 bg-kombee-purple"
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </div>
              
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img 
                    src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} 
                    alt={user?.name || 'User'} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium">{user?.name}</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="p-4 lg:p-6 pt-6">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="border-t border-kombee-purple/20 px-4 py-3 lg:px-6">
          <div className="text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Kombee Surat. All rights reserved.
          </div>
        </footer>
      </div>
      
      {/* Toast notifications */}
      <Toaster />
      <Sonner />
    </div>
  );
};
