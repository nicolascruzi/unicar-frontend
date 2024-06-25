import React from "react";
import axios from "axios";


export const handleTabChange = (event, newValue, setTabValue) => {
    setTabValue(newValue);
  };

export const handleOpenRequestDetails = (request, setSelectedRequest, setRequestDialogOpen) => {
    setSelectedRequest(request);
    setRequestDialogOpen(true);
  };

export const handleCloseRequestDetails = async (setSelectedRequest, setRequestDialogOpen, setIncomingAsks, setOutgoingAsks) => {
    setSelectedRequest(null);
    setRequestDialogOpen(false);
    const response = await axios.get(`${process.env.REACT_APP_API_URL}asks/get_asks/`, {
      withCredentials: true,
    });
    console.log(response.data);
    setIncomingAsks(response.data);
    setOutgoingAsks(response.data.filter(request => request.status !== 'Pendiente'));
  };

export const handleApproveRequest = async (request, handleCloseRequestDetails, setSelectedRequest, setRequestDialogOpen, setIncomingAsks, setOutgoingAsks) => {
    // Lógica para aprobar la solicitud

    console.log('Solicitud aprobada:', request);

    handleCloseRequestDetails(setSelectedRequest, setRequestDialogOpen, setIncomingAsks, setOutgoingAsks);
  };

export const handleRejectRequest = (request, handleCloseRequestDetails, setSelectedRequest, setRequestDialogOpen, setIncomingAsks, setOutgoingAsks) => {
    // Lógica para rechazar la solicitud
    console.log('Solicitud rechazada:', request);
    handleCloseRequestDetails(setSelectedRequest, setRequestDialogOpen, setIncomingAsks, setOutgoingAsks);
  };