import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const PrivateRoute = ({ children, role }) => {
  const { user } = useContext(UserContext);

  if (!user || (role && user.role !== role)) {
    return <Navigate to="/account" />;
  }

  return children;
};

export default PrivateRoute;