import React, { useContext } from 'react';
import { 
  Container, Typography, Grid, Card, CardContent, 
  CardMedia, Button, Box, IconButton, TextField 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CartContext } from '../App';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const updateQuantity = (productId, change) => {
    setCart(prevCart => {
      const newCart = [...prevCart];
      const itemIndex = newCart.findIndex(item => item.id === productId);
      if (itemIndex >= 0) {
        newCart[itemIndex].quantity += change;
        if (newCart[itemIndex].quantity <= 0) {
          newCart.splice(itemIndex, 1);
        }
      }
      return newCart;
    });
  };

  const removeItem = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const total = cart.reduce((sum, item) => 
    sum + (item.price * (1 - item.discount/100) * item.quantity), 0
  );

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        سبد خرید
      </Typography>

      {cart.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" gutterBottom>
            سبد خرید شما خالی است
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/products')}
            sx={{ mt: 2 }}
          >
            مشاهده محصولات
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {cart.map(item => (
              <Card key={item.id} sx={{ mb: 2 }}>
                <Grid container>
                  <Grid item xs={4}>
                    <CardMedia
                      component="img"
                      height="150"
                      image={item.image}
                      alt={item.name}
                      sx={{ objectFit: 'cover' }}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <CardContent>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography color="text.secondary" gutterBottom>
                        {item.brand}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                        <IconButton 
                          size="small"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton 
                          size="small"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <AddIcon />
                        </IconButton>
                        <IconButton 
                          color="error"
                          onClick={() => removeItem(item.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                      <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                        {(item.price * (1 - item.discount/100) * item.quantity).toLocaleString()} تومان
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  خلاصه سفارش
                </Typography>
                <Box sx={{ my: 2 }}>
                  <Typography>
                    تعداد اقلام: {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    مبلغ کل: {total.toLocaleString()} تومان
                  </Typography>
                </Box>
                <Button 
                  variant="contained" 
                  fullWidth 
                  size="large"
                  onClick={() => navigate('/checkout')}
                >
                  ادامه فرآیند خرید
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Cart;