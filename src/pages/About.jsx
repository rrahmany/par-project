import React from 'react';
import { 
  Container, Typography, Grid, Paper, Box 
} from '@mui/material';

const About = () => {
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
        درباره پرنیان نیهون
      </Typography>

      <Grid container spacing={4}>
        {/* کارت درباره ما */}
        <Grid item xs={12}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 4,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
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
              sx={{ 
                fontWeight: 'bold',
                color: 'primary.main',
                mb: 3
              }}
            >
              درباره ما
            </Typography>
            <Typography paragraph>
              پرنیان نیهون، پیشگام در عرضه محصولات آرایشی و بهداشتی ژاپنی در ایران، با هدف ارائه محصولات با کیفیت و اصل ژاپنی به مشتریان ایرانی تأسیس شده است.
            </Typography>
            <Typography paragraph>
              ما با همکاری مستقیم با تولیدکنندگان معتبر ژاپنی و رعایت استانداردهای سختگیرانه در انتخاب و عرضه محصولات، اطمینان حاصل می‌کنیم که مشتریان ما بهترین محصولات را دریافت می‌کنند.
            </Typography>
            <Typography>
              تیم متخصص ما با تجربه و دانش کافی در زمینه محصولات آرایشی و بهداشتی، آماده ارائه مشاوره و راهنمایی به مشتریان عزیز است.
            </Typography>
          </Paper>
        </Grid>

        {/* کارت قوانین و مقررات */}
        <Grid item xs={12}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 4,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
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
              sx={{ 
                fontWeight: 'bold',
                color: 'primary.main',
                mb: 3
              }}
            >
              قوانین و مقررات
            </Typography>
            <Typography paragraph>
              • تمامی محصولات ارائه شده در فروشگاه پرنیان نیهون دارای ضمانت اصالت کالا هستند.
            </Typography>
            <Typography paragraph>
              • مهلت بازگشت کالا در صورت عدم رضایت، حداکثر 7 روز پس از دریافت محصول است.
            </Typography>
            <Typography paragraph>
              • محصولات باید در بسته‌بندی اصلی و بدون استفاده برای مرجوعی تحویل داده شوند.
            </Typography>
            <Typography paragraph>
              • هزینه ارسال مرجوعی در صورت تأیید مشکل کیفی کالا، بر عهده فروشگاه است.
            </Typography>
            <Typography>
              • پرداخت وجه سفارش‌ها به صورت آنلاین و از طریق درگاه‌های معتبر بانکی انجام می‌شود.
            </Typography>
          </Paper>
        </Grid>

        {/* کارت حریم خصوصی */}
        <Grid item xs={12}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 4,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
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
              sx={{ 
                fontWeight: 'bold',
                color: 'primary.main',
                mb: 3
              }}
            >
              حریم خصوصی
            </Typography>
            <Typography paragraph>
              • اطلاعات شخصی کاربران نزد ما محفوظ است و به هیچ عنوان در اختیار اشخاص ثالث قرار نمی‌گیرد.
            </Typography>
            <Typography paragraph>
              • رمز عبور کاربران به صورت رمزنگاری شده ذخیره می‌شود و حتی کارکنان سایت به آن دسترسی ندارند.
            </Typography>
            <Typography paragraph>
              • اطلاعات پرداخت کاربران از طریق درگاه‌های امن بانکی پردازش می‌شود و ما هیچ اطلاعات کارت بانکی را ذخیره نمی‌کنیم.
            </Typography>
            <Typography paragraph>
              • کوکی‌های مورد استفاده در سایت صرفاً برای بهبود تجربه کاربری و حفظ اطلاعات سبد خرید است.
            </Typography>
            <Typography>
              • کاربران می‌توانند در هر زمان درخواست حذف حساب کاربری و اطلاعات خود را ارائه دهند.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;