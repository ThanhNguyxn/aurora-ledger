import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const name = searchParams.get('name');
    const error = searchParams.get('error');
    
    if (error) {
      toast.error('Google login failed. Please try again.');
      navigate('/login');
      return;
    }
    
    if (token) {
      // Save token
      localStorage.setItem('token', token);
      
      // Show welcome message
      if (name) {
        toast.success(`Welcome back, ${name}!`);
      }
      
      // Redirect to dashboard
      navigate('/dashboard');
    } else {
      toast.error('Authentication failed');
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Signing you in...</p>
      </div>
    </div>
  );
}

