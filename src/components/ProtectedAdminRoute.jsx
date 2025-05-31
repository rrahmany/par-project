import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const ProtectedAdminRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  
  // تنظیمات دسترسی ادمین
  const isAdmin = user && 
    user.email === "admin@example.com" && 
    user.password === "admin123"; // رمز عبور پیش‌فرض

  if (!isAdmin) {
    return <Navigate to="/account" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;