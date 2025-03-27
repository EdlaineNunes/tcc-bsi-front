import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ token }) => {
  return token ? <Outlet /> : <Navigate to="/error" state={{ status: 401 }} />;
};

export default PrivateRoute;
