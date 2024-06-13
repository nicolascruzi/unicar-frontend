import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Button,
  Divider, // Asegúrate de importar Button
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import SendIcon from '@mui/icons-material/Send';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import RequestDetailsDialog from './RequestDetailsDialog'; // Asegúrate de importar el Dialog

// Datos de ejemplo
const incomingRequests = [
  {
    id: 1,
    nombre: 'Ana Pérez',
    ubicacionRecogida: 'Calle 123, Ciudad A',
    calificacion: 4.5,
    genero: 'Femenino',
    universidad: 'Universidad X',
  },
  {
    id: 2,
    nombre: 'Juan García',
    ubicacionRecogida: 'Avenida 456, Ciudad B',
    calificacion: 4.0,
    genero: 'Masculino',
    universidad: 'Universidad Y',
  },
  {
    id: 3,
    nombre: 'María López',
    ubicacionRecogida: 'Calle 789, Ciudad C',
    calificacion: 4.8,
    genero: 'Femenino',
    universidad: 'Universidad Z',
  },
];

const outgoingRequests = [
  {
    id: 1,
    destinatario: 'Carlos Rodríguez',
    auto: 'Toyota Corolla',
    lugarSalida: 'Avenida 321, Ciudad D',
    horaSalida: '09:00 AM',
    estado: 'Pendiente',
  },
  {
    id: 2,
    destinatario: 'Lucía Martínez',
    auto: 'Honda Civic',
    lugarSalida: 'Avenida 654, Ciudad F',
    horaSalida: '07:30 AM',
    estado: 'Aprobada',
  },
  {
    id: 3,
    destinatario: 'Pedro Sánchez',
    auto: 'Ford Fiesta',
    lugarSalida: 'Avenida 258, Ciudad H',
    horaSalida: '06:00 AM',
    estado: 'Rechazada',
  },
];

const Requests = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenRequestDetails = (request) => {
    setSelectedRequest(request);
    setRequestDialogOpen(true);
  };

  const handleCloseRequestDetails = () => {
    setSelectedRequest(null);
    setRequestDialogOpen(false);
  };

  const handleApproveRequest = (request) => {
    // Lógica para aprobar la solicitud
    console.log('Solicitud aprobada:', request);
    handleCloseRequestDetails();
  };

  const handleRejectRequest = (request) => {
    // Lógica para rechazar la solicitud
    console.log('Solicitud rechazada:', request);
    handleCloseRequestDetails();
  };

  return (
    <Box sx={{ p: 8 }}>
      <Typography variant="h4" gutterBottom >
        Solicitudes
      </Typography>
      <Divider sx={{marginBottom: 4}}></Divider>
      {/* <Typography variant="body1" gutterBottom sx={{marginBottom: 3}}>
        Aquí puedes ver las solicitudes entrantes y salientes relacionadas con tus viajes.
      </Typography>
       */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="Tablas de solicitudes"
        >
          <Tab label="Solicitudes Entrantes" icon={<MailIcon />} iconPosition="start" />
          <Tab label="Solicitudes Salientes" icon={<SendIcon />} iconPosition="start" />
        </Tabs>
      </Box>
      <Box sx={{ minHeight: '400px' }}>
        {tabValue === 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Ubicación de Recogida</TableCell>
                  <TableCell>Calificación</TableCell>
                  <TableCell>Género</TableCell>
                  <TableCell>Universidad</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {incomingRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.nombre}</TableCell>
                    <TableCell>{request.ubicacionRecogida}</TableCell>
                    <TableCell>{request.calificacion}</TableCell>
                    <TableCell>{request.genero}</TableCell>
                    <TableCell>{request.universidad}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenRequestDetails(request)} size="small">
                        <Button variant="outlined" color="primary"  size="small">
                          Resolver
                        </Button>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {tabValue === 1 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Destinatario</TableCell>
                  <TableCell>Auto</TableCell>
                  <TableCell>Lugar de Salida</TableCell>
                  <TableCell>Hora de Salida</TableCell>
                  <TableCell>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {outgoingRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.destinatario}</TableCell>
                    <TableCell>{request.auto}</TableCell>
                    <TableCell>{request.lugarSalida}</TableCell>
                    <TableCell>{request.horaSalida}</TableCell>
                    <TableCell>{request.estado}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      {selectedRequest && (
        <RequestDetailsDialog
          request={selectedRequest}
          open={requestDialogOpen}
          onClose={handleCloseRequestDetails}
          onApprove={() => handleApproveRequest(selectedRequest)}
          onReject={() => handleRejectRequest(selectedRequest)}
        />
      )}
    </Box>
  );
};

export default Requests;
