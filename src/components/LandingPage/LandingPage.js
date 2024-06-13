import React from 'react';
import { Grid, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import backgroundImg from '../../assets/images/fotoauto.jpeg';

const StyledPaper = styled(Paper)(({ theme }) => ({
  transition: 'transform 0.3s',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  backdropFilter: 'blur(5px)',
  color: '#fff',
}));

const BackgroundImage = styled(Grid)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
  backgroundImage: `url(${backgroundImg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  opacity: 0.5,
}));

export default function LandingPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <Grid container style={{ minHeight: '100vh', position: 'relative' }}>
      <BackgroundImage />
      <Grid item xs={12} style={{ textAlign: 'center', padding: '100px', color: '#fff', position: 'relative', zIndex: 1 }}>
        <Typography variant="h2" gutterBottom style={{ fontWeight: 'bold', letterSpacing: '1px', marginBottom: '20px' }}>
          ¡Bienvenido a Unicar!
        </Typography>
        <Typography variant="h4" gutterBottom style={{ marginBottom: '40px' }}>
          La plataforma para ofrecer y pedir viajes en auto.
        </Typography>
        <Box sx={{ maxWidth: '600px', margin: '0 auto', color: '#fff' }}>
          <Typography variant="body1" gutterBottom>
            Con Unicar, puedes ofrecer tus trayectos y encontrar viajes compartidos fácilmente. Ofrece tus rutas indicando las direcciones de inicio y fin, y comienza a compartir gastos y hacer amigos en el camino.
          </Typography>
        </Box>
      </Grid>
      <Grid container item xs={12} spacing={2} justifyContent="center" >
        <Grid item xs={12} sm={6} md={4}>
          <StyledPaper
            elevation={3}
            sx={{
              backgroundColor: '#009688',
              padding: '20px',
              textAlign: 'center',
            }}
            onClick={handleLogin}
          >
            <DirectionsCarIcon sx={{ fontSize: 60, marginBottom: '10px' }} />
            <Typography variant="h5" gutterBottom>
              Iniciar Sesión
            </Typography>
            <Typography variant="body2" style={{ marginBottom: '20px' }}>
              Accede a tu cuenta para comenzar a encontrar viajes ahora.
            </Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StyledPaper
            elevation={3}
            sx={{
              backgroundColor: '#f44336',
              padding: '20px',
              textAlign: 'center',
            }}
            onClick={handleSignUp}
          >
            <PersonAddAlt1Icon sx={{ fontSize: 60, marginBottom: '10px' }} />
            <Typography variant="h5" gutterBottom>
              Registrarse
            </Typography>
            <Typography variant="body2" style={{ marginBottom: '20px' }}>
              Crea una cuenta nueva para empezar a usar nuestra plataforma.
            </Typography>
          </StyledPaper>
        </Grid>
      </Grid>
    </Grid>
  );
}
