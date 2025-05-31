import React, { useState, useContext, useEffect } from 'react';
import { 
  Container, 
  Box, 
  TextField, 
  Button, 
  Typography,
  Alert,
  Divider,
  Paper
} from '@mui/material';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, login, register } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);

  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const success = await login(email, password);
        if (success) {
          setError('');
          // حذف navigate('/') از اینجا چون در useEffect اضافه شده است
        } else {
          setError('ایمیل یا رمز عبور اشتباه است');
        }
      } else {
        if (password !== confirmPassword) {
          setError('رمز عبور و تکرار آن مطابقت ندارند');
          return;
        }
        
        const success = await register(firstName, lastName, email, password);
        if (success) {
          navigate('/register-success');
        } else {
          setError('خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.');
        }
      }
    } catch (err) {
      setError(isLogin ? 'خطا در ورود به سیستم' : 'خطا در ثبت‌نام');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
          <Typography component="h1" variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
            {isLogin ? 'ورود به حساب کاربری' : 'ثبت‌نام'}
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="نام"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="نام خانوادگی"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </>
            )}
            
            <TextField
              margin="normal"
              required
              fullWidth
              label="ایمیل"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="رمز عبور"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            {!isLogin && (
              <TextField
                margin="normal"
                required
                fullWidth
                label="تکرار رمز عبور"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2,
                background: 'linear-gradient(45deg, #2E3B55, #4C5F8A)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1A2438, #2E3B55)'
                }
              }}
            >
              {isLogin ? 'ورود' : 'ثبت‌نام'}
            </Button>

            <Divider sx={{ my: 2 }}>یا</Divider>

            <Button
              fullWidth
              onClick={() => setIsLogin(!isLogin)}
              sx={{ 
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(46, 59, 85, 0.05)'
                }
              }}
            >
              {isLogin ? 'ایجاد حساب کاربری جدید' : 'ورود به حساب کاربری'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Account;