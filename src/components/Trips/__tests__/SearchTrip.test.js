// src/SearchTrips.test.js

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import SearchTrips from '../SearchTrips';

describe('SearchTrips Component', () => {
  test('renders SearchTrips component', () => {
    const { getByText } = render(<SearchTrips />);
    
    // Verificar que el título "Búsqueda de Viajes" esté presente
    const titleElement = getByText('Búsqueda de Viajes');
    expect(titleElement).toBeInTheDocument();

    // Verificar que el texto "Contenido de la página de búsqueda de viajes." esté presente
    const contentElement = getByText('Contenido de la página de búsqueda de viajes.');
    expect(contentElement).toBeInTheDocument();
  });
});
