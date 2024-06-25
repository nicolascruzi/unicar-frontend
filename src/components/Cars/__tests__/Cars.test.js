import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom'; // Para tener acceso a expect(...).toBeInTheDocument()
import axios from 'axios';
import Cars from '../Cars';

// Mockear axios para simular llamadas a la API
jest.mock('axios');

// Datos de prueba para simular la respuesta de la API
const mockCars = [
  { id: 1, brand: 'Toyota', model: 'Corolla', year: 2020, license_plate: 'XYZ-123', capacity: 5 },
  { id: 2, brand: 'Honda', model: 'Civic', year: 2021, license_plate: 'ABC-456', capacity: 4 },
];

describe('Cars component', () => {
  beforeEach(async () => {
    await axios.get.mockResolvedValue({ data: mockCars }); // Mockear la respuesta de axios.get
    
  });

  it('should render "Crear Nuevo Auto" button', async () => {
    render(<Cars />);
    const button = screen.getByRole('button', { name: /crear nuevo auto/i });
    expect(button).toBeInTheDocument();
  });

  it('should render car data after fetching', async () => {
    render(<Cars />);
    const brandCell = await screen.findByText('Toyota');
    expect(brandCell).toBeInTheDocument();
    const modelCell = screen.getByText('Corolla');
    expect(modelCell).toBeInTheDocument();
    const yearCell = screen.getByText('2020');
    expect(yearCell).toBeInTheDocument();
    const plateCell = screen.getByText('XYZ-123');
    expect(plateCell).toBeInTheDocument();
    const capacityCell = screen.getByText('5');
    expect(capacityCell).toBeInTheDocument();
  });

  it('should open dialog when "Crear Nuevo Auto" button is clicked', async () => {
    render(<Cars />);
    const button = screen.getByRole('button', { name: /crear nuevo auto/i });
    fireEvent.click(button);

    // Esperar a que aparezca el diálogo
    await waitFor(() => {
      const dialog = screen.getByRole('dialog');
      const dialogTitle = within(dialog).getByText('Crear Nuevo Auto');
      expect(dialogTitle).toBeInTheDocument();
    });
  });

  it('should close dialog when "Cancelar" button is clicked', async () => {
    render(<Cars />);
    const button = screen.getByRole('button', { name: /crear nuevo auto/i });
    fireEvent.click(button);

    // Esperar a que aparezca el diálogo
    await waitFor(() => {
      const dialog = screen.getByRole('dialog');
      const dialogTitle = within(dialog).getByText('Crear Nuevo Auto');
      expect(dialogTitle).toBeInTheDocument();
    });

    const cancelButton = screen.getByRole('button', { name: /cancelar/i });
    fireEvent.click(cancelButton);

    // Esperar a que el diálogo se cierre
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('should create a new car', async () => {
    render(<Cars />);
    const newCar = { id: 3, brand: 'Ford', model: 'Focus', year: 2022, license_plate: 'DEF-789', capacity: 5 };
    axios.post.mockResolvedValueOnce({ data: newCar });

    const button = screen.getByRole('button', { name: /crear nuevo auto/i });
    fireEvent.click(button);

    // Llenar el formulario
    fireEvent.change(screen.getByLabelText(/marca/i), { target: { value: 'Ford' } });
    fireEvent.change(screen.getByLabelText(/modelo/i), { target: { value: 'Focus' } });
    fireEvent.change(screen.getByLabelText(/año/i), { target: { value: '2022' } });
    fireEvent.change(screen.getByLabelText(/placa/i), { target: { value: 'DEF-789' } });
    fireEvent.change(screen.getByLabelText(/capacidad/i), { target: { value: '5' } });

    const submitButton = screen.getByRole('button', { name: /crear auto/i });
    fireEvent.click(submitButton);

    // Esperar a que el coche se agregue a la tabla
    await waitFor(() => {
      const newBrandCell = screen.getByText('Ford');
      expect(newBrandCell).toBeInTheDocument();
    });
  });

  // test edit a car
  it('should edit a car', async () => {
    axios.put.mockResolvedValueOnce({
      data: { id: 1, brand: 'Chevrolet', model: 'Corolla', year: 2020, license_plate: 'XYZ-123', capacity: 5 }});
    render(<Cars />);
    await waitFor(() => {
      return screen.getByTestId(`edit-car-1`); // Busca el botón de edición por un data-testid único
    })
    const editButton = screen.getByTestId(`edit-car-1`);
    fireEvent.click(editButton); // Simula hacer clic en el botón de edición


    await waitFor(() => {
      // Llena el formulario de edición
      return screen.getByLabelText(/marca/i);
    })
    const brandInput = screen.getByLabelText(/marca/i);
    fireEvent.change(brandInput, { target: { value: 'Chevrolet' } });
    
    await waitFor(() => {
      // Envía el formulario de edición
      return screen.getByRole('button', { name: /guardar cambios/i }); // Asegúrate de buscar el botón de "Guardar Cambios" correctamente
    })
    const submitButton = screen.getByRole('button', { name: /guardar cambios/i });
    fireEvent.click(submitButton);


    // Espera a que se actualice la tabla con la información editada
     await waitFor(() => {
        const editedBrandCell = screen.getByText('Chevrolet'); // Verifica que la celda con la marca editada esté presente
        expect(editedBrandCell).toBeInTheDocument();
      });
    });

  //test delete car
  it('should delete a car', async () => {
    axios.delete.mockResolvedValueOnce({ data: { id: 0 } });
    render(<Cars />);
    await waitFor(() => {
      return screen.getByTestId(`delete-car-0`); // Busca el botón de eliminación por un data-testid único
    });
    const deleteButton = screen.getByTestId(`delete-car-0`);
    fireEvent.click(deleteButton); // Simula hacer clic en el botón de eliminación

    // Espera a que aparezca el diálogo de confirmación
    await waitFor(() => {
      return screen.getByTestId('delete-car-0');
    });
    const confirmButton = screen.getByTestId('delete-car-0');
    fireEvent.click(confirmButton); // Simula hacer clic en el botón de confirmación
    
        // Espera a que se actualice la tabla sin el coche eliminado
    await waitFor(() => {
      const deletedBrandCell = screen.queryByText('Toyota'); // Verifica que la celda con la marca eliminada no esté presente
      expect(deletedBrandCell).not.toBeInTheDocument();
    });
  });
  
});
