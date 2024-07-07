import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Divider, Avatar, Fab, Tabs, Tab, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Rating } from '@mui/material';
import dayjs from 'dayjs';
import SensorsIcon from '@mui/icons-material/Sensors';
import axios from 'axios';
import MapComponent from '../GoogleMaps/MapComponent';
import NewTrip from './NewTrip';
import { calculateTimeToDeparture, getRandomColor } from '../../utils/utilsMyTrips';
import Cookies from 'js-cookie';

export default function TripsPage() {
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [driverTrips, setDriverTrips] = useState([]);
  const [passengerTrips, setPassengerTrips] = useState([]);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({ qualification: '', comment: '', trip: '', user_qualified: '' });
  const [reviewStatus, setReviewStatus] = useState({});

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const [driverResponse, passengerResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}trips/driver/`),
          axios.get(`${process.env.REACT_APP_API_URL}trips/passenger/`)
        ]);
        const completedDriverTrips = driverResponse.data.filter(trip => trip.completed === true)
        const completedPassengerTrips = passengerResponse.data.filter(trip => trip.completed === true)
        setDriverTrips(completedDriverTrips);
        setPassengerTrips(completedPassengerTrips);
        checkReviewsStatus(completedDriverTrips, completedPassengerTrips);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    const checkReviewsStatus = async (driverTrips, passengerTrips) => {
      for (const trip of driverTrips) {
        for (const passenger of trip.passengers) {
          const reviewStatusResponse = await axios.get(`${process.env.REACT_APP_API_URL}reviews/check/${trip.id}/${passenger.id}/`);
          setReviewStatus(prevStatus => ({
            ...prevStatus,
            [`${trip.id}_${passenger.id}`]: reviewStatusResponse.data.review_exists,
          }));
        }
      }
      for (const trip of passengerTrips) {
        const reviewStatusResponse = await axios.get(`${process.env.REACT_APP_API_URL}reviews/check/${trip.id}/${trip.driver.id}/`);
        setReviewStatus(prevStatus => ({
          ...prevStatus,
          [`${trip.id}_${trip.driver.id}`]: reviewStatusResponse.data.review_exists,
        }));
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

  const handleReviewOpen = async (trip, user_qualified) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}reviews/check/${trip}/${user_qualified}/`);
      if (!response.data.review_exists) {
        setReviewForm({ qualification: '', comment: '', trip, user_qualified });
        setReviewOpen(true);
      } else {
        alert('Ya has calificado a este usuario para este viaje.');
      }
    } catch (error) {
      console.error('Error checking review existence:', error);
    }
  };

  const handleReviewClose = () => {
    setReviewOpen(false);
  };

  const handleSubmit = (formValues) => {
    console.log('Viaje publicado:', formValues);
  };

  const handleReviewSubmit = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}reviews/create/`, reviewForm, {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken')
        },
        withCredentials: true
      });
      setReviewStatus(prevStatus => ({
        ...prevStatus,
        [`${reviewForm.trip}_${reviewForm.user_qualified}`]: true,
      }));
      setReviewOpen(false);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };

  const renderTrips = (trips, isDriver) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      {trips.map((trip, index) => {
        const seatsAvailable = trip.capacity - trip.passengers.length;
        const startDate = trip.start_date ? dayjs(trip.start_date).format('DD/MM/YYYY HH:mm') : null;
        const endDate = trip.end_date ? dayjs(trip.end_date).format('DD/MM/YYYY HH:mm') : null;
        const timeToDeparture = startDate ? calculateTimeToDeparture(trip.start_date) : null;
        const timeToArrival = endDate ? calculateTimeToDeparture(trip.end_date) : null;
        const showIcon = timeToDeparture || timeToArrival;

        return (
          <Paper key={index} sx={{ p: 3, flex: '1 1 calc(50% - 16px)', boxShadow: 3, display: 'flex', minWidth: '300px', marginBottom: '16px' }}>
            <Box sx={{ width: '50%', pr: 2 }}>
              <MapComponent encodedPolyline={trip.polyline} />
            </Box>
            <Box sx={{ width: '50%', padding: "10px" }}>
              <Typography variant="h5" align="center" gutterBottom marginBottom={3}>
                Viaje de {trip.driver.name}
              </Typography>
              {!isDriver && (
                <Button 
                  variant="outlined" 
                  fullWidth 
                  onClick={() => handleReviewOpen(trip.id, trip.driver.id)}
                  disabled={reviewStatus[`${trip.id}_${trip.driver.id}`]}
                >
                  Calificar Conductor
                </Button>
              )}
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
                    {isDriver && (
                      <Button 
                        variant="outlined" 
                        onClick={() => handleReviewOpen(trip.id, passenger.id)}
                        disabled={reviewStatus[`${trip.id}_${passenger.id}`]}
                      >
                        Calificar Pasajero
                      </Button>
                    )}
                  </Box>
                ))}
              </Box> 
            </Box>
          </Paper>
        );
      })}
    </Box>
  );

  return (
    <Box sx={{ p: 8 }}>
      <Typography variant="h4" gutterBottom>
        Historial de Viajes
      </Typography>
      <Divider sx={{ marginBottom: 5 }}></Divider>

      <Tabs value={tabIndex} onChange={handleChangeTab} aria-label="trip tabs">
        <Tab label="COMO CONDUCTOR" />
        <Tab label="COMO PASAJERO" />
      </Tabs>

      <Box>
        {tabIndex === 0 && renderTrips(driverTrips, true)}
        {tabIndex === 1 && renderTrips(passengerTrips, false)}
      </Box>

      <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 40, right: 40, backgroundColor: 'green', padding: 7 }} onClick={handleOpen}>
        CREAR VIAJE
      </Fab>

      <NewTrip open={open} handleClose={handleClose} handleSubmit={handleSubmit} />

      <Dialog open={reviewOpen} onClose={handleReviewClose}>
        <DialogTitle>Crear Reseña</DialogTitle>
        <DialogContent>
          <Rating
            name="qualification"
            value={Number(reviewForm.qualification)}
            onChange={(event, newValue) => setReviewForm({ ...reviewForm, qualification: newValue })}
          />
          <TextField
            margin="dense"
            id="comment"
            label="Comentario"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={reviewForm.comment}
            onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReviewClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleReviewSubmit} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
