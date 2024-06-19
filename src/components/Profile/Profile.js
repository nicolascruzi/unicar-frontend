import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Paper, Grid, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    university: '',
    gender: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_URL + 'user_info/');
        setUserData({
          name: response.data.name,
          email: response.data.email,
          university: response.data.university,
          gender: response.data.gender,
        });
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(process.env.REACT_APP_URL + 'update_user/', userData, {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken')
        },
        withCredentials: true
      });
      console.log('Usuario actualizado:', response.data);
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleGoBack = () => {
    window.history.back();
  }

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
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              label="Email" 
              variant="outlined" 
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="university-label">Universidad</InputLabel>
              <Select
                labelId="university-label"
                id="university"
                name="university"
                value={userData.university}
                onChange={handleChange}
                label="Universidad"
              >
                <MenuItem value="PUC">Universidad Católica</MenuItem>
                <MenuItem value="UCH">Universidad de Chile</MenuItem>
                <MenuItem value="UANDES">Universidad de los Andes</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="gender-label">Género</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                name="gender"
                value={userData.gender}
                onChange={handleChange}
                label="Género"
              >
                <MenuItem value="Hombre">Hombre</MenuItem>
                <MenuItem value="Mujer">Mujer</MenuItem>
                <MenuItem value="Otro">Otro</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center" flexDirection="column" alignItems="center" gap={2}>
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Aplicar Cambios
            </Button>
            <Button variant="contained" onClick={handleGoBack}>
              Volver
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
