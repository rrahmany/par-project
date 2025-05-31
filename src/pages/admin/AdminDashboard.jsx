import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import AdminLayout from './AdminLayout';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Typography variant="h4" gutterBottom>داشبورد</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">تعداد محصولات</Typography>
              <Typography variant="h4">150</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">سفارشات امروز</Typography>
              <Typography variant="h4">24</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">کاربران فعال</Typography>
              <Typography variant="h4">1,250</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">درآمد امروز</Typography>
              <Typography variant="h4">2,500,000 تومان</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default AdminDashboard;