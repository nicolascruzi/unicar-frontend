import React, { useState } from 'react';
import { Typography, TextField, Button, Paper, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AlertBox from '../AlertBox';
import axios from 'axios';
import Cookies from 'js-cookie';
import { checkFields, checkPassword, checkEmail } from '../../utils/signUpUtils';

export default function SignUpForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [university, setUniversity] = useState('');
  const [gender, setGender] = useState('');
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [openSuccessAlert, setOpenSuccessrAlert] = useState(false);

  // const checkPasswords = () => {
  //   if (password === verifyPassword) {
  //     return true;
  //   }
  //   setMessageAlert("Las contraseñas no coinciden");
  //   setOpenErrorAlert(true);
  //   return false;
  // }

  // const checkFields = () => {
  //   if (name && email && password && verifyPassword && university && gender) {
  //     return true;
  //   }
  //   setMessageAlert("Por favor, complete todos los campos");
  //   setOpenErrorAlert(true);
  //   return false;
  // }

  // const checkEmail = () => {
  //   if (email.includes('@')) {
  //     return true;
  //   }
  //   setMessageAlert("Por favor, ingrese un email válido");
  //   setOpenErrorAlert(true);
  //   return false;
  // }

  const handleSignUp = () => {
    const isPasswordValid = checkPassword(password, verifyPassword, setMessageAlert, setOpenErrorAlert);
    const areFieldsValid = checkFields(name, email, password, verifyPassword, university, gender, setMessageAlert, setOpenErrorAlert);
    const isEmailValid = checkEmail(email, setMessageAlert, setOpenErrorAlert);
    if (isPasswordValid && areFieldsValid && isEmailValid) {
      axios.post(process.env.REACT_APP_API_URL + 'register/', {
        "name": name,
        "email": email,
        "password": password,
        "university": university,
        "gender": gender
      }, {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken')
        },
        withCredentials: true
      }).then(res => {
        console.log(res.data)
        setOpenSuccessrAlert(true);
        navigate('/login');
      }).catch(err => {
        console.log(err)
        setMessageAlert("Hubo un error al crear el usuario");
        setOpenErrorAlert(true);
      });
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: '40px', borderRadius: '15px' }}>
          <>
            <Typography variant="h5" gutterBottom>
              Registro
            </Typography>
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              style={{ marginBottom: '20px' }}
              name="firstName"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              style={{ marginBottom: '20px' }}
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              style={{ marginBottom: '20px' }}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Verificar Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              style={{ marginBottom: '20px' }}
              name="password2"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
            />
            <FormControl variant="outlined" fullWidth style={{ marginBottom: '20px' }}>
              <InputLabel id="university-label">Universidad</InputLabel>
              <Select
                labelId="university-label"
                id="university"
                name="university"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                label="Universidad"
              >
                <MenuItem value="PUC">Universidad Católica</MenuItem>
                <MenuItem value="UCH">Universidad de Chile</MenuItem>
                <MenuItem value="UANDES">Universidad de los Andes</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth style={{ marginBottom: '20px' }}>
              <InputLabel id="gender-label">Género</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                label="Género"
              >
                <MenuItem value="Hombre">Hombre</MenuItem>
                <MenuItem value="Mujer">Mujer</MenuItem>
                <MenuItem value="Otro">Otro</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" fullWidth onClick={handleSignUp}>
              Registrarse
            </Button>
          </>
        </Paper>
        <Grid item xs={12} sm={8} md={6} lg={19} style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button variant="contained" onClick={handleGoBack}>
          Volver
        </Button>
      </Grid>
      </Grid>
      <AlertBox severity="error" messageAlert={messageAlert} setOpenAlert={setOpenErrorAlert} openAlert={openErrorAlert} hideDuration={6000} />
      <AlertBox severity="success" messageAlert="Usuario creado exitosamente" setOpenAlert={setOpenSuccessrAlert} openAlert={openSuccessAlert} hideDuration={3000} />
    </Grid>
  );
}
