// Importar las funciones de Jest que necesitaremos
import { waitFor } from '@testing-library/react';
import reportWebVitals from './reportWebVitals';
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Mockear import('web-vitals')
jest.mock('web-vitals', () => ({
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn(),
}));

// Limpiar los mocks antes de cada prueba
beforeEach(() => {
  getCLS.mockClear();
  getFID.mockClear();
  getFCP.mockClear();
  getLCP.mockClear();
  getTTFB.mockClear();
});


test('does not call web-vitals functions when onPerfEntry is not provided', () => {
// Llamar a reportWebVitals sin una función onPerfEntry
reportWebVitals();

// Verificar que las funciones de web-vitals no fueron llamadas
expect(getCLS).not.toHaveBeenCalled();
expect(getFID).not.toHaveBeenCalled();
expect(getFCP).not.toHaveBeenCalled();
expect(getLCP).not.toHaveBeenCalled();
expect(getTTFB).not.toHaveBeenCalled();
});
