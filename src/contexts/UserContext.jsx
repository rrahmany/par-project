import React, { createContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = useCallback(async (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        setUser(foundUser);
        navigate('/');
        return true;
      }
      return false;
    } catch (error) {
      console.error('خطا در ورود:', error);
      return false;
    }
  }, [navigate]);

  const logout = useCallback(() => {
    setUser(null);
    trackActivity('logout', 'خروج از حساب کاربری');
    navigate('/logout-success');
  }, [navigate]);

  const register = async (firstName, lastName, email, password) => {
    try {
      // بررسی وجود ایمیل تکراری
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some(u => u.email === email)) {
        return false; // ایمیل تکراری است
      }

      // ایجاد کاربر جدید
      const newUser = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        password, // در یک برنامه واقعی، رمز عبور باید رمزنگاری شود
        role: 'user',
        createdAt: new Date().toISOString()
      };

      // ذخیره کاربر جدید
      localStorage.setItem('users', JSON.stringify([...users, newUser]));
      return true;
    } catch (error) {
      console.error('خطا در ثبت‌نام:', error);
      return false;
    }
  };

  const trackActivity = (action, description) => {
    if (!user) return;
    
    try {
      const activities = JSON.parse(localStorage.getItem('activities') || '[]');
      activities.push({
        userId: user.id,
        action,
        description,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('activities', JSON.stringify(activities));
    } catch (error) {
      console.error('خطا در ثبت فعالیت:', error);
    }
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      login, 
      register,
      trackActivity,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
};