import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, styled, Divider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import AccountCircle from '@mui/icons-material/AccountCircle';

const StyledButton = styled(Button)(({ theme, active }) => ({
  marginRight: theme.spacing(2),
  color: 'inherit',
  fontWeight: active ? 'bold' : 'normal',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    fontWeight: 'bold',
  },
}));

const Navbar = () => {
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + 'logout/', null, {
        withCredentials: true,
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken')
        }
      });

      if (response.status === 200) {
        console.log('Logout exitoso');
        window.location.href = '/'; // Redirige a la página de inicio
      } else {
        console.error('Hubo un problema al cerrar sesión');
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <AppBar position="static" style={{ background: '#0a0a2a' }}>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Unicar
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'right' }}>
          <StyledButton color="inherit" component={Link} to="/trips" active={location.pathname === '/trips'}>
            Viajes
          </StyledButton>
          <StyledButton color="inherit" component={Link} to="/requests" active={location.pathname === '/requests'}>
            Solicitudes
          </StyledButton>
          <StyledButton color="inherit" component={Link} to="/cars" active={location.pathname === '/cars'}>
            Autos
          </StyledButton>
          <StyledButton color="inherit" component={Link} to="/history" active={location.pathname === '/history'}>
            Historial
          </StyledButton>
          <StyledButton color="inherit" component={Link} to="/reviews" active={location.pathname === '/reviews'}>
            Reseñas
          </StyledButton>
          <StyledButton color="inherit" component={Link} to="/profile" startIcon={<AccountCircle />} active={location.pathname === '/profile'}>
            Perfil
          </StyledButton>
          <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', height: '35px', marginRight: '15px' }} />
          <StyledButton component={Link} to="/" onClick={handleLogout} sx={{ color: '#0a0a2a', backgroundColor: '#ffffff' }}>
            Cerrar Sesión
          </StyledButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
