import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../lib/api';
import toast from 'react-hot-toast';
import { Users, Check, Loader2, AlertCircle } from 'lucide-react';

export default function JoinFamily() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [familyInfo, setFamilyInfo] = useState(null);

  const handleJoin = useCallback(async (code) => {
    try {
      console.log('Attempting to join family with code:', code);
      setLoading(true);
      setError(null);
      
      const response = await api.post('/families/join', { code: code.trim().toUpperCase() });
      
      console.log('Join response:', response.data);
      setFamilyInfo(response.data.family);
      toast.success(response.data.message || 'Successfully joined family!');
      
      // Redirect to family page after 2 seconds
      setTimeout(() => {
        navigate('/family');
      }, 2000);
    } catch (err) {
      console.error('Error joining family:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      
      const errorMsg = err.response?.data?.error || 'Failed to join family';
      
      if (err.response?.status === 404) {
        setError('Invalid or expired invite code. Please check the code and try again.');
      } else if (err.response?.status === 400) {
        setError(errorMsg);
      } else if (err.response?.status === 403 || err.response?.status === 401) {
        setError('Authentication error. Please log in first.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(errorMsg);
      }
      
      toast.error(errorMsg);
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const code = searchParams.get('code');
    
    console.log('JoinFamily loaded, code from URL:', code);
    
    if (!code) {
      setError('No invite code provided in URL');
      setLoading(false);
      return;
    }

    // Auto-join with the code
    handleJoin(code);
  }, [searchParams, handleJoin]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <Loader2 className="h-16 w-16 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Joining Family...
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please wait while we process your invite
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Unable to Join Family
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {error}
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 rounded p-3 mb-6 text-sm text-left">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Invite Code:</strong> {searchParams.get('code') || 'Not found'}
                </p>
                <p className="text-gray-500 dark:text-gray-400 mt-2 text-xs">
                  Check browser console (F12) for detailed error logs
                </p>
              </div>
              <button
                onClick={() => {
                  const code = searchParams.get('code');
                  if (code) {
                    handleJoin(code);
                  }
                }}
                className="w-full mb-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Try Again
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate('/family')}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Go to Families
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Successfully Joined!
            </h2>
            {familyInfo && (
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Welcome to <span className="font-semibold">{familyInfo.name}</span>
              </p>
            )}
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
              Redirecting to family page...
            </p>
            <button
              onClick={() => navigate('/family')}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Family Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

