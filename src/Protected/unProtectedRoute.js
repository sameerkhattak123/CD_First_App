import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../Hook/useAuthContext';

const UnprotectedRoute = ({ element, redirectTo = '/' }) => {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  return element;
};

export default UnprotectedRoute;
