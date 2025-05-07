import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// PrivateRoute component that wraps the protected route
const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();  // Accessing the authentication status from context

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/login" replace />}  // Redirect to login if not authenticated
    />
  );
};

export default PrivateRoute;
