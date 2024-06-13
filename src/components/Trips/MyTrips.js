import React, { useState } from 'react';
import { Box, Paper, Typography, Button, Tabs, Tab, Rating, Divider} from '@mui/material';
import { useLocation } from 'react-router-dom';
import backgroundImg from '../../assets/images/trayecto.png';

// Mock data for trips history
const tripsHistory = [
  {
    role: 'driver',
    conductor: "Juan Pérez",
    pasajeros: ["Ana", "Luis", "Carlos"],
    auto: "Susuki Celerio",
    inicio: "Calle 123, Ciudad A",
    destino: "Avenida 456, Ciudad B",
    partida: "06/12/2024 08:00:00 AM",
    llegada: "06/11/2024 10:00:00 AM",
    capacidadMaxima: 4,
    monto: 100,
    valorizaciones: {
      Ana: 4,
      Luis: 5,
      Carlos: 3,
    }
  },
  {
    role: 'driver',
    conductor: "María López",
    pasajeros: ["Pedro", "Claudia"],
    auto: "Toyota Corolla",
    inicio: "Calle 789, Ciudad C",
    destino: "Avenida 321, Ciudad D",
    partida: "06/12/2024 09:00:00 AM",
    llegada: "06/11/2024 11:30:00 AM",
    capacidadMaxima: 3,
    monto: 80,
    valorizaciones: {
      Pedro: 4,
      Claudia: 5,
    }
  },
  {
    role: 'driver',
    conductor: "María López",
    pasajeros: ["Pedro", "Claudia"],
    auto: "Toyota Corolla",
    inicio: "Calle 789, Ciudad C",
    destino: "Avenida 321, Ciudad D",
    partida: "06/12/2024 09:00:00 AM",
    llegada: "06/11/2024 11:30:00 AM",
    capacidadMaxima: 3,
    monto: 80,
    valorizaciones: {
      Pedro: 4,
      Claudia: 5,
    }
  },
  {
    role: 'driver',
    conductor: "María López",
    pasajeros: ["Pedro", "Claudia"],
    auto: "Toyota Corolla",
    inicio: "Calle 789, Ciudad C",
    destino: "Avenida 321, Ciudad D",
    partida: "06/12/2024 09:00:00 AM",
    llegada: "06/11/2024 11:30:00 AM",
    capacidadMaxima: 3,
    monto: 80,
    valorizaciones: {
      Pedro: 4,
      Claudia: 5,
    }
  },
  {
    role: 'passenger',
    conductor: "Carlos García",
    auto: "Honda Civic",
    inicio: "Calle 456, Ciudad E",
    destino: "Avenida 654, Ciudad F",
    partida: "06/12/2024 07:30:00 AM",
    llegada: "06/11/2024 09:30:00 AM",
    monto: 50,
    valorizacion: 5,
  },
  {
    role: 'passenger',
    conductor: "Ana Martínez",
    auto: "Ford Fiesta",
    inicio: "Calle 147, Ciudad G",
    destino: "Avenida 258, Ciudad H",
    partida: "06/12/2024 06:00:00 AM",
    llegada: "06/11/2024 08:00:00 AM",
    monto: 30,
    valorizacion: 4,
  },
  {
    role: 'passenger',
    conductor: "Carlos García",
    auto: "Honda Civic",
    inicio: "Calle 456, Ciudad E",
    destino: "Avenida 654, Ciudad F",
    partida: "06/12/2024 07:30:00 AM",
    llegada: "06/11/2024 09:30:00 AM",
    monto: 50,
    valorizacion: 5,
  },
  {
    role: 'passenger',
    conductor: "Ana Martínez",
    auto: "Ford Fiesta",
    inicio: "Calle 147, Ciudad G",
    destino: "Avenida 258, Ciudad H",
    partida: "06/12/2024 06:00:00 AM",
    llegada: "06/11/2024 08:00:00 AM",
    monto: 30,
    valorizacion: 4,
  }
];

const calculateTimeToDeparture = (departureTime) => {
  const now = new Date();
  const departure = new Date(departureTime);

  const diff = departure.getTime() - now.getTime();
  const minutesDiff = Math.floor(diff / (1000 * 60));

  if (minutesDiff <= 60) {
    return `${minutesDiff} minutos`;
  } else {
    const hoursDiff = Math.floor(minutesDiff / 60);
    return `${hoursDiff} horas`;
  }
};

const MyTrips = () => {
  const [tabValue, setTabValue] = useState(0); // 0 for driver, 1 for passenger
  const location = useLocation();

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ padding: 8 }}>
      <Typography variant="h4" gutterBottom>
        Historial de Viajes
      </Typography>
      {/* <Typography variant="body1" gutterBottom>
        Aquí puedes ver tu historial de viajes como conductor y como pasajero.
      </Typography> */}
      <Divider sx={{marginBottom: 4}}></Divider>

      <Tabs value={tabValue} onChange={handleChangeTab} sx={{ marginBottom: 4 }}>
        <Tab label="Como Conductor" />
        <Tab label="Como Pasajero" />
      </Tabs>
  
      {tabValue === 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {tripsHistory.map((trip, index) => (
          trip.role === 'driver' && (
            <Paper key={index} sx={{ padding: 3, boxShadow: 3, display: 'flex', flex: '1 1 calc(50% - 16px)', minWidth: '300px', marginBottom: '16px' }}>
              <Box sx={{ width: '50%', pr: 2 }}>
                <img src={backgroundImg} alt="Mapa de Google" style={{ width: '80%', height: '100%' }} />
              </Box>
              <Box sx={{ width: '50%' }}>
                <Typography variant="h5" align="center" gutterBottom>
                  Viaje de {trip.conductor}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Pasajeros:</strong> {trip.pasajeros.join(', ')}
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
                  <strong>Monto Pagado:</strong> ${trip.monto}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Valorización de Pasajeros:</strong>
                </Typography>
                {Object.keys(trip.valorizaciones).map((pasajero, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ width: 100 }}>
                      {pasajero}:
                    </Typography>
                    <Rating name={`rating-${index}`} value={trip.valorizaciones[pasajero]} readOnly />
                  </Box>
                ))}
                <Typography variant="body2" sx={{ color: 'green' }} gutterBottom>
                  ¡Completado!
                </Typography>
              </Box>
            </Paper>
          )
        ))}
      </Box>
      )}

      {tabValue === 1 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {tripsHistory.map((trip, index) => (
            trip.role === 'passenger' && (
              <Paper key={index} sx={{ p: 3, flex: '1 1 calc(50% - 16px)', boxShadow: 3, display: 'flex', minWidth: '400px', marginBottom: '16px' }}>
                <Box sx={{ width: '50%', pr: 2 }}>
                  <img src={backgroundImg} alt="Mapa de Google" style={{ width: '80%', height: '100%' }} />
                </Box>
                <Box sx={{ width: '50%' }}>
                  <Typography variant="h5" align="center" gutterBottom>
                    Viaje con {trip.conductor}
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
                    <strong>Monto Pagado:</strong> ${trip.monto}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Valorización:</strong>
                    <Rating name={`rating-${index}`} value={trip.valorizacion} readOnly />
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'green' }} gutterBottom>
                    ¡Completado!
                  </Typography>
                </Box>
              </Paper>
            )
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MyTrips;
