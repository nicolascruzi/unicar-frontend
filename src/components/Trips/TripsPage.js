// TripsPage.js
import React, { useState } from 'react';
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

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

const calculateTimeToDeparture = (departureTime) => {
  const now = dayjs();
  const departure = dayjs(departureTime, 'MM/DD/YYYY hh:mm:ss A');

  const diff = departure.diff(now);
  const duration = dayjs.duration(diff);

  if (duration.asMinutes() <= 60) {
    return `${Math.floor(duration.asMinutes())} minutos`;
  } else {
    return `${Math.floor(duration.asHours())} horas`;
  }
};

const getRandomColor = (name) => {
  const colors = [deepPurple, deepOrange];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex][name.charAt(0).toUpperCase()];
};

export default function TripsPage() {
  const [open, setOpen] = useState(false);

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
          const asientosDisponibles = trip.capacidadMaxima - trip.pasajeros.length;
          return (
            <Paper key={index} sx={{ p: 3, flex: '1 1 calc(50% - 16px)', boxShadow: 3, display: 'flex', minWidth: '300px', marginBottom: '16px' }}>
              <Box sx={{ width: '50%', pr: 2 }}>
                <img src={backgroundImg} alt="Mapa de Google" style={{ width: '100%', height: '100%' }} />
              </Box>
              <Box sx={{ width: '50%', padding: "10px" }}>
                <Typography variant="h5" align="center" gutterBottom marginBottom={3}>
                  Viaje de {trip.conductor}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Auto:</strong> {trip.auto}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Inicio:</strong> {trip.inicio}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Destino:</strong> {trip.destino}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Hora de Partida:</strong> {trip.partida}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Hora de Llegada:</strong> {trip.llegada}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Capacidad Máxima:</strong> {trip.capacidadMaxima}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Asientos Disponibles:</strong> {asientosDisponibles}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Pasajeros:</strong> 
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, margin: 2, justifyContent: "center" }}>
                  {trip.pasajeros.map((pasajero, idx) => (
                    <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 2 }}>
                      <Avatar sx={{ bgcolor: getRandomColor(pasajero.nombre), width: 80, height: 80, marginBottom: 1 }}>
                        {pasajero.nombre.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="body2" align="center" sx={{ fontWeight: 'bold' }}>{pasajero.nombre}</Typography>
                      <Typography variant="body2" align="center">{pasajero.apellido}</Typography>
                    </Box>
                  ))}
                </Box>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', color: 'green' }} gutterBottom>
                  <SensorsIcon sx={{ fontSize: '2em', marginRight: '4px' }} />
                  Viaje sale en {calculateTimeToDeparture(trip.partida)}
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

const trips = [
  {
    conductor: "Juan Pérez",
    pasajeros: [
      { nombre: "Ana", apellido: "González" },
      { nombre: "Luis", apellido: "Martínez" },
      { nombre: "Carlos", apellido: "Sánchez" }
    ],
    auto: "Susuki Celerio",
    inicio: "Calle 123, Ciudad A",
    destino: "Avenida 456, Ciudad B",
    partida: "06/12/2024 08:00:00 AM",
    llegada: "06/11/2024 10:00:00 AM",
    capacidadMaxima: 4
  },
  {
    conductor: "María López",
    pasajeros: [
      { nombre: "Pedro", apellido: "Pérez" },
      { nombre: "Claudia", apellido: "Fernández" }
    ],
    auto: "Toyota Corolla",
    inicio: "Calle 789, Ciudad C",
    destino: "Avenida 321, Ciudad D",
    partida: "06/12/2024 09:00:00 AM",
    llegada: "06/11/2024 11:30:00 AM",
    capacidadMaxima: 3
  },
  {
    conductor: "Carlos García",
    pasajeros: [
      { nombre: "Laura", apellido: "Gómez" },
      { nombre: "Miguel", apellido: "Díaz" },
      { nombre: "Sara", apellido: "López" },
      { nombre: "José", apellido: "García" }
    ],
    auto: "Honda Civic",
    inicio: "Calle 456, Ciudad E",
    destino: "Avenida 654, Ciudad F",
    partida: "06/12/2024 07:30:00 AM",
    llegada: "06/11/2024 09:30:00 AM",
    capacidadMaxima: 5
  },
  {
    conductor: "Ana Martínez",
    pasajeros: [
      { nombre: "Alberto", apellido: "Hernández" },
      { nombre: "Lucía", apellido: "Ramírez" }
    ],
    auto: "Ford Fiesta",
    inicio: "Calle 147, Ciudad G",
    destino: "Avenida 258, Ciudad H",
    partida: "06/12/2024 06:00:00 AM",
    llegada: "06/11/2024 08:00:00 AM",
    capacidadMaxima: 3
  },
  {
    conductor: "Luis Fernández",
    pasajeros: [
      { nombre: "Mariana", apellido: "López" },
      { nombre: "Fernanda", apellido: "Pérez" },
      { nombre: "Jorge", apellido: "Martínez" }
    ],
    auto: "Chevrolet Spark",
    inicio: "Calle 369, Ciudad I",
    destino: "Avenida 741, Ciudad J",
    partida: "06/12/2024 05:30:00 AM",
    llegada: "06/12/2024 07:45:00 AM",
    capacidadMaxima: 4
  }
];