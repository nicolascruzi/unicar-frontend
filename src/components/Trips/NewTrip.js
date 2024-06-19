import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const NewTrip = ({ open, handleClose, handleSubmit }) => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    car: '',
    start_location: '',
    end_location: '',
    start_date: '',
    end_date: '',
    capacity: 0,
    price: 0,
    passengers: [] // Add passengers here
  });

  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/cars/get_cars/`);
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleClickCars = () => {
    navigate('/cars');
  };

  const handleAutoChange = (event) => {
    setFormValues({ ...formValues, car: event.target.value });
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toISOString();
  };

  const submitForm = async () => {
    if (!formValues.car) {
      setError('Debe seleccionar un auto para crear el viaje.');
      return;
    }

    const allFieldsFilled = Object.values(formValues).every((value) => value !== '' && value !== null);
    if (allFieldsFilled) {
      try {
        const tripData = {
          driver: 1, // Cambiar cuando haya manejo de usuarios
          car: formValues.car,
          start_location: formValues.start_location,
          end_location: formValues.end_location,
          start_date: formatDateTime(formValues.start_date),
          end_date: formatDateTime(formValues.end_date),
          capacity: formValues.capacity,
          price: formValues.price,
          in_progress: false,
          passengers: formValues.passengers // Add the passengers field
        };

        const response = await axios.post(`${process.env.REACT_APP_API_URL}trips/create/`, tripData,
          {
            headers: {
              'X-CSRFToken': Cookies.get('csrftoken')
            },
            withCredentials: true
          }
        );
        console.log('Success:', response.data);
        handleClose();
        handleSubmit(formValues); // Update parent state if needed
      } catch (error) {
        console.error('Error submitting trip:', error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data.detail || 'Error al publicar el viaje. Intente nuevamente más tarde.' : 'Error al conectar con el servidor.');
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
          Publicar Viaje
        </DialogTitle>
        <Typography variant="body1" sx={{ textAlign: 'left', ml: 4, mr: 4 }}>
          Complete los siguientes campos solicitados para publicar un nuevo viaje.
        </Typography>

        <DialogContent>
          {cars.length === 0 ? (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1" color="error" sx={{ mt: 2 }}>
                No tiene autos disponibles.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleClickCars}>
                Crear un auto
              </Button>
            </Box>
          ) : (
            <>
              <FormControl fullWidth variant="outlined" margin="dense">
                <InputLabel id="auto-select-label">Auto</InputLabel>
                <Select
                  labelId="auto-select-label"
                  id="auto-select"
                  name="car"
                  value={formValues.car}
                  onChange={handleAutoChange}
                  label="Auto a ofrecer"
                >
                  {cars.map((car) => (
                    <MenuItem key={car.id} value={car.id}>
                      {car.brand} {car.model}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                margin="dense"
                name="start_location"
                label="Ubicación de partida"
                type="text"
                fullWidth
                variant="outlined"
                value={formValues.start_location}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="end_location"
                label="Ubicación de llegada"
                type="text"
                fullWidth
                variant="outlined"
                value={formValues.end_location}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="start_date"
                label="Hora de partida"
                type="datetime-local"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={formValues.start_date}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="end_date"
                label="Hora de llegada estimada"
                type="datetime-local"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={formValues.end_date}
                onChange={handleChange}
              />

              <TextField
                margin="dense"
                name="capacity"
                label="Capacidad"
                type="number"
                fullWidth
                variant="outlined"
                InputProps={{ inputProps: { min: 1 } }}
                value={formValues.capacity}
                onChange={handleChange}
              />

              <TextField
                margin="dense"
                name="price"
                label="Precio"
                type="number"
                fullWidth
                variant="outlined"
                InputProps={{ inputProps: { min: 0 } }}
                value={formValues.price}
                onChange={handleChange}
              />

              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          {cars.length > 0 && (
            <Button onClick={submitForm} color="primary">
              Publicar viaje
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewTrip;
