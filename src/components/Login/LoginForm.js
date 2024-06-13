import React from 'react';
import { Typography, TextField, Button, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    // Lógica de autenticación aquí
    login();
    navigate('/trips');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} sx={{ padding: '50px', borderRadius: '15px', maxWidth: '50vw' }}>
        <>
          <Typography variant="h5" gutterBottom>
            Iniciar Sesión
          </Typography>
          <TextField label="Nombre de usuario" variant="outlined" fullWidth style={{ marginBottom: '20px' }} />
          <TextField label="Contraseña" type="password" variant="outlined" fullWidth style={{ marginBottom: '20px' }} />
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Iniciar Sesión
          </Button>
        </>
      </Paper>
    </Box>
  );
}
