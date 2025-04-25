
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AppDispatch, RootState } from '@/lib/store';
import { login, resetAuthError } from '@/lib/store/slices/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useToast } from '@/components/ui/use-toast';

interface LocationState {
  from?: {
    pathname: string;
  };
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const locationState = location.state as LocationState;
  const from = locationState?.from?.pathname || '/dashboard';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Validation Error',
        description: 'Please enter both email and password',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      await dispatch(login({ email, password })).unwrap();
      // Navigate to intended route or dashboard
      navigate(from, { replace: true });
    } catch (err) {
      // Error is handled by the reducer and displayed in the UI
    }
  };

  const handleDemoLogin = async (role: string) => {
    let demoEmail = '';
    
    switch (role) {
      case 'employee':
        demoEmail = 'john.smith@kombee.com';
        break;
      case 'intern':
        demoEmail = 'sarah.johnson@kombee.com';
        break;
      case 'mentor':
        demoEmail = 'michael.chen@kombee.com';
        break;
      case 'hr_admin':
        demoEmail = 'priya.patel@kombee.com';
        break;
      case 'team_lead':
        demoEmail = 'david.wilson@kombee.com';
        break;
      default:
        demoEmail = 'john.smith@kombee.com';
    }
    
    setEmail(demoEmail);
    setPassword('password');
    
    try {
      await dispatch(login({ email: demoEmail, password: 'password' })).unwrap();
      // Navigate to intended route or dashboard
      navigate(from, { replace: true });
    } catch (err) {
      // Error is handled by the reducer
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-kombee-background">
      <div className="w-full max-w-md p-6 space-y-8 bg-kombee-background-light rounded-xl shadow-xl border border-kombee-purple/20">
        <div className="text-center">
          <img 
            src="https://www.kombee.com/_next/static/media/logo-loader.34d8b33b.svg" 
            alt="Kombee Surat" 
            className="h-12 mx-auto"
          />
          <h2 className="mt-6 text-2xl font-bold text-white">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-400">
            Access the Kombee Training Portal
          </p>
        </div>
        
        <form className="space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="p-3 bg-red-900/30 border border-red-500/30 rounded-md text-sm text-red-300">
              {error}
            </div>
          )}
          
          <div className="space-y-1">
            <Label htmlFor="email" className="text-gray-300">Email address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) dispatch(resetAuthError());
              }}
              placeholder="Enter your email"
              className="bg-kombee-background border-kombee-purple/30 text-white placeholder:text-gray-500"
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="password" className="text-gray-300">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) dispatch(resetAuthError());
              }}
              placeholder="Enter your password"
              className="bg-kombee-background border-kombee-purple/30 text-white placeholder:text-gray-500"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-kombee-purple hover:bg-kombee-purple-dark" 
            disabled={loading}
          >
            {loading ? <LoadingSpinner size="small" /> : "Sign in"}
          </Button>
          
          <div className="pt-2">
            <p className="text-sm text-center text-gray-400 mt-4 mb-2">Demo Accounts (all use password: "password")</p>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleDemoLogin('employee')}
                className="text-xs border-kombee-purple/30 bg-transparent text-gray-300 hover:bg-kombee-purple/10"
              >
                Employee
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleDemoLogin('intern')}
                className="text-xs border-kombee-purple/30 bg-transparent text-gray-300 hover:bg-kombee-purple/10"
              >
                Intern
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleDemoLogin('mentor')}
                className="text-xs border-kombee-purple/30 bg-transparent text-gray-300 hover:bg-kombee-purple/10"
              >
                Mentor
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleDemoLogin('hr_admin')}
                className="text-xs border-kombee-purple/30 bg-transparent text-gray-300 hover:bg-kombee-purple/10"
              >
                HR Admin
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleDemoLogin('team_lead')}
                className="col-span-2 text-xs border-kombee-purple/30 bg-transparent text-gray-300 hover:bg-kombee-purple/10"
              >
                Team Lead
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
