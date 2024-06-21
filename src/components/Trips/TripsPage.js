import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Button, Divider, Fab } from '@mui/material';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import SensorsIcon from '@mui/icons-material/Sensors';
import { deepPurple, deepOrange } from '@mui/material/colors';
import NewTrip from './NewTrip';
import NewRequest from '../Requests/NewRequest';
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
  const [askToJoin, setAskToJoin] = useState(false);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}trips/upcoming/`, {
          withCredentials: true,
        });
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

  const handleAskToJoin = (tripId) => {
    setAskToJoin(true);
    handleJoinRequest();
  };

  const handleCloseAskToJoin = () => {
    setAskToJoin(false);
  };

  const handleSubmit = (formValues) => {
    console.log('Viaje publicado:', formValues);
  };

  const handleSubmitAsk = (formValues) => {
    console.log(' Solicitud enviada:', formValues);
  }

  const handleJoinRequest = async () => {
    try {
      console.log(askToJoin);
      // const response = await axios.post(`${process.env.REACT_APP_API_URL}trips/${tripId}/join/`);
      // console.log('Solicitud enviada:', response.data);
      // Aquí puedes agregar código para actualizar la interfaz de usuario, si es necesario.
    } catch (error) {
      console.error('Error al solicitar unirse al viaje:', error);
    }
  };

  return (
    <Box sx={{ p: 8 }}>
      <Typography variant="h4" gutterBottom>
        Búsqueda de Viajes
      </Typography>
      <Divider sx={{ marginBottom: 5 }}></Divider>

      {/* Lista de Viajes */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {trips.map((trip, index) => {
          const seatsAvailable = trip.capacity - trip.passengers.length;
          const startDate = trip.start_date ? dayjs(trip.start_date).format('DD/MM/YYYY HH:mm') : null;
          const endDate = trip.end_date ? dayjs(trip.end_date).format('DD/MM/YYYY HH:mm') : null;
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
                  <strong>Inicio:</strong> {trip.start_location.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Destino:</strong> {trip.end_location.name}
                </Typography>
                {startDate && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Hora de Partida:</strong> {startDate}
                  </Typography>
                )}
                {endDate && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Hora de Llegada:</strong> {endDate}
                  </Typography>
                )}
                <Typography variant="body1" gutterBottom>
                  <strong>Capacidad Máxima:</strong> {trip.capacity}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Asientos Disponibles:</strong> {seatsAvailable}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Precio:</strong> {trip.price}
                </Typography>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', color: 'green' }} gutterBottom>
                  <SensorsIcon sx={{ fontSize: '2em', marginRight: '4px' }} />
                  {startDate && (
                    <Typography variant="body1" gutterBottom>
                      Viaje sale en {calculateTimeToDeparture(trip.start_date)}
                    </Typography>
                  )}
                  {endDate && (
                    <Typography variant="body1" gutterBottom>
                      Viaje finaliza en {calculateTimeToDeparture(trip.end_date)}
                    </Typography>
                  )}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, margin: 3 }}>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: '#0a0a2a', '&:hover': { backgroundColor: '#00001e' } }}
                    onClick={()=> handleAskToJoin(trip.id)}>
                    Solicitar unirme
                  </Button>
                  {/* Aca se envia la solicitud para unirse */}
                  <NewRequest trip_id={trip.id} open={askToJoin} handleClose={handleCloseAskToJoin} handleSubmit={handleSubmitAsk}></NewRequest>
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
