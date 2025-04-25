
import { useForm } from 'react-hook-form';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { User, UserRole } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CreateEditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: User | Omit<User, 'id'>) => void;
  user?: User | null;
  mode?: 'create' | 'edit';
}

export const CreateEditUserDialog = ({
  open,
  onOpenChange,
  onSubmit,
  user,
  mode = 'create'
}: CreateEditUserDialogProps) => {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<User>({
    defaultValues: user || {
      name: '',
      email: '',
      role: 'employee',
      department: '',
      position: '',
    }
  });

  const roles: UserRole[] = ['employee', 'intern', 'mentor', 'hr_admin', 'team_lead'];

  const onSubmitForm = (data: User) => {
    if (mode === 'edit' && user) {
      onSubmit({ ...data, id: user.id });
    } else {
      onSubmit(data);
    }
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-kombee-background-light border-kombee-purple/20">
        <DialogHeader>
          <DialogTitle className="text-white">
            {mode === 'create' ? 'Create New User' : 'Edit User'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Name</Label>
            <Input
              id="name"
              {...register('name', { required: 'Name is required' })}
              className="bg-kombee-background border-kombee-purple/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="bg-kombee-background border-kombee-purple/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-white">Role</Label>
            <Select 
              defaultValue={user?.role || 'employee'}
              onValueChange={(value: UserRole) => setValue('role', value)}
            >
              <SelectTrigger className="bg-kombee-background border-kombee-purple/20 text-white">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent className="bg-kombee-background-light border-kombee-purple/20">
                {roles.map((role) => (
                  <SelectItem 
                    key={role} 
                    value={role}
                    className="text-white hover:bg-kombee-purple/20"
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department" className="text-white">Department</Label>
            <Input
              id="department"
              {...register('department')}
              className="bg-kombee-background border-kombee-purple/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position" className="text-white">Position</Label>
            <Input
              id="position"
              {...register('position')}
              className="bg-kombee-background border-kombee-purple/20 text-white"
            />
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="border-kombee-purple/20 text-white hover:bg-kombee-purple/20"
            >
              Cancel
            </Button>
            <Button type="submit">
              {mode === 'create' ? 'Create User' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
