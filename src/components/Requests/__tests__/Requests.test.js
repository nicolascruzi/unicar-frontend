import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios'; // asegúrate de tener instalado axios-mock-adapter
import Requests from '../Requests'; // ajusta la ruta según sea necesario
import { handleApproveRequest,
  handleCloseRequestDetails,
  handleTabChange,
  handleOpenRequestDetails,
  handleRejectRequest
 } from '../../../utils/utilsRequests';
import MockAdapter from 'axios-mock-adapter';

// Mockear la respuesta de axios para las solicitudes salientes
jest.mock('axios');

const mockAxios = new MockAdapter(axios);


jest.mock('../RequestDetailsDialog', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="request-details-dialog-mock">Mock Request Details Dialog</div>),
}));

const mockIncomingRequests = [
  {
    id: 1,
    nombre: 'Ana Pérez',
    ubicacionRecogida: 'Calle 123, Ciudad A',
    calificacion: 4.5,
    genero: 'Femenino',
    universidad: 'Universidad X',
    status: 'Pendiente', // Asegúrate de incluir 'status' para simular correctamente
  },
];
const mockOutgoingRequests = [
  {
    id: 1,
    destinatario: 'Carlos Rodríguez',
    auto: 'Toyota Corolla',
    lugarSalida: 'Avenida 321, Ciudad D',
    estado: 'Pendiente',
  },
  // Agrega más datos de prueba si es necesario
];



describe('Requests component', () => {


  beforeEach(() => {
    axios.get.mockReset();
  });

  test('renders tabs and incoming requests table', async () => {
    // Simular datos de prueba para axios.get

    // Simular respuesta de axios.get
    jest.spyOn(require('axios'), 'get').mockResolvedValueOnce({
      data: mockIncomingRequests,
    });

    // Renderizar componente
    render(<Requests />);

    // Esperar a que se carguen los datos
    await waitFor(() => {
      expect(screen.getByText('Solicitudes')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('resolver-button-1')).toBeInTheDocument();
    });

    // Verificar la tabla de solicitudes entrantes
    expect(screen.getByText('Ana Pérez')).toBeInTheDocument();
    expect(screen.getByText('Calle 123, Ciudad A')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('Femenino')).toBeInTheDocument();
    expect(screen.getByText('Universidad X')).toBeInTheDocument();
  });

  test('switches tabs and renders outgoing requests table', async () => {
    // Mockear la respuesta de la primera llamada GET (solicitudes entrantes)
    axios.get.mockResolvedValueOnce({ data: mockIncomingRequests });

    // Mockear la respuesta de la segunda llamada GET (solicitudes salientes)
    axios.get.mockResolvedValueOnce({ data: mockOutgoingRequests });

    // Renderizar el componente
    render(<Requests />);

    // Cambiar a la pestaña de solicitudes salientes
    fireEvent.click(screen.getByText('Solicitudes Salientes'));

    // Esperar a que se carguen los datos de las solicitudes salientes
    await waitFor(() => {
      // Verificar la presencia de los elementos esperados en la tabla de salientes
      expect(screen.queryByText('Carlos Rodríguez')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText('Toyota Corolla')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText('Avenida 321, Ciudad D')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText('Pendiente')).toBeInTheDocument();
    });

    // Opcional: verificar que las llamadas a axios se realizaron con las URL correctas
    expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}asks/get_asks/`, {
      withCredentials: true,
    });
    expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}asks/get_asks_outgoing/`, {
      withCredentials: true,
    });
  });

});


describe('Request actions', () => {
  test('handleTabChange sets tab value correctly', () => {
    const setTabValue = jest.fn(); // Mock función para setTabValue
    const newValue = 1;
  
    handleTabChange(null, newValue, setTabValue);
  
    expect(setTabValue).toHaveBeenCalledWith(newValue);
  });

  test('handleOpenRequestDetails sets selected request and opens dialog', () => {
    const setSelectedRequest = jest.fn();
    const setRequestDialogOpen = jest.fn();
    const request = { id: 1, status: 'Pendiente' };
  
    handleOpenRequestDetails(request, setSelectedRequest, setRequestDialogOpen);
  
    expect(setSelectedRequest).toHaveBeenCalledWith(request);
    expect(setRequestDialogOpen).toHaveBeenCalledWith(true);
  });



  it('handleCloseRequestDetails closes dialog and updates asks', async () => {
    const setIncomingAsks = jest.fn();
    const setOutgoingAsks = jest.fn();

      // Mock para la respuesta de axios.get
      axios.get.mockResolvedValueOnce({ data: [{ id: 1, status: 'Aprobado' }, { id: 2, status: 'Pendiente' }] });
      // Renderizar el componente o función que llama handleCloseRequestDetails
      // Asegúrate de tener valores iniciales para setSelectedRequest y setRequestDialogOpen
      await handleCloseRequestDetails(
        jest.fn(), // setSelectedRequest mockeado
        jest.fn(), // setRequestDialogOpen mockeado
        setIncomingAsks,
        setOutgoingAsks
      );

      // Verificar que setIncomingAsks y setOutgoingAsks se llamaron con los datos esperados
      expect(setIncomingAsks).toHaveBeenCalledWith([
        { id: 1, status: 'Aprobado' },
        { id: 2, status: 'Pendiente' },
      ]);
      expect(setOutgoingAsks).toHaveBeenCalledWith([{ id: 1, status: 'Aprobado' }]);
    });

  test('handleApproveRequest logs and closes request details', async () => {
    const handleCloseRequestDetails = jest.fn();
    const request = { id: 1, status: 'Pendiente' };

    await handleApproveRequest(request, handleCloseRequestDetails);

    expect(handleCloseRequestDetails).toHaveBeenCalled();
  });

  test('handleRejectRequest logs and closes request details', () => {
    const handleCloseRequestDetails = jest.fn();
    const request = { id: 1, status: 'Pendiente' };
  
    handleRejectRequest(request, handleCloseRequestDetails);
  
    expect(handleCloseRequestDetails).toHaveBeenCalled();
  });
});

