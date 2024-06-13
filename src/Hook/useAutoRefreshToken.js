// hooks/useAutoRefreshToken.js
import { useEffect } from 'react';
import { useAuthContext } from './useAuthContext';

export const useAutoRefreshToken = () => {
  const { dispatch } = useAuthContext();

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    const user = JSON.parse(localStorage.getItem('user'));
    
    const checkTokenExpiration = () => {
      if (user && refreshToken) {
        const tokenExpiration = new Date(user.tokenExpiration);
        const now = new Date();

        // Check if token has expired
        if (tokenExpiration <= now) {
          refreshAccessToken();
        }
      }
    };

    const refreshAccessToken = async () => {
      const response = await fetch('http://localhost:4000/api/user/refreshToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: refreshToken }),
      });
      const json = await response.json();

      if (response.ok) {
        // Update the user token in local storage
        localStorage.setItem('user', JSON.stringify({ ...user, token: json.token }));

        // Update the auth context
        dispatch({ type: 'LOGIN', payload: { ...user, token: json.token } });
      } else {
        // Handle refresh token failure
        console.error('Failed to refresh token:', json.error);
      }
    };

    checkTokenExpiration();

    // Check token expiration every minute
    const interval = setInterval(checkTokenExpiration, 60 * 1000); // 1 minute

    return () => clearInterval(interval);
  }, [dispatch]);
};
