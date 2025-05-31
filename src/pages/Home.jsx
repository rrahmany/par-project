import React from 'react';
import { 
  Container, Grid, Typography, Box, Card, CardMedia, 
  CardContent, Button, Divider 
} from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductCard from '../components/ProductCard';
import NewsletterSubscribe from '../components/NewsletterSubscribe';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    rtl: true
  };

  const featuredProducts = [
    {
      id: 1,
      name: "کرم مرطوب کننده هیالورونیک اسید",
      price: 250000,
      originalPrice: 300000,
      discount: 15,
      rating: 4.5,
      reviewCount: 128,
      image: "/images/products/moisturizer.jpg",
      brand: "پرنیان",
      category: "مراقبت پوست"
    },
    {
      id: 2,
      name: "سرم ویتامین C روشن کننده",
      price: 380000,
      originalPrice: 420000,
      discount: 10,
      rating: 4.8,
      reviewCount: 95,
      image: "/images/products/vitamin-c.jpg",
      brand: "پرنیان",
      category: "مراقبت پوست"
    },
    {
      id: 3,
      name: "کرم ضد آفتاب SPF50",
      price: 185000,
      originalPrice: 185000,
      discount: 0,
      rating: 4.7,
      reviewCount: 156,
      image: "/images/products/sunscreen.jpg",
      brand: "پرنیان",
      category: "مراقبت پوست"
    },
    {
      id: 4,
      name: "ماسک موی ترمیم‌کننده آرگان",
      price: 145000,
      originalPrice: 180000,
      discount: 20,
      rating: 4.3,
      reviewCount: 78,
      image: "/images/products/hair-mask.jpg",
      brand: "پرنیان",
      category: "مراقبت مو"
    },
    {
      id: 5,
      name: "پالت سایه چشم 12 رنگ",
      price: 420000,
      originalPrice: 520000,
      discount: 25,
      rating: 4.6,
      reviewCount: 210,
      image: "/images/products/eyeshadow.jpg",
      brand: "پرنیان",
      category: "آرایش صورت"
    },
    {
      id: 6,
      name: "رژ لب مات مخملی",
      price: 165000,
      originalPrice: 165000,
      discount: 0,
      rating: 4.9,
      reviewCount: 245,
      image: "/images/products/lipstick.jpg",
      brand: "پرنیان",
      category: "آرایش صورت"
    },
    {
      id: 7,
      name: "شامپو تقویت‌کننده بایوتین",
      price: 98000,
      originalPrice: 120000,
      discount: 18,
      rating: 4.4,
      reviewCount: 167,
      image: "/images/products/shampoo.jpg",
      brand: "پرنیان",
      category: "مراقبت مو"
    },
    {
      id: 8,
      name: "کرم دست و بدن شی باتر",
      price: 175000,
      originalPrice: 175000,
      discount: 0,
      rating: 4.2,
      reviewCount: 89,
      image: "/images/products/body-cream.jpg",
      brand: "پرنیان",
      category: "مراقبت بدن"
    },
    {
      id: 9,
      name: "ریمل حجم‌دهنده و بلندکننده",
      price: 195000,
      originalPrice: 230000,
      discount: 15,
      rating: 4.7,
      reviewCount: 198,
      image: "/images/products/mascara.jpg",
      brand: "پرنیان",
      category: "آرایش صورت"
    },
    {
      id: 10,
      name: "تونر پاک‌کننده و مرطوب‌کننده",
      price: 160000,
      originalPrice: 190000,
      discount: 12,
      rating: 4.5,
      reviewCount: 145,
      image: "/images/products/toner.jpg",
      brand: "پرنیان",
      category: "مراقبت پوست"
    }
  ];

  const categories = [
    {
      id: 1,
      name: "مراقبت پوست",
      image: "/images/categories/skincare.jpg",
      path: "/category/skin-care"
    },
    // ... سایر دسته‌بندی‌ها
  ];

  const specialOffers = [
    {
      id: 101,
      name: "پک مراقبت پوست صورت",
      price: 850000,
      originalPrice: 1500000,
      discount: 45,
      rating: 4.9,
      reviewCount: 87,
      image: "/images/products/skincare-set.jpg",
      brand: "پرنیان",
      category: "مراقبت پوست",
      description: "شامل کرم مرطوب کننده، سرم و تونر"
    },
    {
      id: 102,
      name: "پالت آرایشی حرفه‌ای",
      price: 780000,
      originalPrice: 1200000,
      discount: 35,
      rating: 4.7,
      reviewCount: 156,
      image: "/images/products/makeup-palette.jpg",
      brand: "پرنیان",
      category: "آرایش صورت",
      description: "شامل سایه، رژگونه و هایلایتر"
    },
    {
      id: 103,
      name: "ست مراقبت مو",
      price: 450000,
      originalPrice: 750000,
      discount: 40,
      rating: 4.8,
      reviewCount: 92,
      image: "/images/products/hair-care-set.jpg",
      brand: "پرنیان",
      category: "مراقبت مو",
      description: "شامل شامپو، نرم‌کننده و ماسک مو"
    },
    {
      id: 104,
      name: "کرم ضد چروک و لیفتینگ",
      price: 580000,
      originalPrice: 890000,
      discount: 35,
      rating: 4.6,
      reviewCount: 124,
      image: "/images/products/anti-aging.jpg",
      brand: "پرنیان",
      category: "مراقبت پوست",
      description: "حاوی رتینول و پپتید"
    },
    {
      id: 105,
      name: "ست لوازم آرایش چشم",
      price: 420000,
      originalPrice: 700000,
      discount: 40,
      rating: 4.7,
      reviewCount: 178,
      image: "/images/products/eye-makeup-set.jpg",
      brand: "پرنیان",
      category: "آرایش صورت",
      description: "شامل ریمل، خط چشم و سایه"
    }
  ];

  const newProducts = [
    {
      id: 201,
      name: "ماسک صورت آبرسان و روشن کننده",
      price: 145000,
      originalPrice: 145000,
      discount: 0,
      rating: 4.8,
      reviewCount: 45,
      image: "/images/products/face-mask.jpg",
      brand: "پرنیان",
      category: "مراقبت پوست",
      isNew: true
    },
    {
      id: 202,
      name: "سرم مو پروتئینه",
      price: 220000,
      originalPrice: 220000,
      discount: 0,
      rating: 4.9,
      reviewCount: 32,
      image: "/images/products/hair-serum.jpg",
      brand: "پرنیان",
      category: "مراقبت مو",
      isNew: true
    },
    {
      id: 203,
      name: "کانسیلر با پوشش بالا",
      price: 185000,
      originalPrice: 185000,
      discount: 0,
      rating: 4.7,
      reviewCount: 28,
      image: "/images/products/concealer.jpg",
      brand: "پرنیان",
      category: "آرایش صورت",
      isNew: true
    },
    {
      id: 204,
      name: "اسکراب لب با عصاره توت فرنگی",
      price: 95000,
      originalPrice: 95000,
      discount: 0,
      rating: 4.6,
      reviewCount: 19,
      image: "/images/products/lip-scrub.jpg",
      brand: "پرنیان",
      category: "مراقبت پوست",
      isNew: true
    }
  ];

  return (
    <>
      {/* Hero Section with Slider */}
      <Box sx={{ mb: 6 }}>
        <Slider {...sliderSettings}>
          {specialOffers.map(offer => (
            <Box key={offer.id} sx={{ position: 'relative' }}>
              <img 
                src={offer.image} 
                alt={offer.name}
                style={{ 
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover'
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 3,
                  background: 'rgba(0,0,0,0.5)',
                  color: 'white'
                }}
              >
                <Typography variant="h5">{offer.name}</Typography>
                <Typography variant="h6" color="error">
                  {offer.discount}% تخفیف
                </Typography>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Hero Section Title and CTA */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            mb: 3,
            fontWeight: 'bold',
            color: 'primary.main'
          }}
        >
          محصولات برتر پرنیان نیهون
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/products')}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            background: 'linear-gradient(45deg, #2E3B55, #4C5F8A)',
            '&:hover': {
              background: 'linear-gradient(45deg, #1A2438, #2E3B55)'
            }
          }}
        >
          مشاهده همه محصولات
        </Button>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg">
        {/* تخفیف‌های ویژه */}
        <Box id="special-offers" sx={{ mb: 8 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 3
          }}>
            <Typography variant="h5">
              تخفیف‌های ویژه
              <Typography component="span" color="error" sx={{ ml: 1 }}>
                تا ۴۵٪ تخفیف
              </Typography>
            </Typography>
            <Button 
              variant="outlined" 
              color="error"
              onClick={() => navigate('/special-offers')}
            >
              مشاهده همه
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {specialOffers.map(product => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
  
        {/* جدیدترین محصولات */}
        <Box id="new-products" sx={{ mb: 8 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 3
          }}>
            <Typography variant="h5">
              جدیدترین محصولات
              <Typography component="span" color="primary" sx={{ ml: 1 }}>
                تازه رسیده‌ها
              </Typography>
            </Typography>
            <Button 
              variant="outlined" 
              onClick={() => navigate('/new-products')}
            >
              مشاهده همه
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {newProducts.map(product => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
  
        {/* محصولات پرفروش */}
        <Box id="best-sellers" sx={{ mb: 8 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 3
          }}>
            <Typography variant="h5">محصولات پرفروش</Typography>
            <Button 
              variant="outlined" 
              onClick={() => navigate('/best-sellers')}
            >
              مشاهده همه
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {featuredProducts
              .slice(0, 8)
              .map(product => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
          </Grid>
        </Box>
  
        {/* دسته‌بندی‌ها */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h5" gutterBottom>
            دسته‌بندی‌های محصولات
          </Typography>
          <Grid container spacing={3}>
            {categories.map(category => (
              <Grid item xs={12} sm={6} md={3} key={category.id}>
                <Card 
                  onClick={() => navigate(category.path)}
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      transition: 'transform 0.3s ease-in-out'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={category.image}
                    alt={category.name}
                  />
                  <CardContent>
                    <Typography variant="h6" align="center">
                      {category.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
  
        {/* خبرنامه */}
        <Box sx={{ mb: 6 }}>
          <NewsletterSubscribe />
        </Box>
      </Container>
    </>
  );
};

export default Home;
