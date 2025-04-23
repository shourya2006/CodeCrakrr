import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {!sidebarOpen && (
        <div className="fixed top-4 left-4 z-50 md:hidden">
          <button
            onClick={toggleSidebar}
            className="bg-white p-2.5 rounded-lg shadow-md text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center"
            aria-label="Toggle sidebar menu"
          >
            <i className="fa-solid fa-bars text-lg"></i>
          </button>
        </div>
      )}

      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="ml-0 md:ml-64 transition-all duration-300 ease-in-out pt-16 md:pt-0">
        <Outlet />
      </div>
      
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default Layout;
