import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import SignUpForm from '../SignUpForm';
import { BrowserRouter as Router } from 'react-router-dom'; 
import { checkPassword, checkFields, checkEmail } from '../../../utils/signUpUtils';
import axios from 'axios';

jest.mock('axios');
describe('SignUpForm Component', () => {
  // Mock functions for setOpenErrorAlert and setMessageAlert
  const setOpenErrorAlertMock = jest.fn();
  const setMessageAlertMock = jest.fn();
  

  // Mock Axios para simular llamadas a la API
//   jest.mock('axios', () => ({
//     post: jest.fn((process.env.REACT_APP_API_URL + 'register/',
//         {
//         "name": 'John Doe',
//         "email": 'johndoe@example.com',
//         "password": 'password123',
//         "university": 'Universidad de Chile',
//         "gender": 'Hombre'}), Promise.resolve({ data: { message: 'Usuario creado exitosamente' } })),
//   }));
    
   // Mock respuesta de la API

  // Prueba para checkPassword
  test('checkPassword function', () => {
    expect(checkPassword('password123', 'password123', setMessageAlertMock, setOpenErrorAlertMock)).toBe(true);
    expect(checkPassword('password123', 'password456', setMessageAlertMock, setOpenErrorAlertMock)).toBe(false);
    expect(setMessageAlertMock).toHaveBeenCalledTimes(1);
    expect(setOpenErrorAlertMock).toHaveBeenCalledTimes(1);
  });

  // Prueba para checkFields
  test('checkFields function', () => {
    expect(
      checkFields('John Doe', 'johndoe@example.com', 'password123', 'password123', 'PUC', 'Hombre', setMessageAlertMock, setOpenErrorAlertMock)
    ).toBe(true);
    expect(checkFields('', 'johndoe@example.com', 'password123', 'password123', 'PUC', 'Hombre', setMessageAlertMock, setOpenErrorAlertMock)).toBe(false);
    expect(setMessageAlertMock).toHaveBeenCalledTimes(1);
    expect(setOpenErrorAlertMock).toHaveBeenCalledTimes(1);
  });

  // Prueba para checkEmail
  test('checkEmail function', () => {
    expect(checkEmail('johndoe@example.com', setMessageAlertMock, setOpenErrorAlertMock)).toBe(true);
    expect(checkEmail('johndoe', setMessageAlertMock, setOpenErrorAlertMock)).toBe(false);
    expect(setMessageAlertMock).toHaveBeenCalledTimes(1);
    expect(setOpenErrorAlertMock).toHaveBeenCalledTimes(1);
  });

  // Prueba para SignUpForm
  test('SignUpForm component', async () => {

    axios.post.mockResolvedValue({ data: { message: 'Usuario creado exitosamente' } });
    render(
        <Router> {/* Envuelve SignUpForm con Router */}
          <SignUpForm />
        </Router>
      );

    // Simulación de entrada de datos
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'johndoe@example.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Verificar Contraseña'), { target: { value: 'password123' } });
    // Abrir el menú desplegable de "Universidad"
    fireEvent.mouseDown(screen.getByLabelText('Universidad'));

    // Seleccionar una opción del menú desplegable de "Universidad"
    fireEvent.click(screen.getByText('Universidad de Chile'));

    // Simulación de cambio en el campo "Género"
    fireEvent.mouseDown(screen.getByLabelText('Género'));

    fireEvent.click(screen.getByText('Hombre'));


    // Simulación de clic en el botón de registrarse
    fireEvent.click(screen.getByText('Registrarse'));
    

    // Esperar a que la promesa se resuelva
    await waitFor(() => {
        expect(axios.post).toHaveBeenCalledTimes(1);
    });

    // Verificar el comportamiento dentro del then
    expect(screen.getByText('Usuario creado exitosamente')).toBeInTheDocument();



    // Espera a que la llamada a la API se resuelva
    await waitFor(() => {    
      // Verifica que axios.post haya sido llamado correctamente
      expect(setOpenErrorAlertMock).toHaveBeenCalledTimes(0); // Verifica llamadas a setOpenErrorAlert
    });

    await waitFor(() => {
      expect(setMessageAlertMock).toHaveBeenCalledTimes(0); // Verifica llamadas a setMessageAlert
    });
  });


  it('handles sign up failure', async () => {
    axios.post.mockRejectedValue({ response: { data: { message: 'Error al crear usuario' } } });
    render(
      <Router>
        <SignUpForm />
      </Router>
    );

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@uc.cl' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Verificar Contraseña'), { target: { value: 'password123' } });
    fireEvent.mouseDown(screen.getByLabelText('Universidad'));
    fireEvent.click(screen.getByText('Universidad de Chile'));
    fireEvent.mouseDown(screen.getByLabelText('Género'));
    fireEvent.click(screen.getByText('Hombre'));

    fireEvent.click(screen.getByText('Registrarse'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    });

});
