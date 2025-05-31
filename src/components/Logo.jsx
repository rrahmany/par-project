import React from 'react';
import { Box } from '@mui/material';

const Logo = () => {
  return (
    <Box
      component="img"
      src="/images/logo.png"
      alt="Parnian Beauty"
      sx={{
        height: 40,
        cursor: 'pointer'
      }}
    />
  );
};

export default Logo;