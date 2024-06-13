import React, { useState } from 'react';
import { Typography, TextField, Button, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function SignUpForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignUp = () => {
    // Lógica de registro aquí
    login();
    navigate('/trips');
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: '40px', borderRadius: '15px' }}>
          <>
            <Typography variant="h5" gutterBottom>
              Registro
            </Typography>
            <TextField label="Nombre" variant="outlined" fullWidth style={{ marginBottom: '20px' }} />
            <TextField label="Apellido" variant="outlined" fullWidth style={{ marginBottom: '20px' }} />
            <TextField label="Email" type="email" variant="outlined" fullWidth style={{ marginBottom: '20px' }} />
            <TextField label="Contraseña" type="password" variant="outlined" fullWidth style={{ marginBottom: '20px' }} />
            <TextField label="Verificar Contraseña" type="password" variant="outlined" fullWidth style={{ marginBottom: '20px' }} />
            <Button variant="contained" color="primary" fullWidth onClick={handleSignUp}>
              Registrarse
            </Button>
          </>
        </Paper>
      </Grid>
    </Grid>
  );
}
