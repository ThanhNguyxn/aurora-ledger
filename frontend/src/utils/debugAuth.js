// Debug utility to check authentication status

export const debugAuthToken = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  console.group('🔐 Authentication Debug');
  console.log('Has Token:', !!token);
  console.log('Has User:', !!user);
  
  if (token) {
    console.log('Token Length:', token.length);
    console.log('Token Preview:', token.substring(0, 30) + '...');
    
    // Try to decode JWT (without verification)
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const decoded = JSON.parse(jsonPayload);
      console.log('Token Payload:', decoded);
      console.log('Token Issued:', new Date(decoded.iat * 1000).toLocaleString());
      console.log('Token Expires:', new Date(decoded.exp * 1000).toLocaleString());
      console.log('Is Expired:', Date.now() > decoded.exp * 1000);
    } catch (e) {
      console.error('Failed to decode token:', e);
    }
  }
  
  if (user) {
    try {
      const userData = JSON.parse(user);
      console.log('User Data:', userData);
    } catch (e) {
      console.error('Failed to parse user data:', e);
    }
  }
  
  console.groupEnd();
};

export const clearAuthAndReload = () => {
  console.log('🔄 Clearing authentication and reloading...');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

