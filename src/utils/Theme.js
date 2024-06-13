import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0a0a2a', // Color oscuro para la Navbar
    },
    background: {
      default: '#ffffff', // Fondo blanco para el resto de la aplicación
    },
    text: {
      primary: '#0a0a2a', // Texto oscuro para contraste en fondo blanco
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
