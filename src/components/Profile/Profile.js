import React, { useState } from 'react';
import { Grid, Typography, Paper, Box, TextField, Button, Avatar, Tooltip, IconButton } from '@mui/material';
import Rating from '@mui/material/Rating';
import EditIcon from '@mui/icons-material/Edit';
import photo from '../../assets/images/messifoto.webp';
import image from '../../assets/images/messifoto.jpeg';

export default function ProfilePage() {
  const [editAvatarMessage, setEditAvatarMessage] = useState('');

  const userAvatarUrl = ''; // Cambia esto por la URL de tu foto de perfil
  const averageDriverRating = 4.5; // Promedio de calificación como conductor
  const averagePassengerRating = 4.7; // Promedio de calificación como pasajero

  const handleEditAvatar = () => {
    console.log('¡Haz clic en Editar para cambiar tu foto de perfil!');
    setEditAvatarMessage('¡Haz clic en Editar para cambiar tu foto de perfil!');
    // Aquí iría la lógica para abrir un modal o realizar cualquier acción de edición de foto
  };

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
        <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Avatar alt="Foto de perfil" src={''} sx={{ width: 150, height: 150, border: '2px solid black', zIndex: 0}}>
            <Tooltip title="Editar foto" placement="top">
              <IconButton
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  bgcolor: 'rgba(0, 0, 0, 0.6)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomLeftRadius: '50%',
                  borderBottomRightRadius: '50%',
                  zIndex: 1,
                  color: '#fff',
                  '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.8)' },
                }}
                onClick={handleEditAvatar}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Avatar>
        </Box>
        <Typography variant="body2" sx={{ textAlign: 'center', mb: 2 }}>Editar</Typography>
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
              label="Contraseña" 
              variant="outlined" 
              type="password" 
              defaultValue="password123" 
            />
          </Grid>
          <Grid item xs={12}>
            <Typography component="div" variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
              Calificación como conductor: 
              <Rating name="average-driver-rating" value={averageDriverRating} readOnly sx={{ ml: 1 }} />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component="div" variant="body1" sx={{ display: 'flex', alignItems: 'center', marginBottom: "10px" }}>
              Calificación como pasajero: 
              <Rating name="average-passenger-rating" value={averagePassengerRating} readOnly sx={{ ml: 1 }} />
            </Typography>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Button variant="outlined" color="primary">
                Editar
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
