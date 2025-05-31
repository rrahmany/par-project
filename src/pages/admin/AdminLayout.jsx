import React from 'react';
import { Box, Container, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Dashboard, ShoppingCart, People, Settings, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  
  const menuItems = [
    { text: 'داشبورد', icon: <Dashboard />, path: '/admin' },
    { text: 'محصولات', icon: <ShoppingCart />, path: '/admin/products' },
    { text: 'کاربران', icon: <People />, path: '/admin/users' },
    { text: 'تنظیمات', icon: <Settings />, path: '/admin/settings' }
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">پنل مدیریت پرنیان</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" onClick={() => navigate('/logout')}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Drawer variant="permanent" sx={{ width: 240 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Container>{children}</Container>
      </Box>
    </Box>
  );
};

export default AdminLayout;