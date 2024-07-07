// requestDetailsDialog.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import RequestDetailsDialog from '../RequestDetailsDialog';

jest.mock('axios');
jest.mock('js-cookie');

describe('RequestDetailsDialog Component', () => {
  const request = {
    id: 1,
    nombre: 'John Doe',
    ubicacionRecogida: '123 Main St',
    calificacion: 5,
    genero: 'Masculino',
    universidad: 'Universidad de Ejemplo'
  };

  const handleClose = jest.fn();

  beforeEach(() => {
    Cookies.get.mockImplementation(() => 'csrftoken');
    jest.clearAllMocks();
  });

  it('renders the dialog with request details correctly', () => {
    render(<RequestDetailsDialog request={request} open={true} onClose={handleClose} />);
    
    expect(screen.getByText('Detalles de la Solicitud')).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/123 Main St/i)).toBeInTheDocument();
    expect(screen.getByText(/5/i)).toBeInTheDocument();
    expect(screen.getByText(/Masculino/i)).toBeInTheDocument();
    expect(screen.getByText(/Universidad de Ejemplo/i)).toBeInTheDocument();
  });

  it('calls handleApproveRequest and closes the dialog on success', async () => {
    axios.put.mockResolvedValue({ data: 'Success' });
  
    render(<RequestDetailsDialog request={request} open={true} onClose={handleClose} />);
  
    const approveButton = screen.getByLabelText('Approve Button');
    fireEvent.click(approveButton);
  
    await waitFor(() => expect(axios.put).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}asks/update_ask/`,
      { ask_id: request.id, decision: 'approved' },
      { headers: { 'X-CSRFToken': 'csrftoken' }, withCredentials: true }
    ));
    expect(handleClose).toHaveBeenCalled();
  });
  
  it('calls handleRejectRequest and closes the dialog on success', async () => {
    axios.put.mockResolvedValue({ data: 'Success' });
  
    render(<RequestDetailsDialog request={request} open={true} onClose={handleClose} />);
  
    const rejectButton = screen.getByLabelText('Reject Button');
    fireEvent.click(rejectButton);
  
    await waitFor(() => expect(axios.put).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}asks/update_ask/`,
      { ask_id: request.id, decision: 'denied' },
      { headers: { 'X-CSRFToken': 'csrftoken' }, withCredentials: true }
    ));
    expect(handleClose).toHaveBeenCalled();
  });


  
});
