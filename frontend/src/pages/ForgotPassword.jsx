import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Copy, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetUrl, setResetUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, {
        email,
      });
      
      // Get reset URL from response (always available now)
      const url = response.data.resetUrl || response.data.devResetUrl;
      
      if (url) {
        setResetUrl(url);
        toast.success('Password reset link generated!');
      } else {
        toast.error('Failed to generate reset link');
      }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to generate reset link';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(resetUrl);
    toast.success('Link copied to clipboard!');
  };

  const handleOpenLink = () => {
    // Extract token from URL
    const token = new URL(resetUrl).searchParams.get('token');
    if (token) {
      navigate(`/reset-password?token=${token}`);
    }
  };

  if (resetUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-2xl w-full">
          <div className="card">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">Password Reset Link Generated!</h2>
            <p className="text-gray-600 text-center mb-6">
              Click the button below to reset your password for <strong>{email}</strong>
            </p>

            <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Your reset link:</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={resetUrl}
                  readOnly
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-sm font-mono"
                />
                <button
                  onClick={handleCopyLink}
                  className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  title="Copy link"
                >
                  <Copy size={18} />
                </button>
              </div>
              <p className="text-xs text-amber-600 mt-2">⏰ This link expires in 1 hour</p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleOpenLink}
                className="btn btn-primary w-full"
              >
                Reset Password Now
              </button>
              <Link
                to="/login"
                className="btn btn-secondary w-full text-center"
              >
                Back to Login
              </Link>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                💡 <strong>Tip:</strong> You can also copy this link and open it later, but it will expire in 1 hour.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            AuroraLedger
          </h1>
          <p className="text-gray-600">Reset your password</p>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-6">
            <Mail className="text-blue-600" />
            <h2 className="text-2xl font-bold">Forgot Password</h2>
          </div>

          <p className="text-gray-600 mb-6">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                required
                placeholder="your@email.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              <ArrowLeft size={14} />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

