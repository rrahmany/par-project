export const ActivityTypes = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  VIEW_PRODUCT: 'view_product',
  ADD_TO_CART: 'add_to_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  PURCHASE: 'purchase',
  SEARCH: 'search',
  PROFILE_UPDATE: 'profile_update',
  FAVORITE_ADD: 'favorite_add',
  FAVORITE_REMOVE: 'favorite_remove'
};

export const trackUserActivity = (user, type, details) => {
  if (!user) return;

  const activity = {
    userId: user.email,
    type,
    details,
    timestamp: new Date().toISOString(),
    sessionId: localStorage.getItem('sessionId'),
    userAgent: navigator.userAgent,
    path: window.location.pathname
  };

  const activities = JSON.parse(localStorage.getItem('userActivities') || '[]');
  activities.unshift(activity);
  localStorage.setItem('userActivities', JSON.stringify(activities.slice(0, 100)));

  return activity;
};