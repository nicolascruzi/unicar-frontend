import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Button, Divider, TextField, InputAdornment, IconButton, Avatar, Fab } from '@mui/material';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import SearchIcon from '@mui/icons-material/Search';
import SensorsIcon from '@mui/icons-material/Sensors';
import AddIcon from '@mui/icons-material/Add';
import { deepPurple, deepOrange } from '@mui/material/colors';
import backgroundImg from '../../assets/images/imagenMaps2.png';
import NewTrip from './NewTrip';
import axios from 'axios';
import MapComponent from '../GoogleMaps/MapComponent';

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

const calculateTimeToDeparture = (departureTime) => {
  const now = dayjs();
  const departure = dayjs(departureTime);
  const diff = departure.diff(now);
  const tripDuration = dayjs.duration(diff);

  if (tripDuration.asMinutes() <= 60) {
    return `${Math.floor(tripDuration.asMinutes())} minutos`;
  } else {
    return `${Math.floor(tripDuration.asHours())} horas`;
  }
};

const getRandomColor = (name) => {
  const colors = [deepPurple, deepOrange];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex][name.charAt(0).toUpperCase()];
};

export default function TripsPage() {
  const [open, setOpen] = useState(false);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}trips/upcoming/`);
        setTrips(response.data);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchTrips();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (formValues) => {
    console.log('Viaje publicado:', formValues);
  };

  return (
    <Box sx={{ p: 8 }}>
      <Typography variant="h4" gutterBottom>
        Búsqueda de Viajes
      </Typography>
      <Divider sx={{ marginBottom: 5 }}></Divider>

      {/* Barra de Búsqueda */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 4 }}>
        <TextField
          variant="outlined"
          placeholder="Buscar viajes..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1 }}
        />
        <TextField
          select
          variant="outlined"
          label="Filtrar por"
          SelectProps={{
            native: true,
          }}
          sx={{ minWidth: 200 }}
        >
          <option value="precio">Precio</option>
          <option value="destino">Destino</option>
          <option value="hora">Hora de salida</option>
          <option value="lugar">Lugar de salida</option>
        </TextField>
        <Button variant="contained" sx={{ backgroundColor: '#0a0a2a', '&:hover': { backgroundColor: '#00001e' } }}>
          Buscar
        </Button>
      </Box>

      {/* Lista de Viajes */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {trips.map((trip, index) => {
          const seatsAvailable = trip.capacity - trip.passengers.length;
          return (
            <Paper key={index} sx={{ p: 3, flex: '1 1 calc(50% - 16px)', boxShadow: 3, display: 'flex', minWidth: '300px', marginBottom: '16px' }}>
              <Box sx={{ width: '50%', pr: 2 }}>
                <MapComponent encodedPolyline={trip.polyline} />
              </Box>
              <Box sx={{ width: '50%', padding: "10px" }}>
                <Typography variant="h5" align="center" gutterBottom marginBottom={3}>
                  Viaje de {trip.driver.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Auto:</strong> {trip.car.brand} {trip.car.model}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Inicio:</strong> {trip.start_location}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Destino:</strong> {trip.end_location}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Hora de Partida:</strong> {dayjs(trip.start_date).format('DD/MM/YYYY HH:mm')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Hora de Llegada:</strong> {dayjs(trip.end_date).format('DD/MM/YYYY HH:mm')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Capacidad Máxima:</strong> {trip.capacity}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Asientos Disponibles:</strong> {seatsAvailable}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Pasajeros:</strong> 
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, margin: 2, justifyContent: "center" }}>
                  {trip.passengers.map((passenger, idx) => (
                    <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 2 }}>
                      <Avatar sx={{ bgcolor: getRandomColor(passenger.name), width: 80, height: 80, marginBottom: 1 }}>
                        {passenger.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="body2" align="center" sx={{ fontWeight: 'bold' }}>{passenger.name}</Typography>
                      <Typography variant="body2" align="center">{passenger.surname}</Typography>
                    </Box>
                  ))}
                </Box>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', color: 'green' }} gutterBottom>
                  <SensorsIcon sx={{ fontSize: '2em', marginRight: '4px' }} />
                  Viaje sale en {calculateTimeToDeparture(trip.start_date)}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, margin: 3 }}>
                  <Button variant="contained" sx={{ backgroundColor: '#0a0a2a', '&:hover': { backgroundColor: '#00001e' } }}>
                    Solicitar unirme
                  </Button>
                </Box>
              </Box>
            </Paper>
          );
        })}
      </Box>

      {/* Botón flotante */}
      <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 40, right: 40, backgroundColor: 'green', padding: 7 }} onClick={handleOpen}>
        CREAR VIAJE
      </Fab>

      {/* Diálogo de creación de viaje */}
      <NewTrip open={open} handleClose={handleClose} handleSubmit={handleSubmit} />
    </Box>
  );
}
