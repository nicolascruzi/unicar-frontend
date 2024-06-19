import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import { useNavigate } from 'react-router-dom';

const NewTrip = ({ open, handleClose, handleSubmit }) => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    auto: '',
    inicio: '',
    destino: '',
    partida: '',
    llegada: '',
    asientos: 0,
    limiteAsientos: 4 // Default limit, can be updated based on selected car
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
    const selectedAuto = event.target.value;
    const limiteAsientos = getAutoSeatLimit(selectedAuto); // Replace with logic to get seat limit
    setFormValues({ ...formValues, auto: selectedAuto, limiteAsientos, asientos: 0 });
  };

  const submitForm = () => {
    if (!formValues.auto) {
      setError('Debe seleccionar un auto para crear el viaje.');
      return;
    }

    const allFieldsFilled = Object.values(formValues).every((value) => value !== '');
    if (allFieldsFilled) {
      handleSubmit(formValues);
      handleClose();
    } else {
      alert('Por favor, rellene todos los campos.');
    }
  };

  const getAutoSeatLimit = (auto) => {
    const car = cars.find((car) => car.id === auto);
    return car ? car.capacity : 4; // Default to 4 if not found
  };

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ marginLeft: 5, marginTop: 5, fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PublishIcon sx={{ mr: 1 }} />
          Publicar Viaje
        </DialogTitle>
        <Typography variant="body1" sx={{ textAlign: 'left', ml: 4, mr:4 }}>
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
                  name="auto"
                  value={formValues.auto}
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
                name="inicio"
                label="Ubicación de partida"
                type="text"
                fullWidth
                variant="outlined"
                value={formValues.inicio}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="destino"
                label="Ubicación de llegada"
                type="text"
                fullWidth
                variant="outlined"
                value={formValues.destino}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="partida"
                label="Hora de partida"
                type="datetime-local"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={formValues.partida}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="llegada"
                label="Hora de llegada estimada"
                type="datetime-local"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={formValues.llegada}
                onChange={handleChange}
              />

              <TextField
                margin="dense"
                name="asientos"
                label={`Asientos a ofrecer (0 - ${formValues.limiteAsientos - 1})`}
                type="number"
                fullWidth
                variant="outlined"
                InputProps={{ inputProps: { min: 0, max: formValues.limiteAsientos - 1 } }}
                value={formValues.asientos}
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
