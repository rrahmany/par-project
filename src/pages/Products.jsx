import React, { useState } from 'react';
import { 
  Container, Grid, Typography, Box, 
  TextField, MenuItem, Pagination,
  FormControl, InputLabel, Select,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('newest');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  // فیلتر و مرتب‌سازی محصولات
  const filteredProducts = allProducts
    .filter(product => category === 'all' || product.category === category)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'popular':
          return b.reviewCount - a.reviewCount;
        default: // newest
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* دکمه بازگشت به صفحه اصلی */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/')}
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
          بازگشت به صفحه اصلی
        </Button>
      </Box>

      <Typography variant="h4" component="h1" gutterBottom align="center">
        فروشگاه محصولات پرنیان نیهون
      </Typography>

      {/* فیلترها و مرتب‌سازی */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>دسته‌بندی</InputLabel>
          <Select
            value={category}
            label="دسته‌بندی"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="all">همه محصولات</MenuItem>
            <MenuItem value="مراقبت پوست">مراقبت پوست</MenuItem>
            <MenuItem value="مراقبت مو">مراقبت مو</MenuItem>
            <MenuItem value="آرایش صورت">آرایش صورت</MenuItem>
            <MenuItem value="مراقبت بدن">مراقبت بدن</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>مرتب‌سازی</InputLabel>
          <Select
            value={sortBy}
            label="مرتب‌سازی"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="newest">جدیدترین</MenuItem>
            <MenuItem value="price-asc">ارزان‌ترین</MenuItem>
            <MenuItem value="price-desc">گران‌ترین</MenuItem>
            <MenuItem value="popular">محبوب‌ترین</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* نمایش محصولات */}
      <Grid container spacing={3}>
        {displayedProducts.map(product => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* صفحه‌بندی */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Pagination 
          count={pageCount} 
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
          size="large"
        />
      </Box>
    </Container>
  );
};

export default Products;