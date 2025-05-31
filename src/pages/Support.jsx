import React, { useState } from 'react';
import { 
  Container, Typography, Box, Grid, Paper,
  TextField, Button, Accordion, AccordionSummary,
  AccordionDetails, Link
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // اینجا می‌توانید منطق ارسال فرم را پیاده‌سازی کنید
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const faqs = [
    {
      question: 'چگونه می‌توانم سفارش خود را پیگیری کنم؟',
      answer: 'شما می‌توانید با وارد شدن به حساب کاربری خود و مراجعه به بخش "سفارش‌های من" وضعیت سفارش خود را مشاهده کنید.'
    },
    {
      question: 'شرایط مرجوعی کالا چیست؟',
      answer: 'در صورت عدم رضایت از کالا، تا 7 روز پس از دریافت می‌توانید کالا را در بسته‌بندی اصلی و بدون استفاده مرجوع کنید.'
    },
    {
      question: 'آیا امکان خرید حضوری وجود دارد؟',
      answer: 'خیر، در حال حاضر فروشگاه پرنیان نیهون فقط به صورت آنلاین خدمات ارائه می‌دهد.'
    },
    {
      question: 'زمان ارسال سفارش‌ها چقدر است؟',
      answer: 'معمولاً سفارش‌ها در تهران 1 تا 2 روز کاری و در شهرستان‌ها 2 تا 4 روز کاری پس از تأیید سفارش ارسال می‌شوند.'
    },
    {
      question: 'آیا امکان پرداخت در محل وجود دارد؟',
      answer: 'بله، در حال حاضر امکان پرداخت در محل برای سفارش‌های درون شهری تهران فراهم است.'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom
        sx={{ 
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 6,
          color: 'primary.main'
        }}
      >
        پشتیبانی پرنیان نیهون
      </Typography>

      <Grid container spacing={4}>
        {/* بخش تماس با ما */}
        <Grid item xs={12}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, 
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
              position: 'relative',
              overflow: 'hidden'
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
              variant="h5" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                color: 'primary.main',
                mb: 4,
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-8px',
                  left: 0,
                  width: '60px',
                  height: '2px',
                  bgcolor: 'primary.main'
                }
              }}
            >
              تماس با ما
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box 
                  component="form" 
                  onSubmit={handleSubmit}
                  sx={{
                    '& .MuiTextField-root': {
                      bgcolor: 'background.paper',
                      borderRadius: 1,
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }
                  }}
                >
                  <TextField
                    fullWidth
                    label="نام و نام خانوادگی"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                    required
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="ایمیل"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    margin="normal"
                    required
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="پیام شما"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    margin="normal"
                    required
                    sx={{ mb: 3 }}
                  />
                  <Button 
                    type="submit" 
                    variant="contained" 
                    fullWidth
                    sx={{ 
                      py: 1.5,
                      background: 'linear-gradient(45deg, primary.dark, primary.main)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, primary.main, primary.light)'
                      }
                    }}
                  >
                    ارسال پیام
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 3,
                    height: '100%',
                    justifyContent: 'center',
                    px: 4
                  }}
                >
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2,
                      p: 2,
                      borderRadius: 1,
                      bgcolor: 'background.paper',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <PhoneIcon color="primary" sx={{ fontSize: 28 }} />
                    <Typography>۰۲۱-۱۲۳۴۵۶۷۸</Typography>
                  </Box>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2,
                      p: 2,
                      borderRadius: 1,
                      bgcolor: 'background.paper',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <EmailIcon color="primary" sx={{ fontSize: 28 }} />
                    <Typography>support@parnian-nihon.com</Typography>
                  </Box>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2,
                      p: 2,
                      borderRadius: 1,
                      bgcolor: 'background.paper',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <TelegramIcon color="primary" sx={{ fontSize: 28 }} />
                    <Link 
                      href="https://t.me/parnian_nihon" 
                      target="_blank" 
                      sx={{ 
                        textDecoration: 'none',
                        color: 'text.primary',
                        '&:hover': {
                          color: 'primary.main'
                        }
                      }}
                    >
                      @parnian_nihon
                    </Link>
                  </Box>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2,
                      p: 2,
                      borderRadius: 1,
                      bgcolor: 'background.paper',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <InstagramIcon color="primary" sx={{ fontSize: 28 }} />
                    <Link 
                      href="https://instagram.com/parnian_nihon" 
                      target="_blank" 
                      sx={{ 
                        textDecoration: 'none',
                        color: 'text.primary',
                        '&:hover': {
                          color: 'primary.main'
                        }
                      }}
                    >
                      @parnian_nihon
                    </Link>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* بخش سوالات متداول */}
        <Grid item xs={12}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, 
              border: 1, 
              borderColor: 'divider',
              borderRadius: 2
            }}
          >
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                color: 'primary.main',
                mb: 4
              }}
            >
              سوالات متداول
            </Typography>
            <Box>
              {faqs.map((faq, index) => (
                <Accordion key={index} sx={{ '&:not(:last-child)': { mb: 1 } }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight="medium">{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography color="text.secondary">{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* بخش راهنمای ارسال */}
        <Grid item xs={12}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, 
              border: 1, 
              borderColor: 'divider',
              borderRadius: 2
            }}
          >
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                color: 'primary.main',
                mb: 4
              }}
            >
              راهنمای ارسال
            </Typography>
            <Typography paragraph>
              فروشگاه پرنیان نیهون با همکاری معتبرترین شرکت‌های پستی، سفارش‌های شما را در سریع‌ترین زمان ممکن ارسال می‌کند.
            </Typography>
            <Typography paragraph>
              • ارسال در تهران: 1 تا 2 روز کاری
            </Typography>
            <Typography paragraph>
              • ارسال به شهرستان‌ها: 2 تا 4 روز کاری
            </Typography>
            <Typography paragraph>
              • هزینه ارسال برای خریدهای بالای 500 هزار تومان رایگان است
            </Typography>
            <Typography paragraph>
              • امکان پیگیری لحظه‌ای سفارش از طریق کد رهگیری
            </Typography>
            <Typography>
              • بسته‌بندی استاندارد و ایمن برای حفاظت از محصولات
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Support;