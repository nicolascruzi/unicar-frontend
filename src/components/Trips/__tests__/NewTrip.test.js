import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import NewTrip from '../NewTrip';
import { MemoryRouter } from 'react-router-dom';
import { submitForm } from '../../../utils/submitCarsForm';

// Mock de axios para simular llamadas a la API
const mockAxios = new MockAdapter(axios);

describe('NewTrip Component', () => {
  beforeEach(() => {
    // Limpiar mocks y estado antes de cada prueba
    jest.restoreAllMocks();
  });

  test('renders NewTrip component', () => {
    const { getByText } = render(
        <MemoryRouter>
            <NewTrip open={true} handleClose={() => {}} handleSubmit={() => {}} />
        </MemoryRouter>
    );
    const titleElement = getByText('Publicar Viaje');
    expect(titleElement).toBeInTheDocument();
  });


  it('handles changes in form fields correctly', async () => {
    // mock cars
    const mockCars = [{ id: 1, brand: 'Toyota', model: 'Corolla' }];
    jest.spyOn(axios, 'get').mockResolvedValue({ data: mockCars });


    render(
        <MemoryRouter>
            <NewTrip open={true} handleClose={() => {}} handleSubmit={() => {}} />
        </MemoryRouter>
    );

    

    const ubicacionPartidaInput = await screen.findByLabelText(/Ubicación de partida \(incluir comuna\)/i);

    // Simula cambios en el campo
    fireEvent.change(ubicacionPartidaInput, { target: { value: 'Santiago' } });
    
    // Verificar que el estado se actualizó correctamente
    expect(screen.getByLabelText('Ubicación de partida (incluir comuna)')).toHaveValue('Santiago');
  });

  // test submit form
    it('handles form submit correctly', async () => {
        const mockCars = [{ id: 1, brand: 'Toyota', model: 'Corolla' }];
        jest.spyOn(axios, 'get').mockResolvedValue({ data: mockCars });
    
        const handleSubmit = jest.fn();
        render(
            <MemoryRouter>
                <NewTrip open={true} handleClose={() => {}} handleSubmit={handleSubmit} />
            </MemoryRouter>
        );
    
        const submitButton = await screen.findByText('Publicar viaje');
        fireEvent.click(submitButton);
    
    });



    it('handles form submit correctly on success', async () => {
        // Configurar mock de axios para respuesta exitosa
        mockAxios.onPost(`${process.env.REACT_APP_API_URL}trips/create/`).reply(200, { message: 'Trip created successfully' });
    
        // Mock de funciones handle
        const handleSubmit = jest.fn();
        const handleClose = jest.fn();
    
        // Datos simulados del formulario
        const formValues = {
          car: 1,
          start_location: 'Santiago',
          end_location: 'Valparaíso',
          start_date: '2024-06-30T08:00:00',
          end_date: '2024-06-30T10:00:00',
          capacity: 4,
          price: 5000,
          passengers: []
        };
    
        // Llamar a submitForm
        await submitForm(formValues, 'ida', 'PUC', jest.fn(), handleClose, handleSubmit);
    
        // Verificar que handleSubmit y handleClose se llamaron una vez
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleClose).toHaveBeenCalledTimes(1);
      });
    
      it('handles form submit error correctly', async () => {
        // Configurar mock de axios para respuesta de error
        mockAxios.onPost(`${process.env.REACT_APP_API_URL}trips/create/`).reply(500, { message: 'Internal Server Error' });
    
        // Mock de funciones handle
        const handleSubmit = jest.fn();
        const handleClose = jest.fn();
    
        // Datos simulados del formulario
        const formValues = {
          car: 1,
          start_location: 'Santiago',
          end_location: 'Valparaíso',
          start_date: '2024-06-30T08:00:00',
          end_date: '2024-06-30T10:00:00',
          capacity: 4,
          price: 5000,
          passengers: []
        };
    
        // Llamar a submitForm
        await submitForm(formValues, 'ida', 'PUC', jest.fn(), handleClose, handleSubmit);
    
        // Verificar que handleSubmit no se llamó y handleClose tampoco se llamó (debido al error)
        expect(handleSubmit).toHaveBeenCalledTimes(0);
        expect(handleClose).toHaveBeenCalledTimes(0);
      });

      // test vuelta
        it('handles form submit correctly on success', async () => {
            // Configurar mock de axios para respuesta exitosa
            mockAxios.onPost(`${process.env.REACT_APP_API_URL}trips/create/`).reply(200, { message: 'Trip created successfully' });
        
            // Mock de funciones handle
            const handleSubmit = jest.fn();
            const handleClose = jest.fn();
        
            // Datos simulados del formulario
            const formValues = {
            car: 1,
            start_location: 'Santiago',
            end_location: 'Valparaíso',
            start_date: '2024-06-30T08:00:00',
            end_date: '2024-06-30T10:00:00',
            capacity: 4,
            price: 5000,
            passengers: []
            };
        
            // Llamar a submitForm
            await submitForm(formValues, 'vuelta', 'PUC', jest.fn(), handleClose, handleSubmit);
        
            // Verificar que handleSubmit y handleClose se llamaron una vez
            expect(handleSubmit).toHaveBeenCalledTimes(1);
            expect(handleClose).toHaveBeenCalledTimes(1);
        });
        

   
    

  });
