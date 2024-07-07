import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Para tener acceso a expect(...).toBeInTheDocument()
import TripsPage from '../MyTrips';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router } from 'react-router-dom';
import { calculateTimeToDeparture, getRandomColor } from '../../../utils/utilsMyTrips';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjs from 'dayjs';

// Mock de axios para simular las peticiones
const mock = new MockAdapter(axios);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

jest.mock('axios');

// Datos de prueba
const mockDriverTrips = [
  {
    id: 1,
    driver: { name: 'Juan', surname: 'Pérez' },
    car: { brand: 'Toyota', model: 'Corolla' },
    start_location: { name: 'Inicio' },
    end_location: { name: 'Destino' },
    start_date: '2024-06-25T10:00:00Z',
    end_date: '2024-06-25T12:00:00Z',
    capacity: 4,
    passengers: [{ name: 'Ana', surname: 'García' }],
    price: 200,
    polyline: 'encodedPolyline1'
  }
];

const mockPassengerTrips = [
  {
    id: 2,
    driver: { name: 'María', surname: 'López' },
    car: { brand: 'Honda', model: 'Civic' },
    start_location: { name: 'Inicio' },
    end_location: { name: 'Destino' },
    start_date: '2024-06-26T08:00:00Z',
    end_date: '2024-06-26T10:00:00Z',
    capacity: 3,
    passengers: [{ name: 'Pedro', surname: 'Martínez' }, { name: 'Luisa', surname: 'Sánchez' }],
    price: 150,
    polyline: 'encodedPolyline2'
  }
];

describe('TripsPage Component', () => {
    it('renders properly and fetches trips on load', async () => {
      render(
        <Router>
            <TripsPage />
        </Router>);
  
      // Esperamos a que se cargue el componente y se renderice correctamente
      const tripsHeader = await screen.findByText(/Mis Viajes/i);
      expect(tripsHeader).toBeInTheDocument();
  
      // Puedes continuar con otras pruebas aquí según sea necesario
    });
  

});

describe('calculateTimeToDeparture function', () => {
    it('returns null when no departure time is provided', () => {
      const result = calculateTimeToDeparture(null);
      expect(result).toBeNull();
    });
  
    it('returns null when the departure time is in the past or equal to current time', () => {
      const pastTime = dayjs().subtract(1, 'hour').toISOString();
      const resultPast = calculateTimeToDeparture(pastTime);
      expect(resultPast).toBeNull();
  
      const currentTime = dayjs().toISOString();
      const resultCurrent = calculateTimeToDeparture(currentTime);
      expect(resultCurrent).toBeNull();
    });
  
    it('returns the correct time duration string when departure time is in the future for hours', () => {
      const futureTime = dayjs().add(2, 'hours').toISOString();
      const result = calculateTimeToDeparture(futureTime);
      expect(result).toMatch(/^[1-9][0-9]* horas?$|^60 minutos$/);
    });

    // calculate with result in minutes
    it('returns the correct time duration string when departure time is in the future for minutes', () => {
        const futureTime = dayjs().add(30, 'minutes').toISOString();
        const result = calculateTimeToDeparture(futureTime);
        expect(result).toMatch(/^[1-9][0-9]* minutos$/);
      });
  });

  describe('getRandomColor function', () => {
    it('returns a valid color from the predefined list', () => {
      const validNames = ['name1', 'name2', 'name3']; // Ajusta según los nombres válidos que puedas usar
      validNames.forEach(name => {
        const result = getRandomColor(name);
        expect(result).toMatch(/^#[0-9A-F]{6}$/i); // Verifica que el color retornado sea un código hexadecimal válido
      });
    });
  });