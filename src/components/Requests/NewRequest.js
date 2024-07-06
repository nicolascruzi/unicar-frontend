import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const NewRequest = ({ trip_id, open, handleClose, handleSubmit }) => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    street: '',
    trip: trip_id,
  });

  const [error, setError] = useState('');

  useEffect(() => {
    setFormValues(prevValues => ({ ...prevValues, trip: trip_id }));
  }, [trip_id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const submitForm = async () => {
    let allFieldsFilled = formValues.street;

    if (allFieldsFilled) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}asks/create_ask/`, formValues,
          {
            headers: {
              'X-CSRFToken': Cookies.get('csrftoken')
            },
            withCredentials: true
          }
        );
        console.log('Success:', response.data);
        window.location.reload();
        handleClose();
        handleSubmit(formValues);
      } catch (error) {
        console.error('Error submitting trip:', error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data.detail || 'Error al enviar la solicitud. Intente nuevamente más tarde.' : 'Error al conectar con el servidor.');
      }
    } else {
      alert('Por favor, rellene todos los campos.');
    }
  };

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ marginLeft: 5, marginTop: 5, fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PublishIcon sx={{ mr: 1 }} />
          Solicitar Viaje
        </DialogTitle>
        <Typography variant="body1" sx={{ textAlign: 'left', ml: 4, mr: 4 }}>
          Complete los siguientes campos solicitados para publicar su solicitud.
        </Typography>

        <DialogContent>
            <>
              <TextField
                margin="dense"
                name="street"
                label="Dirección (incluir comuna)"
                type="text"
                fullWidth
                variant="outlined"
                value={formValues.street}
                onChange={handleChange}
              />

              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
            </>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
            <Button onClick={submitForm} color="primary">
              Solicitar Viaje
            </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewRequest;
