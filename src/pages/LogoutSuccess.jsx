import React from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Button,
  Paper 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const LogoutSuccess = () => {
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
          <ExitToAppIcon 
            sx={{ 
              fontSize: 80, 
              color: 'primary.main',
              mb: 3
            }} 
          />
          
          <Typography variant="h4" gutterBottom>
            خروج موفقیت‌آمیز
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ mb: 4 }}
          >
            از اینکه از پرنیان بیوتی دیدن کردید، متشکریم! امیدواریم به زودی دوباره شما را ببینیم.
            برای مشاهده جدیدترین محصولات و تخفیف‌های ویژه، حتماً دوباره به ما سر بزنید.
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
            ورود مجدد
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default LogoutSuccess;