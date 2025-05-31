import React from 'react';
import { 
  Box, 
  Container,
  Typography
} from '@mui/material';

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container>
          <Typography variant="h6" color="error">
            دسترسی به پنل مدیریت مسدود شده است
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminLayout;