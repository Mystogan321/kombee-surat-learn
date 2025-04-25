
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-kombee-background">
      <div className="max-w-md p-6 text-center">
        <h1 className="text-6xl font-bold text-kombee-purple mb-4">403</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Access Denied</h2>
        <p className="text-gray-400 mb-6">
          You don't have permission to access this page.
          Please contact your administrator if you believe this is an error.
        </p>
        <div className="flex justify-center">
          <Button asChild className="bg-kombee-purple hover:bg-kombee-purple-dark">
            <Link to="/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
