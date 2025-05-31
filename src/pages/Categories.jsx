import React, { useState } from 'react';
import { 
  Container, Typography, Box, Grid, Card, 
  CardContent, CardMedia, Tabs, Tab, Paper 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('skin-care');

  const categories = {
    'skin-care': {
      title: 'مراقبت پوست',
      products: [
        {
          id: 1,
          title: 'کرم مرطوب کننده هیالورونیک اسید',
          image: '/images/products/moisturizer.jpg',
          price: '۴۵۰,۰۰۰',
          brand: 'هادا لابو'
        },
        {
          id: 2,
          title: 'سرم ویتامین سی',
          image: '/images/products/vitamin-c.jpg',
          price: '۸۲۰,۰۰۰',
          brand: 'روهتو'
        },
        // ... محصولات بیشتر
      ]
    },
    'makeup': {
      title: 'آرایش صورت',
      products: [
        {
          id: 3,
          title: 'کرم پودر با پوشش بالا',
          image: '/images/products/foundation.jpg',
          price: '۳۸۰,۰۰۰',
          brand: 'کیس'
        },
        // ... محصولات بیشتر
      ]
    },
    'hair-care': {
      title: 'مراقبت مو',
      products: [
        {
          id: 4,
          title: 'شامپو ترمیم‌کننده',
          image: '/images/products/shampoo.jpg',
          price: '۲۵۰,۰۰۰',
          brand: 'تسوباکی'
        },
        // ... محصولات بیشتر
      ]
    },
    'body-care': {
      title: 'مراقبت بدن',
      products: [
        {
          id: 5,
          title: 'لوسیون بدن مرطوب‌کننده',
          image: '/images/products/body-lotion.jpg',
          price: '۳۲۰,۰۰۰',
          brand: 'بیورآ'
        },
        // ... محصولات بیشتر
      ]
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        align="center"
        sx={{ 
          mb: 6,
          fontWeight: 'bold',
          color: 'primary.main',
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '-16px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100px',
            height: '3px',
            background: 'linear-gradient(90deg, primary.light, primary.main, primary.light)'
          }
        }}
      >
        دسته‌بندی محصولات
      </Typography>

      <Paper 
        elevation={0} 
        sx={{ 
          mb: 6,
          borderRadius: 2,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Tabs 
          value={selectedCategory}
          onChange={(e, newValue) => setSelectedCategory(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              minWidth: 120,
              fontWeight: 'bold'
            }
          }}
        >
          {Object.entries(categories).map(([key, category]) => (
            <Tab 
              key={key}
              label={category.title}
              value={key}
              sx={{
                '&.Mui-selected': {
                  color: 'primary.main'
                }
              }}
            />
          ))}
        </Tabs>
      </Paper>

      <Grid container spacing={3}>
        {categories[selectedCategory].products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6
                }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography 
                  variant="subtitle2" 
                  color="text.secondary"
                  gutterBottom
                >
                  {product.brand}
                </Typography>
                <Typography 
                  variant="h6" 
                  component="h2"
                  gutterBottom
                  sx={{ 
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    minHeight: '3rem'
                  }}
                >
                  {product.title}
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{ 
                    fontWeight: 'bold',
                    color: 'primary.main'
                  }}
                >
                  {product.price} تومان
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Categories;