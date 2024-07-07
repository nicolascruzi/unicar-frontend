import React, { useEffect, useRef } from 'react';
import { loader } from './MapComponent'; // Importar el loader que ya tienes configurado
import { Box } from '@mui/material'; // Importa Box desde MUI para aplicar estilos fácilmente

const Autocomplete = ({ onPlaceSelected, placeholder, name, value, onChange, sx }) => {
    const inputRef = useRef(null);

  useEffect(() => {
    loader.load().then(() => {
      if (!window.google) {
        console.error('Google Maps API not loaded.');
        return;
      }
      if (!window.google.maps.places) {
        console.error('Google Maps Places API not available.');
        return;
      }

      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        onPlaceSelected(place);
      });
    }).catch(error => {
      console.error('Error loading Google Maps', error);
    });
  }, [onPlaceSelected]);

  return (
    <Box sx={{ position: 'relative', zIndex: 1300, ...sx }}>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        style={{ width: '100%', padding: '10px', marginTop: '10px', boxSizing: 'border-box' }}
      />
    </Box>
  );
};

export default Autocomplete;