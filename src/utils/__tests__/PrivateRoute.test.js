import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import PrivateRoute from '../PrivateRoute';

// Mock de Cookies para simular la existencia de 'sessionid'
jest.mock('js-cookie', () => ({
  get: jest.fn(),
}));

describe('PrivateRoute component', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpiar mocks después de cada prueba
  });

  it('renders Outlet when user is authenticated', () => {
    Cookies.get.mockReturnValueOnce('sessionid'); // Simular que el usuario está autenticado

    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route path="/private" element={<PrivateRoute />} />
          <Route path="/" element={<div data-testid="public-page">Public Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const outletElement = screen.getByText('Public Page'); // Verificar que se renderiza la página pública
    expect(outletElement).toBeInTheDocument();
  });

  it('redirects to "/" when user is not authenticated', () => {
    Cookies.get.mockReturnValueOnce(undefined); // Simular que el usuario no está autenticado

    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route path="/private" element={<PrivateRoute />} />
          <Route path="/" element={<div data-testid="public-page">Public Page</div>} />
        </Routes>
      </MemoryRouter>

    );

    const publicPageElement = screen.queryByTestId('public-page'); // Debe redirigir a la página pública cuando el usuario no está autenticado
    expect(publicPageElement).toBeInTheDocument();
  });
});
