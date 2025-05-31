// Add UserContext to imports
import React, { useState, useEffect, useMemo, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { 
  Grid, Card, CardMedia, CardContent, Typography, Container, Skeleton,
  Button, Box, TextField, InputAdornment, Select, MenuItem,
  FormControl, InputLabel, Chip, Pagination, IconButton, Tooltip,
  Rating, Badge, Dialog, DialogContent, CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ShareIcon from '@mui/icons-material/Share';
import { CartContext } from '../App';
import '../styles/fonts.css';

const ProductList = () => {
  const navigate = useNavigate();
  const { user, trackActivity } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState('همه');
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const productsPerPage = 9;

  const categories = ['همه', 'مراقبت پوست', 'پاک کننده', 'ضد آفتاب', 'ماسک', 'کرم دست و صورت'];

  const sortOptions = useMemo(() => [
    { value: 'newest', label: 'جدیدترین' },
    { value: 'priceAsc', label: 'ارزان‌ترین' },
    { value: 'priceDesc', label: 'گران‌ترین' },
    { value: 'popular', label: 'محبوب‌ترین' },
    { value: 'bestSelling', label: 'پرفروش‌ترین' }
  ], []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Get products from localStorage
        const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
        setProducts(storedProducts);
      } catch (error) {
        setError('خطا در بارگذاری محصولات');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);

  const getDiscountedPrice = (price, discount) => {
    return price - (price * discount / 100);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
    if (user) {
      trackActivity('view_product', `مشاهده محصول: ${product.name}`);
    }
  };

  const handleFavoriteClick = (e, product) => {
    e.stopPropagation();
    setFavorites(prev => {
      const isAdding = !prev.includes(product.id);
      if (user) {
        trackActivity(
          isAdding ? 'add_favorite' : 'remove_favorite',
          `${isAdding ? 'افزودن به' : 'حذف از'} علاقه‌مندی‌ها: ${product.name}`
        );
      }
      return prev.includes(product.id) 
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id];
    });
  };

  const handleAddToCart = async (e, product) => {
    e.stopPropagation();
    setAddingToCart(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (user) {
        trackActivity('add_to_cart', `افزودن به سبد خرید: ${product.name}`);
      }
      // Add success notification here
    } catch (error) {
      // Add error notification here
    } finally {
      setAddingToCart(false);
    }
  };

  const handleQuickView = (e, product) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleShare = async (e, product) => {
    e.stopPropagation();
    try {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href + '/' + product.id
      });
    } catch (err) {
      console.log('Share failed:', err);
    }
  };

  const sortProducts = (products) => {
    switch(sortBy) {
      case 'priceAsc':
        return [...products].sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return [...products].sort((a, b) => b.price - a.price);
      case 'newest':
        return [...products].sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'popular':
        return [...products].sort((a, b) => b.rating - a.rating);
      case 'bestSelling':
        return products;
      default:
        return products;
    }
  };

  const filteredProducts = products.filter(product => 
    (selectedCategory === 'همه' || product.category === selectedCategory) &&
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
     product.brand.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedProducts = sortProducts(filteredProducts);

  const paginatedProducts = sortedProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  const QuickViewDialog = () => (
    <Dialog
      open={!!quickViewProduct}
      onClose={() => setQuickViewProduct(null)}
      maxWidth="md"
      fullWidth
    >
      <DialogContent>
        {quickViewProduct && (
          <Grid container spacing={3}>
            {/* ... existing dialog content ... */}
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            mb: 2,
            fontWeight: 700,
            textAlign: 'center',
            background: 'linear-gradient(45deg, #2E3B55, #4C5F8A)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          محصولات ما
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          sx={{ mb: 4, textAlign: 'center' }}
        >
          بهترین محصولات مراقبت پوست با کیفیت برتر
        </Typography>
        
        {/* فیلترها و جستجو */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {loading ? (
            Array.from(new Array(6)).map((_, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%' }}>
                  <Skeleton variant="rectangular" height={300} />
                  <CardContent>
                    <Skeleton variant="text" height={40} />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" width="40%" />
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            paginatedProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card 
                  onClick={() => handleProductClick(product)}  // Pass the entire product object
                  sx={{ 
                    height: '100%',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                      '& .quick-view-button': {
                        opacity: 1
                      }
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={product.image}
                    alt={product.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {product.brand}
                    </Typography>
                    <Rating value={product.rating} readOnly size="small" />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="h6" color="error.main">
                          {getDiscountedPrice(product.price, product.discount).toLocaleString()} تومان
                        </Typography>
                        {product.discount > 0 && (
                          <Typography variant="body2" sx={{ textDecoration: 'line-through' }}>
                            {product.price.toLocaleString()} تومان
                          </Typography>
                        )}
                      </Box>
                      <IconButton 
                        onClick={(e) => handleFavoriteClick(e, product.id)}
                        color={favorites.includes(product.id) ? "error" : "default"}
                      >
                        <FavoriteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                  <Box 
                    className="quick-view-button"
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      zIndex: 2,
                      display: 'flex',
                      gap: 1
                    }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      onClick={(e) => handleQuickView(e, product)}
                    >
                      مشاهده سریع
                    </Button>
                    <IconButton
                      size="small"
                      sx={{ bgcolor: 'white' }}
                      onClick={(e) => handleShare(e, product)}
                    >
                      <ShareIcon />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      {/* محصولات */}
      <Grid container spacing={4}>
        {loading ? (
          Array.from(new Array(6)).map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%' }}>
                <Skeleton variant="rectangular" height={300} />
                <CardContent>
                  <Skeleton variant="text" height={40} />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" width="40%" />
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          paginatedProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card 
                onClick={() => handleProductClick(product)}  // Pass the entire product object
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    '& .quick-view-button': {
                      opacity: 1
                    }
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {product.brand}
                  </Typography>
                  <Rating value={product.rating} readOnly size="small" />
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="h6" color="error.main">
                        {getDiscountedPrice(product.price, product.discount).toLocaleString()} تومان
                      </Typography>
                      {product.discount > 0 && (
                        <Typography variant="body2" sx={{ textDecoration: 'line-through' }}>
                          {product.price.toLocaleString()} تومان
                        </Typography>
                      )}
                    </Box>
                    <IconButton 
                      onClick={(e) => handleFavoriteClick(e, product.id)}
                      color={favorites.includes(product.id) ? "error" : "default"}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
                <Box 
                  className="quick-view-button"
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    zIndex: 2,
                    display: 'flex',
                    gap: 1
                  }}
                >
                  <Button
                    variant="contained"
                    size="small"
                    onClick={(e) => handleQuickView(e, product)}
                  >
                    مشاهده سریع
                  </Button>
                  <IconButton
                    size="small"
                    sx={{ bgcolor: 'white' }}
                    onClick={(e) => handleShare(e, product)}
                  >
                    <ShareIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Pagination */}
      {!loading && filteredProducts.length > 0 && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Pagination 
            count={Math.ceil(filteredProducts.length / productsPerPage)} 
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
            sx={{ direction: 'ltr' }}
          />
        </Box>
      )}

      {/* Quick View Dialog */}
      <QuickViewDialog />
    </Container>
  );
};

export default ProductList;