import React from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Paper 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const RegisterSuccess = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        mt: 8, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            width: '100%', 
            borderRadius: 2,
            textAlign: 'center'
          }}
        >
          <CheckCircleIcon 
            sx={{ 
              fontSize: 80, 
              color: 'success.main',
              mb: 3
            }} 
          />
          
          <Typography variant="h4" gutterBottom>
            ثبت‌نام با موفقیت انجام شد
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ mb: 4 }}
          >
            از اینکه به خانواده پرنیان بیوتی پیوستید، متشکریم!
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/account')}
            sx={{ 
              background: 'linear-gradient(45deg, #2E3B55, #4C5F8A)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1A2438, #2E3B55)'
              }
            }}
          >
            ورود به حساب کاربری
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterSuccess;