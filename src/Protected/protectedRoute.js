import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../Hook/useAuthContext';

const ProtectedRoute = ({ element }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
