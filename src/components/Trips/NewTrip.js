import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel } from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { submitForm } from '../../utils/submitCarsForm';

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

  //opciones ida o regreso
  const [typeTrip, setTypeTrip] = useState('ida');

  const [university, setUniversity] = useState('PUC');

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}cars/get_cars/`, {
        withCredentials: true,
      });
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

  const handleSubmitForm = async () => {
    try {
      await submitForm(formValues, typeTrip, university, setError, handleClose, handleSubmit);
    } catch (error) {
      setError(error);
    }
  };

  // const formatDateTime = (dateTime) => {
  //   return new Date(dateTime).toISOString();
  // };

  

  // const submitForm = async () => {
  //   if (!formValues.car) {
  //     setError('Debe seleccionar un auto para crear el viaje.');
  //     return;
  //   }

  //   let allFieldsFilled;
  //   if (typeTrip === 'ida') {
  //     // only required fields for ida
  //     allFieldsFilled = formValues.car && formValues.start_location && university && formValues.end_date && formValues.capacity && formValues.price;
  //   } else if (typeTrip === 'vuelta') {
  //     // only required fields for vuelta
  //     allFieldsFilled = formValues.car && formValues.end_location && university && formValues.start_date && formValues.capacity && formValues.price;
  //   } else {
  //     allFieldsFilled = false;
  //   }

  //   if (allFieldsFilled) {
  //     try {
  //       let start_location_final;
  //       let end_location_final;
  //       let start_date_final;
  //       let end_date_final;
  //       if (typeTrip === 'vuelta') {
  //         start_location_final = university;
  //         end_location_final = formValues.end_location; // Set the end location to the university if the trip is vuelta
  //         start_date_final = formValues.start_date;
  //         end_date_final = null;
  //       } else {
  //         start_location_final = formValues.start_location; // Set the start location to the university if the trip is ida
  //         end_location_final = university;
  //         start_date_final = null;
  //         end_date_final = formValues.end_date;
  //       }

  //       const tripData = {
  //         driver: 1, // Cambiar cuando haya manejo de usuarios
  //         car: formValues.car,
  //         start_location: start_location_final,
  //         end_location: end_location_final,
  //         start_date: start_date_final ? formatDateTime(formValues.start_date) : null,
  //         end_date: end_date_final ? formatDateTime(formValues.end_date) : null,
  //         capacity: formValues.capacity,
  //         price: formValues.price,
  //         in_progress: false,
  //         passengers: formValues.passengers, // Add the passengers field
  //         type_trip: typeTrip
  //       };

  //       const response = await axios.post(`${process.env.REACT_APP_API_URL}trips/create/`, tripData,
  //         {
  //           headers: {
  //             'X-CSRFToken': Cookies.get('csrftoken')
  //           },
  //           withCredentials: true
  //         }
  //       );
  //       console.log('Success:', response.data);
  //       handleClose();
  //       handleSubmit(formValues); // Update parent state if needed
  //     } catch (error) {
  //       console.error('Error submitting trip:', error.response ? error.response.data : error.message);
  //       setError(error.response ? error.response.data.detail || 'Error al publicar el viaje. Intente nuevamente más tarde.' : 'Error al conectar con el servidor.');
  //     }
  //   } else {
  //     alert('Por favor, rellene todos los campos.');
  //   }
  // };

  const toggleTripType = () => {
    setTypeTrip(typeTrip === 'ida' ? 'vuelta' : 'ida'); // Toggle between ida and vuelta
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

        {/* Button to select if the trip is for ida or vuelta, the button change type_trip useState */}
        <FormControlLabel
          control={
            <Switch
              checked={typeTrip === 'vuelta'}
              onChange={toggleTripType}
              color="primary"
            />
          }
          label={typeTrip === 'vuelta' ? 'Vuelta' : 'Ida'}
          sx={{ ml: 4, mt: 2 }}
        />

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
                  data-testid="auto-select"
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

              
              { typeTrip === 'ida' ?
                <div>
                  <TextField
                  margin="dense"
                  name="start_location"
                  label="Ubicación de partida (incluir comuna)"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={formValues.start_location}
                  onChange={handleChange}
                  />
                  <FormControl variant="outlined" fullWidth style={{ marginTop: '10px' }}>
                  <InputLabel id="university-label">Universidad Destino</InputLabel>
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
                </div>
                :
                <div>
                  <FormControl variant="outlined" fullWidth style={{ marginTop: '10px' }}>
                  <InputLabel id="university-label">Universidad Inicio</InputLabel>
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
                  <TextField
                    margin="dense"
                    name="end_location"
                    label="Ubicación de llegada (incluir comuna)"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={formValues.end_location}
                    onChange={handleChange}
                  />
                </div>
              }
              { typeTrip === 'ida' ?
              
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
                :
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
              }

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
            <Button onClick={() => submitForm(formValues, typeTrip, university, setError, handleClose, handleSubmit)} color="primary">
              Publicar viaje
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewTrip;
