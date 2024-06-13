import React from 'react';
import { Grid, Typography, Paper, Box, TextField, Button } from '@mui/material';

export default function ProfilePage() {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh"
      sx={{ bgcolor: '#f5f5f5', padding: 2 }}
    >
      <Paper elevation={3} sx={{ padding: 3, maxWidth: 500, width: '100%' }}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center">
          Perfil de Usuario
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              label="Nombre" 
              variant="outlined" 
              defaultValue="Juan" 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              label="Apellido" 
              variant="outlined" 
              defaultValue="Pérez" 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              label="Universidad" 
              variant="outlined" 
              defaultValue="Universidad de Ejemplo" 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              label="Género" 
              variant="outlined" 
              defaultValue="Masculino" 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              label="Calificación como conductor" 
              variant="outlined" 
              defaultValue="4.5" 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              label="Calificación como pasajero" 
              variant="outlined" 
              defaultValue="4.7" 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              label="Contraseña" 
              variant="outlined" 
              type="password" 
              defaultValue="password123" 
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Button variant="contained" color="primary">
              Cambiar Contraseña
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
