import React, { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LoginIcon from '@mui/icons-material/Login';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { user, userActivity } = useContext(UserContext);

  useEffect(() => {
    console.log('User data:', user);
    console.log('User activity:', userActivity);
  }, [user, userActivity]);

  // Add immediate check
  if (!user) {
    console.log('No user found, redirecting...');
    return <Navigate to="/account" />;
  }

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}
              >
                {user?.firstName?.[0]}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {`${user?.firstName} ${user?.lastName}`}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {user?.email}
              </Typography>
              <Typography color="text.secondary">
                {user?.mobile}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Chip label="کاربر فعال" color="success" sx={{ mx: 0.5 }} />
                {favorites.length > 5 && (
                  <Chip label="علاقه‌مند به محصولات" color="primary" sx={{ mx: 0.5 }} />
                )}
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                آمار فعالیت
              </Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="بازدیدهای اخیر" 
                    secondary={viewHistory.length} 
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText 
                    primary="علاقه‌مندی‌ها" 
                    secondary={favorites.length} 
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText 
                    primary="تاریخ عضویت" 
                    secondary={new Date(user.timestamp).toLocaleDateString('fa-IR')} 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                فعالیت‌های اخیر
              </Typography>
              {userActivity.length > 0 ? (
                <Timeline>
                  {userActivity.slice(0, 10).map((activity, index) => (
                    <TimelineItem key={index}>
                      <TimelineSeparator>
                        <TimelineDot color={
                          activity.action === 'purchase' ? 'success' :
                          activity.action === 'favorite' ? 'error' :
                          activity.action === 'view' ? 'info' : 'primary'
                        }>
                          {activityIcons[activity.action]}
                        </TimelineDot>
                        {index < userActivity.length - 1 && <TimelineConnector />}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Paper elevation={3} sx={{ p: 2 }}>
                          <Typography variant="subtitle2">
                            {activity.details}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(activity.timestamp).toLocaleString('fa-IR')}
                          </Typography>
                        </Paper>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography color="text.secondary">
                    هنوز فعالیتی ثبت نشده است
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;