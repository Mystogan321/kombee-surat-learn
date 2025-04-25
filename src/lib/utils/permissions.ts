
import { UserRole, Permission } from '@/types';

// Define role-based permissions
const rolePermissions: Record<UserRole, Permission[]> = {
  employee: [
    'view_courses', 
    'enroll_courses', 
    'take_assessments'
  ],
  intern: [
    'view_courses', 
    'enroll_courses', 
    'take_assessments'
  ],
  mentor: [
    'view_courses', 
    'enroll_courses', 
    'create_courses',
    'edit_courses',
    'view_users',
    'create_assessments',
    'take_assessments',
    'grade_assessments',
    'view_all_progress'
  ],
  hr_admin: [
    'view_courses',
    'enroll_courses',
    'create_courses',
    'edit_courses',
    'delete_courses',
    'view_users',
    'manage_users',
    'view_reports',
    'create_assessments',
    'take_assessments',
    'grade_assessments',
    'view_all_progress'
  ],
  team_lead: [
    'view_courses',
    'enroll_courses',
    'create_courses',
    'edit_courses',
    'view_users',
    'view_reports',
    'create_assessments',
    'take_assessments',
    'grade_assessments',
    'view_all_progress'
  ],
};

// Check if user has specific permission
export const hasPermission = (role: UserRole | undefined, permission: Permission): boolean => {
  if (!role) return false;
  return rolePermissions[role]?.includes(permission) || false;
};

// Get all permissions for a role
export const getPermissionsForRole = (role: UserRole): Permission[] => {
  return rolePermissions[role] || [];
};

// Check if user has admin-level permissions
export const isAdmin = (role: UserRole | undefined): boolean => {
  return role === 'hr_admin';
};

// Check if user has any content creation permissions
export const canCreateContent = (role: UserRole | undefined): boolean => {
  if (!role) return false;
  return hasPermission(role, 'create_courses');
};

// Check if user can manage other users
export const canManageUsers = (role: UserRole | undefined): boolean => {
  if (!role) return false;
  return hasPermission(role, 'manage_users');
};

// Get role display name
export const getRoleDisplayName = (role: UserRole): string => {
  switch (role) {
    case 'employee': return 'Employee';
    case 'intern': return 'Intern';
    case 'mentor': return 'Mentor';
    case 'hr_admin': return 'HR Admin';
    case 'team_lead': return 'Team Lead';
    default: return 'User';
  }
};

// Get role badge color class
export const getRoleBadgeColor = (role: UserRole): string => {
  switch (role) {
    case 'employee': return 'bg-blue-500';
    case 'intern': return 'bg-green-500';
    case 'mentor': return 'bg-yellow-500';
    case 'hr_admin': return 'bg-red-500';
    case 'team_lead': return 'bg-purple-500';
    default: return 'bg-gray-500';
  }
};
