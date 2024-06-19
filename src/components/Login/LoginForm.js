import React,  { useState } from 'react';
import { Typography, TextField, Button, Paper, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import AlertBox from '../AlertBox';

axios.defaults.withCredentials = true;

export default function LoginForm( { loginToApp }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");


  function logoutPreviousSession() {
    axios.post(process.env.REACT_APP_API_URL + 'logout/', null,
      {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken')
        },
        withCredentials: true
      }
    ).then(res => {
      console.log(res.data)
      localStorage.clear()
      loginNewUser();
    }
    ).catch(err => {
      console.log(err)
      loginNewUser();
    }
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    logoutPreviousSession();
  }

  const loginNewUser = () => {
    axios.post(process.env.REACT_APP_API_URL + 'login/',
      {
        "email": email,
        "password": password
      }
    ).then(res => {

      console.log(res.data)
      loginToApp(res.data);
      navigate('/trips');
    }
    ).catch(err => {
      if (err.response) {
        setMessageAlert("Credenciales Inválidas");
      } else {
        setMessageAlert("Hubo un error al iniciar sesión");
      }
      setOpenErrorAlert(true);
      console.log(err)
    }
    );
  }

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ padding: '50px', borderRadius: '15px', maxWidth: '50vw' }}>
        <>
          <Typography variant="h5" gutterBottom>
            Iniciar Sesión
          </Typography>
          <TextField label="Correo electrónico" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth style={{ marginBottom: '20px' }} />
          <TextField label="Contraseña" type="password" variant="outlined" onChange={(e) => setPassword(e.target.value)} value={password} fullWidth style={{ marginBottom: '20px' }} />
          <Button variant="contained" color="primary" fullWidth onClick={(e) => handleSubmit(e)}>
            Iniciar Sesión
          </Button>
        </>
      </Paper>
      <Grid item xs={12} sm={8} md={6} lg={19} style={{ display: 'flex', justifyContent: 'center', marginTop: '-200px' }}>
            <Button variant="contained" onClick={handleGoBack}>
              Volver
            </Button>
          </Grid>
      <AlertBox severity="error" messageAlert={messageAlert} setOpenAlert={setOpenErrorAlert} openAlert={openErrorAlert} hideDuration={6000} />
    </Grid>
  );
}
