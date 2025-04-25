
import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { mockUsers } from '@/lib/mockData';
import { UserRole, User } from '@/types';
import { CreateEditUserDialog } from '@/components/admin/users/CreateEditUserDialog';
import { DeleteUserDialog } from '@/components/admin/users/DeleteUserDialog';
import { getRoleDisplayName } from '@/lib/utils/permissions';

const UsersManagement = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  if (!isAdmin) {
    return navigate('/unauthorized');
  }

  const handleCreateUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: `user${users.length + 1}`,
      joinDate: new Date().toISOString(),
    };
    setUsers([...users, newUser]);
    toast({
      title: 'Success',
      description: 'User created successfully',
    });
    setIsCreateDialogOpen(false);
  };

  const handleEditUser = (userData: User) => {
    const updatedUsers = users.map(user => 
      user.id === userData.id ? userData : user
    );
    setUsers(updatedUsers);
    toast({
      title: 'Success',
      description: 'User updated successfully',
    });
    setIsEditDialogOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      const filteredUsers = users.filter(user => user.id !== selectedUser.id);
      setUsers(filteredUsers);
      toast({
        title: 'Success',
        description: 'User deleted successfully',
      });
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">User Management</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <UserPlus className="mr-2" />
          Add User
        </Button>
      </div>

      <div className="bg-kombee-background-light rounded-lg border border-kombee-purple/20">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Role</TableHead>
              <TableHead className="text-white">Department</TableHead>
              <TableHead className="text-white">Position</TableHead>
              <TableHead className="text-white">Join Date</TableHead>
              <TableHead className="text-white text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-kombee-purple/5">
                <TableCell className="text-white font-medium">{user.name}</TableCell>
                <TableCell className="text-gray-300">{user.email}</TableCell>
                <TableCell className="text-gray-300">{getRoleDisplayName(user.role)}</TableCell>
                <TableCell className="text-gray-300">{user.department || '-'}</TableCell>
                <TableCell className="text-gray-300">{user.position || '-'}</TableCell>
                <TableCell className="text-gray-300">
                  {new Date(user.joinDate || '').toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2 hover:bg-kombee-purple/20"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4 text-kombee-purple" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-red-500/20"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CreateEditUserDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateUser}
      />

      <CreateEditUserDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleEditUser}
        user={selectedUser}
        mode="edit"
      />

      <DeleteUserDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteUser}
        user={selectedUser}
      />
    </div>
  );
};

export default UsersManagement;
