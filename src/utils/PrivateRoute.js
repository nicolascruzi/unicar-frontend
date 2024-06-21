import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = () => {
  const isAuthenticated = Cookies.get('sessionid') !== undefined && localStorage.getItem('user') !== null; // Check if sessionid cookie exists

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;