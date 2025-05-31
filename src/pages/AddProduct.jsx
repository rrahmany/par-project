import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import {
  Container, TextField, Button, Grid, Typography,
  FormControl, InputLabel, Select, MenuItem,
  InputAdornment, Box, Alert, Snackbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const AddProduct = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  
  useEffect(() => {
    // بررسی دسترسی کاربر - فقط شما می‌توانید به این صفحه دسترسی داشته باشید
    if (!user || user.email !== "your@email.com") { // ایمیل خود را جایگزین کنید
      navigate('/products');
    }
  }, [user, navigate]);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: '',
    brand: '',
    stock: '',
    discount: '0',
    details: {
      حجم: '',
      ترکیبات: '',
      'روش مصرف': '',
      'نوع پوست': ''
    }
  });

  const categories = [
    'مراقبت پوست',
    'ضد آفتاب',
    'پاک کننده',
    'ماسک',
    'کرم دست و صورت'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here you would typically make an API call to save the product
      const newProduct = {
        ...formData,
        id: Date.now(), // Temporary ID generation
        rating: 0,
        price: Number(formData.price),
        stock: Number(formData.stock),
        discount: Number(formData.discount)
      };

      // For now, we'll just store it in localStorage
      const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
      localStorage.setItem('products', JSON.stringify([...existingProducts, newProduct]));

      setMessage('محصول با موفقیت اضافه شد');
      setTimeout(() => {
        navigate('/products');
      }, 2000);
    } catch (error) {
      setMessage('خطا در ثبت محصول');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        افزودن محصول جدید
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="نام محصول"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="قیمت"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              InputProps={{
                endAdornment: <InputAdornment position="end">تومان</InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="آدرس تصویر"
              name="image"
              value={formData.image}
              onChange={handleChange}
              helperText="مثال: /images/product.jpg"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>دسته‌بندی</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                label="دسته‌بندی"
              >
                {categories.map(cat => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="برند"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="موجودی"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="تخفیف"
              name="discount"
              type="number"
              value={formData.discount}
              onChange={handleChange}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              multiline
              rows={3}
              label="توضیحات"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              مشخصات محصول
            </Typography>
          </Grid>

          {Object.keys(formData.details).map(key => (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                fullWidth
                label={key}
                name={`details.${key}`}
                value={formData.details[key]}
                onChange={handleChange}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/products')}
              >
                انصراف
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                ثبت محصول
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={Boolean(message)}
        autoHideDuration={3000}
        onClose={() => setMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={message.includes('موفقیت') ? 'success' : 'error'}
          onClose={() => setMessage('')}
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddProduct;