import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../Static/Logo.png';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const activeStyle = "px-4 py-3 flex items-center text-teal-500 bg-teal-50 rounded-lg font-medium";
  const inactiveStyle = "px-4 py-3 flex items-center text-gray-600 hover:bg-gray-50 rounded-lg hover:text-teal-500 transition-colors duration-200";


  const visibilityClasses = isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0";

  return (
    <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-40 transition-transform duration-300 ease-in-out ${visibilityClasses}`}>
      <Link to="/" onClick={() => toggleSidebar && toggleSidebar()}>
        <div className="flex items-center p-5 border-b">
          <div className="bg-gradient-to-r from-teal-500 to-emerald-500 h-10 w-10 rounded-lg flex items-center justify-center">
            <div className="text-white font-bold text-xl">
              <img src={logo} alt="logo" className="w-10 h-10 rounded-lg" />
            </div>
          </div>
          <div className="ml-3">
            <div className="font-semibold text-gray-800">SolveIQ</div>
            <div className="text-xs text-gray-400">India</div>
          </div>
          
          {toggleSidebar && (
            <button 
              className="ml-auto text-gray-500 hover:text-gray-700 md:hidden"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleSidebar();
              }}
              aria-label="Close menu"
            >
              <i className="fa-solid fa-times text-lg"></i>
            </button>
          )}
        </div>
      </Link>

      <div className="px-4 py-3 text-xs text-gray-400 font-medium">MAIN MENU</div>
      
      <div className="py-2 px-2">
        <NavLink 
          to="/codeforces" 
          className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
          onClick={() => toggleSidebar && toggleSidebar()}
        >
          <i className="fa-solid fa-trophy text-lg w-8"></i>
          CodeForces
        </NavLink>
        
        <NavLink 
          to="/leetcode" 
          className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
          onClick={() => toggleSidebar && toggleSidebar()}
        >
          <i className="fa-solid fa-code text-lg w-8"></i>
          LeetCode
        </NavLink>
        
        <NavLink 
          to="/codechef" 
          className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
          onClick={() => toggleSidebar && toggleSidebar()}
        >
          <i className="fa-solid fa-utensils text-lg w-8"></i>
          CodeChef
        </NavLink>
        
        <NavLink 
          to="/suggested-questions" 
          className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
          onClick={() => toggleSidebar && toggleSidebar()}
        >
          <i className="fa-solid fa-layer-group text-lg w-8"></i>
          Suggested Questions
        </NavLink>
        
        <NavLink 
          to="/qod" 
          className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
          onClick={() => toggleSidebar && toggleSidebar()}
        >
          <i className="fa-solid fa-calendar-day text-lg w-8"></i>
          QOD
        </NavLink>
      </div>

      <div className="px-4 py-3 text-xs text-gray-400 font-medium mt-4">ACCOUNT</div>
      <div className="py-2 px-2">
        <NavLink 
          to="/settings" 
          className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
          onClick={() => toggleSidebar && toggleSidebar()}
        >
          <i className="fa-solid fa-gear text-lg w-8"></i>
          Settings
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar; 