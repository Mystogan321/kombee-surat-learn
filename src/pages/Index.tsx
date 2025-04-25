
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    // Redirect to appropriate page based on auth status
    if (!loading) {
      if (isAuthenticated) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-kombee-background">
      <LoadingSpinner size="large" />
    </div>
  );
};

export default Index;
