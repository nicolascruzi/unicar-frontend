import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const MapComponent = ({ center, zoom }) => {
  //solo para testear sin backend
  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 20;


  const googleMapRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_CLOUD_API_KEY,
      version: 'weekly',
    });

    loader.load().then(() => {
      const googleMap = new window.google.maps.Map(googleMapRef.current, {
        center: center,
        zoom: zoom,
      });

      // Create a marker and set its position.
      new window.google.maps.Marker({
        map: googleMap,
        position: center,
      });
    });
  }, [center, zoom]);

  return <div ref={googleMapRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;

