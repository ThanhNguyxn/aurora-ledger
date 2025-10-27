import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token');
      const name = searchParams.get('name');
      const error = searchParams.get('error');
      
      if (error) {
        toast.error('Google login failed. Please try again.');
        navigate('/login');
        return;
      }
      
      if (token) {
        try {
          // Save token and set axios header
          localStorage.setItem('token', token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Decode JWT to get user info
          const payload = JSON.parse(atob(token.split('.')[1]));
          
          // Create user object
          const userData = {
            id: payload.id,
            email: payload.email,
            full_name: name || 'User'
          };
          
          // Save user data
          localStorage.setItem('user', JSON.stringify(userData));
          
          // Show welcome message
          toast.success(`Welcome back, ${name || 'User'}!`);
          
          // Redirect to dashboard
          window.location.href = '/dashboard';
        } catch (err) {
          console.error('Error processing OAuth callback:', err);
          toast.error('Authentication failed');
          navigate('/login');
        }
      } else {
        toast.error('Authentication failed');
        navigate('/login');
      }
    };
    
    handleCallback();
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

