
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Book, FileText, FileVideo, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  if (!isAdmin) {
    return navigate('/unauthorized');
  }

  const adminModules = [
    {
      title: 'Manage Users',
      icon: Users,
      description: 'Create, edit, and manage user accounts',
      path: '/admin/users'
    },
    {
      title: 'Manage Courses',
      icon: Book,
      description: 'Create and organize training courses',
      path: '/admin/courses'
    },
    {
      title: 'Content Library',
      icon: FileText,
      description: 'Upload and manage PDFs, notes, and documents',
      path: '/admin/content'
    },
    {
      title: 'Video Library',
      icon: FileVideo,
      description: 'Upload and manage training videos',
      path: '/admin/videos'
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminModules.map((module) => (
          <Card 
            key={module.title} 
            className="bg-kombee-background-light border-kombee-purple/20 hover:border-kombee-purple/40 transition-all cursor-pointer"
            onClick={() => navigate(module.path)}
          >
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-white">
                <module.icon className="mr-2 h-5 w-5 text-kombee-purple" />
                {module.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">{module.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
