import React, { useState, useEffect } from 'react';
import {
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Box
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import Cookies from 'js-cookie';


const RequestDetailsDialog = ({ request, open, onClose}) => {
  const [error, setError] = useState('');

  const handleApproveRequest = async () => {
    // Lógica para aprobar la solicitud
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}asks/update_ask/`, 
      {
        ask_id: request.id,
        decision: 'approved',      
      },{
          headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
          },
          withCredentials: true
        }
      );
      console.log('Success:', response.data);

    } catch(error) {
      console.error('Error submiting decision:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.detail || 'Error al enviar la solicitud. Intente nuevamente más tarde.' : 'Error al conectar con el servidor.');
    }
    
    console.log('Solicitud aprobada:', request);
    onClose();
  };

  const handleRejectRequest = async () => {
    // Lógica para rechazar la solicitud
    try {
      console.log("Holaaaa");
      const response = await axios.put(`${process.env.REACT_APP_API_URL}asks/update_ask/`,
        {
          'decision': 'denied',
           'ask_id': request.id},
        {
          headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
          },
          withCredentials: true
        }
      );
      console.log('Success:', response.data);
    } catch(error) {
      console.error('Error submiting decision:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.detail || 'Error al enviar la solicitud. Intente nuevamente más tarde.' : 'Error al conectar con el servidor.');
    }
    console.log('Solicitud rechazada:', request);
    onClose();
  };

  return (
    <Box
        sx={{ bgcolor: '#f5f5f5', padding: 6 }} >
      <Dialog open={open} onClose={onClose} >
        <DialogTitle style={{ textAlign: 'center', fontSize: '1.5rem', padding: 40 }}>Detalles de la Solicitud</DialogTitle>
        <Divider />
        <DialogContent style={{ padding: '20px 40px' }}>
          <Typography variant="body1" paragraph>
            <strong>Nombre:</strong> {request.nombre}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Ubicación de Recogida:</strong> {request.ubicacionRecogida}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Calificación como Pasajero:</strong> {request.calificacion}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Género:</strong> {request.genero}
          </Typography>
          <Typography variant="body1">
            <strong>Universidad:</strong> {request.universidad}
          </Typography>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center', padding: '20px 40px 30px' }}>
          <Button variant="contained" onClick={handleApproveRequest} style={{ backgroundColor: '#4caf50', borderRadius: '50%', padding: '20px' }}>
            <CheckIcon style={{ fontSize: '2rem' }} />
          </Button>
          <Button variant="contained" onClick={handleRejectRequest} style={{ backgroundColor: '#f44336', borderRadius: '50%', padding: '20px' }}>
            <ClearIcon style={{ fontSize: '2rem' }} />
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RequestDetailsDialog;
