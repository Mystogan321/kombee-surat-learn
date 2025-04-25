
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { hasPermission, isAdmin, canCreateContent, canManageUsers } from '@/lib/utils/permissions';
import { Permission, UserRole } from '@/types';

export function useAuth() {
  const { user, isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);
  
  return {
    user,
    isAuthenticated,
    loading,
    error,
    // Role-based helpers
    role: user?.role as UserRole | undefined,
    hasPermission: (permission: Permission) => hasPermission(user?.role, permission),
    isAdmin: isAdmin(user?.role),
    canCreateContent: canCreateContent(user?.role),
    canManageUsers: canManageUsers(user?.role),
  };
}
