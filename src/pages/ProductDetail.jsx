import React, { useContext, useEffect, useState } from 'react';
import { 
  Container, Grid, Typography, Button, Box, Rating,
  Card, CardMedia, Chip, Divider, IconButton, Snackbar, Alert,
  CircularProgress
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CartContext } from '../App';
import { UserContext } from '../contexts/UserContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, setCart } = useContext(CartContext);
  const { user, trackActivity } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        // دریافت محصولات از localStorage
        const products = JSON.parse(localStorage.getItem('products') || '[]');
        const foundProduct = products.find(p => p.id === parseInt(id));
        
        if (!foundProduct) {
          throw new Error('محصول مورد نظر یافت نشد');
        }
        
        // اضافه کردن اطلاعات تکمیلی محصول
        const productWithDetails = {
          ...foundProduct,
          details: {
            'حجم': '50ml',
            'ترکیبات': 'مواد طبیعی و سازگار با پوست',
            'روش مصرف': 'روزانه دو بار صبح و شب استفاده شود',
            'نوع پوست': 'مناسب انواع پوست',
            'تاریخ انقضا': '24 ماه پس از تولید',
            'شرایط نگهداری': 'در جای خشک و خنک نگهداری شود'
          },
          additionalImages: [
            foundProduct.image,
            'https://dkstatics-public.digikala.com/digikala-products/additional1.jpg',
            'https://dkstatics-public.digikala.com/digikala-products/additional2.jpg'
          ]
        };
        
        setProduct(productWithDetails);
        if (user) {
          trackActivity('view_product', `مشاهده محصول: ${productWithDetails.name}`);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, user, trackActivity]);

  const handleAddToCart = () => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setMessage('این محصول قبلاً به سبد خرید اضافه شده است');
      return;
    }

    setCart(prev => [...prev, { ...product, quantity: 1 }]);
    setMessage('محصول به سبد خرید اضافه شد');
    
    if (user) {
      trackActivity('add_to_cart', `افزودن به سبد خرید: ${product.name}`);
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (user) {
      trackActivity(
        isFavorite ? 'remove_favorite' : 'add_favorite',
        `${isFavorite ? 'حذف از' : 'افزودن به'} علاقه‌مندی‌ها: ${product.name}`
      );
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } catch (error) {
      console.log('Share failed:', error);
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography color="error" gutterBottom>{error}</Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/products')}
        >
          بازگشت به لیست محصولات
        </Button>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography gutterBottom>محصول مورد نظر یافت نشد</Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/products')}
        >
          بازگشت به لیست محصولات
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/products')}
        sx={{ mb: 3 }}
      >
        بازگشت به لیست محصولات
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={product.image}
              alt={product.name}
              sx={{ objectFit: 'contain' }}
            />
            {/* گالری تصاویر اضافی */}
            <Box sx={{ display: 'flex', gap: 1, mt: 2, overflowX: 'auto', p: 1 }}>
              {product.additionalImages?.map((img, index) => (
                <Box
                  key={index}
                  component="img"
                  src={img}
                  alt={`تصویر ${index + 1} ${product.name}`}
                  sx={{
                    width: 80,
                    height: 80,
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: '2px solid',
                    borderColor: product.image === img ? 'primary.main' : 'transparent',
                    borderRadius: 1
                  }}
                  onClick={() => setProduct({ ...product, image: img })}
                />
              ))}
            </Box>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {product.brand}
          </Typography>
          <Box sx={{ my: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating value={product.rating} readOnly precision={0.5} />
            <Typography variant="body2" color="text.secondary">
              ({product.rating} از 5)
            </Typography>
          </Box>
          <Chip 
            label={product.category} 
            color="primary" 
            variant="outlined" 
            sx={{ mb: 2 }}
          />
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Box sx={{ my: 3 }}>
            {product.discount > 0 ? (
              <>
                <Typography 
                  variant="h5" 
                  color="error" 
                  component="span"
                  sx={{ mr: 2 }}
                >
                  {(product.price * (100 - product.discount) / 100).toLocaleString()} تومان
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  component="span" 
                  sx={{ textDecoration: 'line-through' }}
                >
                  {product.price.toLocaleString()} تومان
                </Typography>
                <Chip 
                  label={`${product.discount}% تخفیف`}
                  color="error"
                  size="small"
                  sx={{ ml: 1 }}
                />
              </>
            ) : (
              <Typography variant="h5">
                {product.price.toLocaleString()} تومان
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Button 
              variant="contained" 
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              fullWidth
            >
              {product.stock === 0 ? 'ناموجود' : 'افزودن به سبد خرید'}
            </Button>
            <IconButton 
              onClick={handleFavorite} 
              color={isFavorite ? "error" : "default"}
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton onClick={handleShare}>
              <ShareIcon />
            </IconButton>
          </Box>
          {product.stock > 0 && product.stock < 5 && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              تنها {product.stock} عدد در انبار باقی مانده است
            </Typography>
          )}
          <Divider sx={{ my: 3 }} />
          {/* جزئیات محصول */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              مشخصات محصول
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {Object.entries(product.details || {}).map(([key, value]) => (
              <Box key={key} sx={{ display: 'flex', py: 1 }}>
                <Typography variant="subtitle2" sx={{ minWidth: 120, color: 'text.secondary' }}>
                  {key}:
                </Typography>
                <Typography variant="body2">
                  {value}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* ویژگی‌های کلیدی */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              ویژگی‌های کلیدی
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                  <Typography variant="subtitle2" color="primary">گارانتی اصالت کالا</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                  <Typography variant="subtitle2" color="primary">ارسال سریع</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                  <Typography variant="subtitle2" color="primary">تضمین کیفیت</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                  <Typography variant="subtitle2" color="primary">پشتیبانی ۲۴/۷</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* نظرات و امتیازات */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          نظرات کاربران
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Typography color="text.secondary">
          در حال حاضر نظری برای این محصول ثبت نشده است.
        </Typography>
      </Box>

      <Snackbar 
        open={Boolean(message)} 
        autoHideDuration={3000} 
        onClose={() => setMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity={message.includes('قبلاً') ? 'warning' : 'success'} 
          onClose={() => setMessage('')}
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetail;