// TripsPage.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Importa BrowserRouter
import axios from 'axios';

import TripsPage from '../TripsPage';

jest.mock('axios');

jest.mock('../../GoogleMaps/MapComponent', () => () => <div data-testid="mock-map-component" />);

describe('TripsPage Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders TripsPage component with trips data', async () => {
    const mockTrips = [
      {
        id: 1,
        driver: { name: 'Driver 1' },
        car: { brand: 'Toyota', model: 'Corolla' },
        start_location: { name: 'Start Location' },
        end_location: { name: 'End Location' },
        start_date: '2024-06-25T10:00:00Z',
        end_date: '2024-06-25T12:00:00Z',
        capacity: 4,
        passengers: [],
        price: 20,
        polyline: 'encodedPolylineString',
      },
    ];

    const mockResponse = { data: mockTrips };
    jest.spyOn(axios, 'get').mockResolvedValue(mockResponse);


    render(
      <Router>
        <TripsPage />
      </Router>
    );


    await waitFor(() => {
        // Verificar que se carguen los viajes correctamente
        const tripsElements = screen.getAllByTestId(/trip-title-/i);
        expect(tripsElements).toHaveLength(1);
  
        // Verificar que los datos del viaje se rendericen correctamente
        const trip = mockTrips[0];
        expect(screen.getByText(`Viaje de ${trip.driver.name}`)).toBeInTheDocument();
        expect(screen.getByText(`${trip.car.brand} ${trip.car.model}`)).toBeInTheDocument();
        expect(screen.getByText(`Inicio:`)).toBeInTheDocument();
        expect(screen.getByText(`Destino:`)).toBeInTheDocument();
        expect(screen.getByText(`Capacidad Máxima:`)).toBeInTheDocument();
        expect(screen.getByText(`Precio:`)).toBeInTheDocument();

      });
  });

  test('handles opening and closing NewTrip dialog', async () => {
    const mockTrips = [];
  
    axios.get.mockResolvedValue({ data: mockTrips });
  
    render(
      <Router>
        <TripsPage />
      </Router>
    );
  
    // Verificar que el diálogo de NewTrip no esté abierto inicialmente
    expect(screen.queryByText('Publicar Viaje')).not.toBeInTheDocument();
  
    // Click en el botón flotante "add" para abrir el diálogo
    fireEvent.click(screen.getByLabelText('add'));
  
    // Verificar que el diálogo de NewTrip se haya abierto
    expect(screen.getByText('Publicar Viaje')).toBeInTheDocument();
  
    // Click en el botón "Cancelar" para cerrar el diálogo
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
  
    // Verificar que el diálogo de NewTrip se haya cerrado
    await waitFor(() => {
      expect(screen.queryByText('Publicar Viaje')).not.toBeInTheDocument();
    });
  });

  test('handles asking to join a trip', async () => {
    const mockTrips = [
      {
        id: 1,
        driver: { name: 'Driver 1' },
        car: { brand: 'Toyota', model: 'Corolla' },
        start_location: { name: 'Start Location' },
        end_location: { name: 'End Location' },
        start_date: '2024-06-25T10:00:00Z',
        end_date: '2024-06-25T12:00:00Z',
        capacity: 4,
        passengers: [],
        price: 20,
        polyline: 'encodedPolylineString',
      },
    ];
  
    axios.get.mockResolvedValue({ data: mockTrips });
  
    render(
      <Router>
        <TripsPage />
      </Router>
    );
  
    // Espera a que el botón "Solicitar unirme" esté presente en el DOM
    const joinButton = await screen.findByRole('button', { name: 'Solicitar unirme' });
  
    // Click en el botón "Solicitar unirme" para un viaje
    fireEvent.click(joinButton);
  
    });
});
