import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Cookies from 'js-cookie';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCarIndex, setCurrentCarIndex] = useState(null);
  const [newCar, setNewCar] = useState({
    brand: '',
    model: '',
    year: '',
    license_plate: '',
    capacity: '',
  });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}cars/get_cars`, {
        withCredentials: true,
      });
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewCar({ ...newCar, [name]: value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setNewCar({
      brand: '',
      model: '',
      year: '',
      license_plate: '',
      capacity: '',
    });
  };

  const handleSubmit = async () => {
    const { brand, model, year, license_plate, capacity } = newCar;
    if (brand && model && year && license_plate && capacity) {
      try {
        if (isEditing) {
          const updatedCar = await axios.put(`${process.env.REACT_APP_API_URL}cars/edit_car/${cars[currentCarIndex].id}/`, newCar,
            {
              headers: {
                'X-CSRFToken': Cookies.get('csrftoken')
              },
              withCredentials: true
            }
          );

          const updatedCars = cars.map((car, index) => 
            index === currentCarIndex ? updatedCar.data : car
          );
          setCars(updatedCars);
        } else {
          const createdCar = await axios.post(`${process.env.REACT_APP_API_URL}cars/create_car/`, newCar,
            {
              headers: {
                'X-CSRFToken': Cookies.get('csrftoken')
              },
              withCredentials: true
            }
          );

          setCars([...cars, createdCar.data]);
        }
        handleClose();
      } catch (error) {
        console.error('Error submitting car:', error);
      }
    } else {
      alert('Por favor, rellene todos los campos.');
    }
  };

  const handleEdit = (index) => {
    setCurrentCarIndex(index);
    setNewCar(cars[index]);
    setIsEditing(true);
    handleOpen();
  };

  const handleDelete = async (index) => {
    const carId = cars[index].id;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}cars/delete_car/${carId}/`,
        {
          headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
          },
          withCredentials: true
        }
      );
      const updatedCars = cars.filter((_, i) => i !== index);
      setCars(updatedCars);
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, pt: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Tus Autos
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Crear Nuevo Auto
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Marca</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Año</TableCell>
              <TableCell>Placa</TableCell>
              <TableCell>Capacidad</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((car, index) => (
              <TableRow key={index}>
                <TableCell>{car.brand}</TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>{car.license_plate}</TableCell>
                <TableCell>{car.capacity}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(index)} data-testid={`edit-car-${index}`}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(index)} data-testid={`delete-car-${index}`}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? 'Editar Auto' : 'Crear Nuevo Auto'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="brand"
            label="Marca"
            type="text"
            fullWidth
            variant="outlined"
            value={newCar.brand}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="model"
            label="Modelo"
            type="text"
            fullWidth
            variant="outlined"
            value={newCar.model}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="year"
            label="Año"
            type="number"
            fullWidth
            variant="outlined"
            value={newCar.year}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="license_plate"
            label="Placa"
            type="text"
            fullWidth
            variant="outlined"
            value={newCar.license_plate}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="capacity"
            label="Capacidad"
            type="number"
            fullWidth
            variant="outlined"
            InputProps={{ inputProps: { min: 0 } }}
            value={newCar.capacity}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {isEditing ? 'Guardar Cambios' : 'Crear Auto'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Cars;
