import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  InputAdornment,
  Alert,
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useProducts } from '../contexts/ProductContext';

const ProductForm = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // لیست دسته‌بندی‌های موجود
  const categories = [
    'لوازم آرایشی',
    'مراقبت پوست',
    'مراقبت مو',
    'عطر و ادکلن',
    'لوازم بهداشتی',
    'محصولات طبیعی',
    'محصولات ارگانیک'
  ];
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    images: [], // تغییر از image به images
    categories: [],
    brand: '',
    stock: '',
    discount: '0',
    rating: '0',
    reviewCount: '0',
    isSpecialOffer: false,
    isNew: false,
    isBestSeller: false
  });

  // اضافه کردن تابع برای مدیریت آپلود تصاویر
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setError('حداکثر 5 تصویر می‌توانید آپلود کنید');
      return;
    }

    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: imageUrls
    }));
  };

  // اضافه کردن تابع برای حذف تصویر
  const handleRemoveImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCategoryChange = (category) => {
    setFormData(prev => {
      const updatedCategories = prev.categories.includes(category)
        ? prev.categories.filter(cat => cat !== category)
        : [...prev.categories, category];
      
      return {
        ...prev,
        categories: updatedCategories
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const numericFields = ['price', 'stock', 'discount', 'rating', 'reviewCount'];
      const processedData = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };

      numericFields.forEach(field => {
        processedData[field] = Number(processedData[field]);
      });

      addProduct(processedData);
      setSuccess(true);
      setError('');
      
      // پاک کردن فرم با تمام فیلدهای جدید
      setFormData({
        name: '',
        price: '',
        description: '',
        images: [], // آرایه خالی برای تصاویر
        categories: [],
        brand: '',
        stock: '',
        discount: '0',
        rating: '0',
        reviewCount: '0',
        isSpecialOffer: false,
        isNew: false,
        isBestSeller: false
      });

      setTimeout(() => {
        navigate('/products');
      }, 2000);

    } catch (err) {
      setError('خطا در ثبت محصول. لطفاً دوباره تلاش کنید.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        افزودن محصول جدید
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          محصول با موفقیت اضافه شد. در حال انتقال به صفحه محصولات...
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
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
              label="برند"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              دسته‌بندی‌های محصول
            </Typography>
            <FormGroup>
              {categories.map((category) => (
                <FormControlLabel
                  key={category}
                  control={
                    <Checkbox
                      checked={formData.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                  }
                  label={category}
                />
              ))}
            </FormGroup>
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="توضیحات"
              name="description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              تصاویر محصول (حداکثر 5 تصویر)
            </Typography>
            <input
              accept="image/*"
              type="file"
              multiple
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button
                variant="outlined"
                component="span"
                fullWidth
                sx={{ mb: 2 }}
              >
                انتخاب تصاویر
              </Button>
            </label>
            
            {formData.images.length > 0 && (
              <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                flexWrap: 'wrap',
                mt: 2 
              }}>
                {formData.images.map((image, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: 'relative',
                      width: 100,
                      height: 100
                    }}
                  >
                    <img
                      src={image}
                      alt={`تصویر ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }}
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: -10,
                        right: -10,
                        bgcolor: 'background.paper'
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}
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
              label="تخفیف (درصد)"
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
            <Typography variant="subtitle1" gutterBottom>
              وضعیت‌های ویژه محصول
            </Typography>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isSpecialOffer}
                    onChange={handleChange}
                    name="isSpecialOffer"
                  />
                }
                label="فروش ویژه"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isNew}
                    onChange={handleChange}
                    name="isNew"
                  />
                }
                label="محصول جدید"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isBestSeller}
                    onChange={handleChange}
                    name="isBestSeller"
                  />
                }
                label="پرفروش"
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 2 }}
            >
              ثبت محصول
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductForm;