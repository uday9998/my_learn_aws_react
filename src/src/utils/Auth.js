import { logout } from 'api';

export default {
   setToken: (token) => {
      return localStorage.setItem('authToken', token);
   },
   getToken: () => {
      return localStorage.getItem('authToken');
   },
   isTokenExists: () => {
      return !!localStorage.getItem('authToken');
   },
   logout: () => {
      const token = localStorage.getItem('authToken');
      
      // Remove token first to prevent new API calls
      localStorage.removeItem('authToken');
      
      // Then make logout API call (optional since token is already cleared)
      if (token) {
         logout(token).catch(error => {
            // Silently handle logout API errors since user is already logged out locally
         });
      }
   },
};