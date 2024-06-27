import React from 'react';
import { render } from '@testing-library/react';
import MapComponent, { loader } from '../MapComponent'; // Asegúrate de ajustar la ruta a tu componente

// Mockear el loader de Google Maps
jest.mock('@googlemaps/js-api-loader', () => ({
    __esModule: true,
    Loader: jest.fn().mockImplementation(() => ({
      load: jest.fn(),
    })),
  }));
describe('MapComponent', () => {
  it('renders map component correctly', async () => {
    // Simular datos de prueba para encodedPolyline
    //resolve load
    loader.load.mockResolvedValue();
    const encodedPolyline = 'enc:[{aovLkuybMv@]';

    // Renderizar el componente
    const { container } = render(<MapComponent encodedPolyline={encodedPolyline} />);

    // Verificar que el mapa se haya renderizado

    // Simular la carga del mapa (esto debería suceder automáticamente debido al mock)
    await loader.load();

  });


});
