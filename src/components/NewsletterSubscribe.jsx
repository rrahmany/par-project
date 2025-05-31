import React, { useState } from 'react';
import { 
  Box, Typography, TextField, Button, 
  Paper, Alert 
} from '@mui/material';

const NewsletterSubscribe = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // اینجا لاجیک ارسال ایمیل به سرور اضافه می‌شود
    setStatus('success');
    setEmail('');
  };

  return (
    <Paper 
      sx={{ 
        p: 4, 
        textAlign: 'center',
        background: 'linear-gradient(45deg, #2E3B55, #4C5F8A)',
        color: 'white'
      }}
    >
      <Typography variant="h5" gutterBottom>
        عضویت در خبرنامه
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        برای اطلاع از آخرین تخفیف‌ها و محصولات جدید، در خبرنامه ما عضو شوید
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="ایمیل خود را وارد کنید"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ 
            mb: 2,
            '& .MuiOutlinedInput-root': {
              bgcolor: 'white'
            }
          }}
        />
        
        <Button 
          type="submit"
          variant="contained"
          fullWidth
          sx={{ 
            bgcolor: 'secondary.main',
            '&:hover': {
              bgcolor: 'secondary.dark'
            }
          }}
        >
          عضویت در خبرنامه
        </Button>
      </Box>

      {status === 'success' && (
        <Alert severity="success" sx={{ mt: 2 }}>
          ثبت‌نام شما در خبرنامه با موفقیت انجام شد
        </Alert>
      )}
    </Paper>
  );
};

export default NewsletterSubscribe;