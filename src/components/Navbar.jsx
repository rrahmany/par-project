import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  const navigate = useNavigate();
  
  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 1 }}>
      <Toolbar>
        <Logo />
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <Button 
            color="primary"
            onClick={() => navigate('/products')}
          >
            محصولات
          </Button>
          <Button color="primary">درباره ما</Button>
          <Button 
            color="primary" 
            onClick={() => navigate('/support')}
          >
            پشتیبانی
          </Button>
          <Button color="primary">تماس</Button>
          <Button color="primary">
            <ShoppingCartIcon />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;