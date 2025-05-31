import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// در بخش JSX
<Button 
  variant="contained" 
  color="primary"
  onClick={() => navigate('/admin/products/add')}
>
  افزودن محصول جدید
</Button>