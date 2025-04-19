import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar />
      <div className="ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout; 