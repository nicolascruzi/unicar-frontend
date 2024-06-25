import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Reviews from '../Reviews'; // Asegúrate de importar correctamente el componente

describe('Reviews Component', () => {
  test('renders component properly', async () => {
    const { getByText, getAllByText } = render(<Reviews />);

    // Esperar a que se renderice correctamente el componente
    await waitFor(() => {
      getByText('Mis Reseñas');
      getByText('Reseñas Enviadas (3)');
    });

    // Verificar que se muestren las reseñas enviadas
    getAllByText(/Usuario\d/); // Verificar nombres de usuario
  });

  test('switches between sent and received reviews', async () => {
    const { getByText, getByRole } = render(<Reviews />);

    // Esperar a que se renderice correctamente el componente
    await waitFor(() => {
      getByText('Mis Reseñas');
      getByText('Reseñas Enviadas (3)');
    });

    // Cambiar a la pestaña de reseñas recibidas
    fireEvent.click(getByRole('tab', { name: /reseñas recibidas/i }));

    // Esperar a que se muestren las reseñas recibidas
    await waitFor(() => {
      getByText('Reseñas Recibidas (3)');
    });

    // Podrías verificar que se muestren las reseñas recibidas correctamente
  });

 
  // Podrías continuar con más pruebas para verificar la interacción de los botones, etc.
});
