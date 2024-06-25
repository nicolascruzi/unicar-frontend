import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import ProfilePage from '../Profile';


jest.mock('axios');

describe('ProfilePage component', () => {
  let originalConsoleError;
  beforeEach(() => {
    originalConsoleError = console.error;
    console.error = jest.fn();

    axios.get.mockResolvedValueOnce({
      data: {
        name: 'John Doe',
        email: 'john@uc.cl',
        university: 'PUC',
        gender: 'Hombre',
      },

    });

    axios.patch.mockResolvedValueOnce({
      data: {
        message: 'Usuario actualizado correctamente',
      },
      status: 200, // Agregar el status para reflejar una respuesta exitosa
    });
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it('should fetch user data and render form fields', async () => {
    render(<ProfilePage />);

    // Esperar a que se carguen los datos del usuario
    const nameInput = await waitFor(() => {
      return screen.getByLabelText(/nombre/i)
    });
    expect(nameInput).toBeInTheDocument();

    const emailInput = await waitFor(() => {
      return screen.getByLabelText(/email/i)
    });
    // check if it is in the document
    expect(emailInput).toBeInTheDocument();
});

  it('should update user data when "Aplicar Cambios" button is clicked', async () => {
    render(<ProfilePage />);

    // Simular cambios en los campos del formulario
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@uc.cl' } });
    fireEvent.mouseDown(screen.getByLabelText(/universidad/i));
    fireEvent.click(screen.getByText('Universidad de Chile'));
    fireEvent.mouseDown(screen.getByLabelText(/género/i));
    fireEvent.click(screen.getByText('Mujer'));

    // Hacer clic en "Aplicar Cambios"
    fireEvent.click(screen.getByRole('button', { name: /aplicar cambios/i }));

    // Esperar a que se resuelva la promesa
    await waitFor(() => {
      expect(axios.patch).toHaveBeenCalledWith(process.env.REACT_APP_API_URL + 'update_user/', {
        name: 'Jane Doe',
        email: 'john@uc.cl',
        university: 'UCH', // Aquí debe coincidir con el valor seleccionado en el Select
        gender: 'Mujer',   // Aquí debe coincidir con el valor seleccionado en el Select
      }, {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken')
        },
        withCredentials: true
      });
    });
  });

  it('should handle form field changes', () => {
    render(<ProfilePage />);

    // Simular cambios en los campos
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane@uc.cl' } });

    // Verificar que los valores se actualicen en el estado
    expect(screen.getByLabelText(/email/i)).toHaveValue('jane@uc.cl');

  });

  it('should handle "Volver" button click', () => {
    // Simular un clic en "Volver"
    const historyBack = jest.spyOn(window.history, 'back').mockImplementation(() => {});

    render(<ProfilePage />);
    fireEvent.click(screen.getByRole('button', { name: /volver/i }));

    // Verificar que la función handleGoBack haya sido llamada
    expect(historyBack).toHaveBeenCalledTimes(1);

    // Restaurar la función original de history.back
    historyBack.mockRestore();
  });


  
});
