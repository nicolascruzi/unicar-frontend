import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Reviews from '../Reviews'; // Asegúrate de importar correctamente el componente

describe('Reviews Component', () => {
  test('renders component properly', async () => {
    render(<Reviews />);

    // Esperar a que se renderice correctamente el componente
    await waitFor(() => {
      screen.getByText('Mis Reseñas');
      screen.getByText('Reseñas Enviadas (3)');
    });

    // Verificar que se muestren las reseñas enviadas
    screen.getAllByText(/Usuario\d/); // Verificar nombres de usuario
  });

  test('switches between sent and received reviews', async () => {
    render(<Reviews />);

    // Esperar a que se renderice correctamente el componente
    await waitFor(() => {
      screen.getByText('Mis Reseñas');
      screen.getByText('Reseñas Enviadas (3)');
    });

    // Cambiar a la pestaña de reseñas recibidas
    fireEvent.click(screen.getByRole('tab', { name: /reseñas recibidas/i }));

    // Esperar a que se muestren las reseñas recibidas
    await waitFor(() => {
      screen.getByText('Reseñas Recibidas (3)');
    });

  });

 
});
