// NewTrip.js
import React, { useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid, Typography, IconButton, Divider } from '@mui/material';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import PublishIcon from '@mui/icons-material/Publish';
import { Padding } from '@mui/icons-material';

const initialSeats = {
  piloto: true,
  copiloto: false,
  traseroIzquierda: false,
  traseroCentro: false,
  traseroDerecha: false,
};

const NewTrip = ({ open, handleClose, handleSubmit }) => {
  const [formValues, setFormValues] = useState({
    auto: '',
    inicio: '',
    destino: '',
    partida: '',
    llegada: ''
  });

  const [seats, setSeats] = useState(initialSeats);
  const [seatCount, setSeatCount] = useState(0);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const toggleSeat = (seat) => {
    setSeats((prevSeats) => {
      const updatedSeats = { ...prevSeats, [seat]: !prevSeats[seat] };
      const count = Object.values(updatedSeats).filter(selected => selected).length - 1; // -1 para excluir el piloto
      setSeatCount(count);
      return updatedSeats;
    });
  };

  const submitForm = () => {
    const allFieldsFilled = Object.values(formValues).every((value) => value !== '');
    if (allFieldsFilled) {
      handleSubmit({ ...formValues, seats });
      handleClose();
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
    <Typography variant="body1" sx={{ textAlign: 'left', ml: 4 }}>
    Complete los siguientes campos solicitados para publicar un nuevo viaje.
    </Typography>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="auto"
            label="Auto a ofrecer"
            type="text"
            fullWidth
            variant="outlined"
            value={formValues.auto}
            onChange={handleChange}
          />
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
          <Box sx={{ marginTop: 3 }}>
            <Grid container spacing={1} justifyContent="center">
              <Grid item>
               
                <IconButton onClick={() => toggleSeat('piloto')}>
                  <EventSeatIcon
                    style={{ color: seats.piloto ? '#3f51b5' : '#e0e0e0' }}
                  />
                </IconButton>
              </Grid>
              <Grid item>
               
                <IconButton onClick={() => toggleSeat('copiloto')}>
                  <EventSeatIcon
                    style={{ color: seats.copiloto ? '#3f51b5' : '#e0e0e0' }}
                  />
                </IconButton>
              </Grid>
            </Grid>
            <Grid container spacing={1} justifyContent="center" sx={{ marginTop: 1 }}>
              <Grid item>
               
                <IconButton onClick={() => toggleSeat('traseroIzquerda')}>
                  <EventSeatIcon
                    style={{ color: seats.traseroIzquerda ? '#3f51b5' : '#e0e0e0' }}
                  />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={() => toggleSeat('traseroCentro')}>
                  <EventSeatIcon
                    style={{ color: seats.traseroCentro ? '#3f51b5' : '#e0e0e0' }}
                  />
                </IconButton>
              
              </Grid>
              <Grid item>
            
                <IconButton onClick={() => toggleSeat('traseroDerecha')}>
                  <EventSeatIcon
                    style={{ color: seats.traseroDerecha ? '#3f51b5' : '#e0e0e0' }}
                  />
                </IconButton>
              </Grid>
            </Grid>
            <Box sx={{ marginTop: 2, textAlign: 'center' }}>
              <Typography variant="h6">Asientos a ofrecer: {seatCount}</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={submitForm} color="primary">
            Publicar viaje
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewTrip;
