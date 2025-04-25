
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Permission } from '@/types';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermission?: Permission;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ 
  children, 
  requiredPermission, 
  requireAdmin = false 
}: ProtectedRouteProps) => {
  const { isAuthenticated, loading, hasPermission, isAdmin } = useAuth();
  const location = useLocation();

  // Show loading indicator while checking auth status
  if (loading) {
    return <LoadingSpinner />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check specific permission if required
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check admin status if required
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render children if all checks pass
  return <>{children}</>;
};
