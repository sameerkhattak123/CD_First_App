import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../Hook/useAuthContext';

const AdminProtectedRoute = ({ element }) => {
  const { user } = useAuthContext();

  // Check if user is not defined or user.role is not 'admin'
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default AdminProtectedRoute;

