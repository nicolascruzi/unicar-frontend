import Cookies from 'js-cookie';
import axios from 'axios';
import React from 'react';

const formatDateTime = (dateTime) => {
    return new Date(dateTime).toISOString();
  };

export const submitForm = async (formValues, typeTrip, university, setError, handleClose, handleSubmit) => {
    if (!formValues.car) {
      setError('Debe seleccionar un auto para crear el viaje.');
      return;
    }

    let allFieldsFilled;
    if (typeTrip === 'ida') {
      // only required fields for ida
      allFieldsFilled = formValues.car && formValues.start_location && university && formValues.end_date && formValues.capacity && formValues.price;
    } else if (typeTrip === 'vuelta') {
      // only required fields for vuelta
      allFieldsFilled = formValues.car && formValues.end_location && university && formValues.start_date && formValues.capacity && formValues.price;
    } else {
      allFieldsFilled = false;
    }

    if (allFieldsFilled) {
      try {
        let start_location_final;
        let end_location_final;
        let start_date_final;
        let end_date_final;
        if (typeTrip === 'vuelta') {
          start_location_final = university;
          end_location_final = formValues.end_location; // Set the end location to the university if the trip is vuelta
          start_date_final = formValues.start_date;
          end_date_final = null;
        } else {
          start_location_final = formValues.start_location; // Set the start location to the university if the trip is ida
          end_location_final = university;
          start_date_final = null;
          end_date_final = formValues.end_date;
        }

        const tripData = {
          driver: 1, // Cambiar cuando haya manejo de usuarios
          car: formValues.car,
          start_location: start_location_final,
          end_location: end_location_final,
          start_date: start_date_final ? formatDateTime(formValues.start_date) : null,
          end_date: end_date_final ? formatDateTime(formValues.end_date) : null,
          capacity: formValues.capacity,
          price: formValues.price,
          in_progress: false,
          passengers: formValues.passengers, // Add the passengers field
          type_trip: typeTrip
        };

        const response = await axios.post(`${process.env.REACT_APP_API_URL}trips/create/`, tripData,
          {
            headers: {
              'X-CSRFToken': Cookies.get('csrftoken')
            },
            withCredentials: true
          }
        );
        console.log('Success:', response.data);
        handleClose();
        handleSubmit(formValues); // Update parent state if needed
      } catch (error) {
        console.error('Error submitting trip:', error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data.detail || 'Error al publicar el viaje. Intente nuevamente más tarde.' : 'Error al conectar con el servidor.');
      }
    } else {
      alert('Por favor, rellene todos los campos.');
    }
  };