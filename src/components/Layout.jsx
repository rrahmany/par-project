import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Badge, 
  IconButton,
  Box, 
  Avatar, 
  Menu, 
  MenuItem, 
  Container, 
  Grid, 
  TextField 
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { UserContext } from '../contexts/UserContext';
import { CartContext } from '../App';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null); // تغییر از React.useState به useState
  const [profileAnchorEl, setProfileAnchorEl] = useState(null); // تغییر از React.useState به useState
  const [favorites, setFavorites] = useState(
    user ? JSON.parse(localStorage.getItem(`favorites_${user.id}`) || '[]') : []
  );

  const handleCategoryMenu = (event) => {
    setCategoryAnchorEl(event.currentTarget);
  };

  const handleProfileMenu = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleCategoryClose = () => {
    setCategoryAnchorEl(null);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const handleLogout = () => {
    setUser(null);
    handleProfileClose();
    navigate('/');
  };
  
  const [email, setEmail] = useState(''); // Add email state

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Here you can add your newsletter subscription logic
    console.log('Newsletter subscription for:', email);
    setEmail('');
    // You might want to show a success message or handle errors
  };

  // حذف این دو خط که باعث خطا می‌شوند
  // const [isLiked, setIsLiked] = useState(
  //   user && JSON.parse(localStorage.getItem(`favorites_${user.id}`) || '[]').includes(product.id)
  // );

  const handleFavoriteClick = () => {
    if (user) {
      navigate('/favorites');
    } else {
      navigate('/account');
    }
  };

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ 
          maxWidth: 'lg', 
          width: '100%', 
          margin: '0 auto',
          py: 1
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            flexGrow: 1,
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
          >
            <img 
              src="/images/logo.png" 
              alt="پرنیان نیهون" 
              style={{ 
                height: '40px',
                width: 'auto'
              }}
            />
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #2E3B55, #4C5F8A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              پرنیان نیهون
            </Typography>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            gap: 3, 
            alignItems: 'center'
          }}>
            {/* دکمه دسته‌بندی‌ها */}
            <Button 
              color="primary"
              onClick={() => navigate('/categories')}
              sx={{
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              دسته‌بندی‌ها
            </Button>

            {/* دکمه افزودن محصول */}
            <Button 
              color="primary"
              onClick={() => navigate('/add-product')}
              sx={{
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              افزودن محصول
            </Button>

            {/* جستجو */}
            <IconButton onClick={() => navigate('/search')}>
              <SearchIcon />
            </IconButton>

            {/* علاقه‌مندی‌ها */}
            <IconButton onClick={handleFavoriteClick}>
              <Badge badgeContent={favorites.length} color="secondary">
                <FavoriteIcon />
              </Badge>
            </IconButton>

            {/* سبد خرید */}
            <IconButton 
              color="primary" 
              onClick={() => navigate('/cart')}
            >
              <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* پروفایل کاربر */}
            {user ? (
              <>
                <IconButton
                  onClick={handleProfileMenu}
                  color="inherit"
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                    {user.firstName?.[0]}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={profileAnchorEl}
                  open={Boolean(profileAnchorEl)}
                  onClose={handleProfileClose}
                >
                  <MenuItem onClick={() => { handleProfileClose(); navigate('/profile'); }}>
                    پروفایل
                  </MenuItem>
                  <MenuItem onClick={() => { handleProfileClose(); navigate('/orders'); }}>
                    سفارش‌ها
                  </MenuItem>
                  <MenuItem onClick={() => { handleProfileClose(); navigate('/favorites'); }}>
                    علاقه‌مندی‌ها
                  </MenuItem>
                  <MenuItem onClick={() => { handleProfileClose(); navigate('/addresses'); }}>
                    آدرس‌های من
                  </MenuItem>
                  <MenuItem onClick={() => { handleProfileClose(); navigate('/club'); }}>
                    باشگاه مشتریان
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>خروج</MenuItem>
                </Menu>
              </>
            ) : (
              <Button 
                variant="contained"
                color="primary"
                onClick={() => navigate('/account')}
                startIcon={<PersonIcon />}
                sx={{
                  background: 'linear-gradient(45deg, #2E3B55, #4C5F8A)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1A2438, #2E3B55)'
                  }
                }}
              >
                ورود / ثبت‌نام
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* نوار جستجو */}
      <Box sx={{ bgcolor: 'background.paper', py: 1, borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* بخش‌های ویژه */}
            <Button 
              onClick={() => {
                if (window.location.pathname === '/') {
                  const specialOffersSection = document.getElementById('special-offers');
                  if (specialOffersSection) {
                    specialOffersSection.scrollIntoView({ behavior: 'smooth' });
                  }
                } else {
                  navigate('/');
                }
              }}
              sx={{ 
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              تخفیف‌های ویژه
            </Button>
            <Button 
              onClick={() => {
                if (window.location.pathname === '/') {
                  const bestSellersSection = document.getElementById('best-sellers');
                  if (bestSellersSection) {
                    bestSellersSection.scrollIntoView({ behavior: 'smooth' });
                  }
                } else {
                  navigate('/');
                }
              }}
              sx={{ 
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              پرفروش‌ترین‌ها
            </Button>
            <Button 
              onClick={() => {
                if (window.location.pathname === '/') {
                  const newProductsSection = document.getElementById('new-products');
                  if (newProductsSection) {
                    newProductsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                } else {
                  navigate('/');
                }
              }}
              sx={{ 
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              جدیدترین‌ها
            </Button>
          </Box>
        </Container>
      </Box>

      {/* محتوای اصلی */}
      <Box 
        component="main" 
        sx={{ 
          minHeight: '100vh', 
          pb: 4,
          backgroundColor: 'background.default'
        }}
      >
        {children}
      </Box>

      {/* فوتر */}
      <Box 
        component="footer" 
        sx={{ 
          bgcolor: 'background.paper', 
          py: 8, 
          borderTop: 1, 
          borderColor: 'divider'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* ستون پشتیبانی */}
            <Grid item xs={12} md={4}>
              <Box 
                onClick={() => navigate('/support')}
                sx={{
                  textAlign: 'center',
                  p: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 'bold',
                    color: 'primary.main',
                    mb: 2
                  }}
                >
                  پشتیبانی
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 1 
                }}>
                  <Typography 
                    sx={{ 
                      color: 'text.secondary',
                    }}
                  >
                    تماس با ما
                  </Typography>
                  <Typography 
                    sx={{ 
                      color: 'text.secondary',
                    }}
                  >
                    سوالات متداول
                  </Typography>
                  <Typography 
                    sx={{ 
                      color: 'text.secondary',
                    }}
                  >
                    راهنمای ارسال
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* ستون دسته‌بندی‌ها */}
            <Grid item xs={12} md={4}>
              <Box 
                onClick={() => navigate('/categories')}
                sx={{
                  textAlign: 'center',
                  p: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                <Box 
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '4px',
                    background: 'linear-gradient(90deg, primary.main, primary.light)'
                  }}
                />
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 'bold',
                    color: 'primary.main',
                    mb: 2
                  }}
                >
                  دسته‌بندی‌ها
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ color: 'text.secondary' }}>مراقبت پوست</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>آرایش صورت</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>مراقبت مو</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>مراقبت بدن</Typography>
                </Box>
              </Box>
            </Grid>

            {/* ستون درباره ما */}
            <Grid item xs={12} md={4}>
              <Box 
                onClick={() => navigate('/about')}
                sx={{
                  textAlign: 'center',
                  p: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 'bold',
                    color: 'primary.main',
                    mb: 2
                  }}
                >
                  درباره ما
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ color: 'text.secondary' }}>درباره پرنیان نیهون</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>قوانین و مقررات</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>حریم خصوصی</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Layout;