import React, { useContext, useState } from 'react';
import { 
  Card, CardMedia, CardContent, Typography, 
  Box, IconButton, Rating, Chip 
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../App';
import { UserContext } from '../contexts/UserContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  const { user, trackActivity } = useContext(UserContext);
  const [isLiked, setIsLiked] = useState(
    user && JSON.parse(localStorage.getItem(`favorites_${user.id}`) || '[]').includes(product.id)
  );
  
  const handleAddToCart = (e) => {
    e.stopPropagation();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(prevCart => prevCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
    }

    if (user) {
      trackActivity('add_to_cart', `افزودن به سبد خرید: ${product.name}`);
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (user) {
      const favorites = JSON.parse(localStorage.getItem(`favorites_${user.id}`) || '[]');
      const isFavorite = favorites.includes(product.id);
      
      if (isFavorite) {
        const newFavorites = favorites.filter(id => id !== product.id);
        localStorage.setItem(`favorites_${user.id}`, JSON.stringify(newFavorites));
        trackActivity('favorite_remove', `حذف از علاقه‌مندی‌ها: ${product.name}`);
      } else {
        favorites.push(product.id);
        localStorage.setItem(`favorites_${user.id}`, JSON.stringify(favorites));
        trackActivity('favorite_add', `افزودن به علاقه‌مندی‌ها: ${product.name}`);
      }
      setIsLiked(!isFavorite); // به‌روزرسانی state محلی
    } else {
      navigate('/account');
    }
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-4px)',
          transition: 'transform 0.3s ease-in-out'
        }
      }}
    >
      {product.discount > 0 && (
        <Chip
          label={`${product.discount}% تخفیف`}
          color="error"
          sx={{ position: 'absolute', top: 10, right: 10 }}
        />
      )}
      
      <CardMedia
        component="img"
        height="200"
        image={product.images && product.images.length > 0 
          ? product.images[0] 
          : '/images/placeholder-product.jpg'}
        alt={product.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/images/placeholder-product.jpg';
        }}
        sx={{ 
          cursor: 'pointer', 
          objectFit: 'contain',
          backgroundColor: '#f5f5f5',
          padding: '8px'
        }}
        onClick={() => navigate(`/product/${product.id}`)}
      />
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={product.rating} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({product.reviewCount})
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            {product.discount > 0 ? (
              <>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ textDecoration: 'line-through' }}
                >
                  {product.originalPrice.toLocaleString()} تومان
                </Typography>
                <Typography variant="h6" color="error.main">
                  {product.price.toLocaleString()} تومان
                </Typography>
              </>
            ) : (
              <Typography variant="h6">
                {product.price.toLocaleString()} تومان
              </Typography>
            )}
          </Box>
          
          <Box>
            <IconButton 
              size="small" 
              color={isLiked ? "error" : "default"}
              onClick={handleFavoriteClick}
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton 
              size="small" 
              color="primary"
              onClick={handleAddToCart}
            >
              <ShoppingCartIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;