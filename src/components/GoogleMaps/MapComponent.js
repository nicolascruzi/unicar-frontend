// import React, { useEffect, useRef } from 'react';
// import { Loader } from '@googlemaps/js-api-loader';

// // Initialize the Loader once
// const loader = new Loader({
//   apiKey: process.env.REACT_APP_GOOGLE_CLOUD_API_KEY,
//   version: 'weekly',
//   libraries: ['geometry'],
// });

// const MapComponent = ({ encodedPolyline }) => {
//   const googleMapRef = useRef(null);

//   useEffect(() => {
//     loader.load().then(() => {
//       if (!googleMapRef.current) return;

//       const googleMap = new window.google.maps.Map(googleMapRef.current, {
//         center: center,
//         zoom: zoom,
//       });

//       // Check if the geometry library is loaded
//       if (!window.google.maps.geometry || !window.google.maps.geometry.encoding) {
//         console.error('Geometry library not loaded.');
//         return;
//       }

//       // Decode the polyline using Google Maps API's geometry library
//       const decodedPath = window.google.maps.geometry.encoding.decodePath(encodedPolyline);
//       console.log("DECODED PATH", decodedPath);

//       // Create a polyline to display the route
//       const routePath = new window.google.maps.Polyline({
//         path: decodedPath,
//         geodesic: true,
//         strokeColor: '#FF0000',
//         strokeOpacity: 1.0,
//         strokeWeight: 2,
//       });

//       // Set the map to display the polyline
//       routePath.setMap(googleMap);
//     }).catch(error => {
//       console.error('Error loading Google Maps', error);
//     });
//   }, [center, zoom, encodedPolyline]);

//   return <div ref={googleMapRef} style={{ width: '100%', height: '400px' }} />;
// };

// export default MapComponent;

import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

// Initialize the Loader once
export const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_CLOUD_API_KEY,
  version: 'weekly',
  libraries: ['geometry', 'places'],
});

const MapComponent = ({ encodedPolyline }) => {
  const googleMapRef = useRef(null);

  useEffect(() => {
    loader.load().then(() => {
      if (!googleMapRef.current) return;

      const googleMap = new window.google.maps.Map(googleMapRef.current, {
        mapTypeId: 'roadmap',
      });

      // Check if the geometry library is loaded
      if (!window.google.maps.geometry || !window.google.maps.geometry.encoding) {
        console.error('Geometry library not loaded.');
        return;
      }

      // Decode the polyline using Google Maps API's geometry library
      const decodedPath = window.google.maps.geometry.encoding.decodePath(encodedPolyline);

      // Create a polyline to display the route
      const routePath = new window.google.maps.Polyline({
        path: decodedPath,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });

      // Set the map to display the polyline
      routePath.setMap(googleMap);

      // Compute the bounds of the polyline
      const bounds = new window.google.maps.LatLngBounds();
      decodedPath.forEach((latLng) => {
        bounds.extend(latLng);
      });

      // Center the map and zoom to fit the polyline
      googleMap.fitBounds(bounds);
    }).catch(error => {
      console.error('Error loading Google Maps', error);
    });
  }, [encodedPolyline]);

  return <div ref={googleMapRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;


