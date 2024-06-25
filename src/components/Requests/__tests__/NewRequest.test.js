import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewRequest from '../NewRequest';  // Ajusta la ruta según sea necesario
import axios from 'axios';
import Cookies from 'js-cookie';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');
jest.mock('js-cookie');

describe('NewRequest Component', () => {
  const trip_id = 123;
  const mockHandleClose = jest.fn();
  const mockHandleSubmit = jest.fn();

  beforeAll(() => {
    window.alert = jest.fn(); // Mockear window.alert antes de todas las pruebas
  });

  beforeEach(() => {
    render(
        <MemoryRouter>
         <NewRequest trip_id={trip_id} open={true} handleClose={mockHandleClose} handleSubmit={mockHandleSubmit} />;
        </MemoryRouter>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the dialog with form elements correctly', () => {
    expect(screen.getByRole('heading', { name: /Solicitar Viaje/i })).toBeInTheDocument();
    expect(screen.getByText(/Complete los siguientes campos solicitados para publicar su solicitud./i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Dirección \(incluir comuna\)/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Solicitar Viaje/i })).toBeInTheDocument();
  });

  test('updates input fields correctly', () => {
    const streetInput = screen.getByLabelText(/Dirección \(incluir comuna\)/i);
    fireEvent.change(streetInput, { target: { value: 'Av. Siempre Viva 742' } });
    expect(streetInput.value).toBe('Av. Siempre Viva 742');
  });

  test('calls handleClose when the cancel button is clicked', () => {
    const cancelButton = screen.getByText(/Cancelar/i);
    fireEvent.click(cancelButton);
    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  test('shows error message when form is submitted with empty fields', async () => {
    const submitButton = screen.getByRole('button', { name: /Solicitar Viaje/i });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Por favor, rellene todos los campos.');
    });
  });

  test('submits form successfully and calls handleSubmit', async () => {
    axios.post.mockResolvedValue({ data: {} });
    Cookies.get.mockReturnValue('fake-csrf-token');

    const streetInput = screen.getByLabelText(/Dirección \(incluir comuna\)/i);
    fireEvent.change(streetInput, { target: { value: 'Av. Siempre Viva 742' } });

    const submitButton = screen.getByRole('button', { name: /Solicitar Viaje/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}asks/create_ask/`,
        { street: 'Av. Siempre Viva 742', trip: trip_id },
        {
          headers: { 'X-CSRFToken': 'fake-csrf-token' },
          withCredentials: true,
        }
      );
      expect(mockHandleClose).toHaveBeenCalledTimes(1);
      expect(mockHandleSubmit).toHaveBeenCalledWith({ street: 'Av. Siempre Viva 742', trip: trip_id });
    });
  });

  test('handles form submission error with response detail', async () => {
    axios.post.mockRejectedValue({
      response: { data: { detail: 'Error al enviar la solicitud.' } }
    });

    const streetInput = screen.getByLabelText(/Dirección \(incluir comuna\)/i);
    fireEvent.change(streetInput, { target: { value: 'Av. Siempre Viva 742' } });

    const submitButton = screen.getByRole('button', { name: /Solicitar Viaje/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Error al enviar la solicitud./i)).toBeInTheDocument();
    });
  });

  test('handles form submission error with generic response', async () => {
    axios.post.mockRejectedValue({
      response: { data: {} }
    });

    const streetInput = screen.getByLabelText(/Dirección \(incluir comuna\)/i);
    fireEvent.change(streetInput, { target: { value: 'Av. Siempre Viva 742' } });

    const submitButton = screen.getByRole('button', { name: /Solicitar Viaje/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Error al enviar la solicitud. Intente nuevamente más tarde./i)).toBeInTheDocument();
    });
  });

  test('handles form submission error without response', async () => {
    axios.post.mockRejectedValue(new Error('Network Error'));

    const streetInput = screen.getByLabelText(/Dirección \(incluir comuna\)/i);
    fireEvent.change(streetInput, { target: { value: 'Av. Siempre Viva 742' } });

    const submitButton = screen.getByRole('button', { name: /Solicitar Viaje/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Error al conectar con el servidor./i)).toBeInTheDocument();
    });
  });
});
