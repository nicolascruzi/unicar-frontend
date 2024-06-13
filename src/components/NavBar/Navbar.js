import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, styled } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

// Estilos personalizados para los botones
const StyledButton = styled(Button)(({ theme, active }) => ({
  marginRight: theme.spacing(2), // Aumentado el espacio entre botones
  color: 'white',
  fontWeight: active ? 'bold' : 'normal',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    fontWeight: 'bold',
  },
}));

const Navbar = () => {
  const location = useLocation();

  return (
    <AppBar position="static" style={{ background: '#0a0a2a' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Unicar
        </Typography>
        <Box>
          <StyledButton color="inherit" component={Link} to="/trips" active={location.pathname === '/trips'}>
            Viajes
          </StyledButton>
          <StyledButton color="inherit" component={Link} to="/requests" active={location.pathname === '/requests'}>
            Solicitudes
          </StyledButton>
          <StyledButton color="inherit" component={Link} to="/history" active={location.pathname === '/history'}>
            Historial
          </StyledButton>
          <StyledButton color="inherit" component={Link} to="/reviews" active={location.pathname === '/reviews'}>
            Reseñas
          </StyledButton>
          <StyledButton
            color="inherit"
            component={Link}
            to="/profile"
            startIcon={<AccountCircle />}
            active={location.pathname === '/profile'}
          >
            Perfil
          </StyledButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
