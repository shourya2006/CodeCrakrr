import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const activeStyle = "px-4 py-3 flex items-center text-teal-500 bg-teal-50 rounded-lg font-medium";
  const inactiveStyle = "px-4 py-3 flex items-center text-gray-600 hover:bg-gray-50 rounded-lg hover:text-teal-500 transition-colors duration-200";

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-10">
      <div className="flex items-center p-5 border-b">
        <div className="bg-gradient-to-r from-teal-500 to-emerald-500 h-10 w-10 rounded-lg flex items-center justify-center">
          <div className="text-white font-bold text-xl">C</div>
        </div>
        <div className="ml-3">
          <div className="font-semibold text-gray-800">Code Crakrr</div>
          <div className="text-xs text-gray-400">India</div>
        </div>
      </div>

      <div className="px-4 py-3 text-xs text-gray-400 font-medium">MAIN MENU</div>
      
      <div className="py-2 px-2">
        <NavLink to="/codeforces" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
          <i className="fa-solid fa-trophy text-lg w-8"></i>
          CodeForces
        </NavLink>
        
        <NavLink to="/leetcode" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
          <i className="fa-solid fa-code text-lg w-8"></i>
          LeetCode
        </NavLink>
        
        <NavLink to="/codechef" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
          <i className="fa-solid fa-utensils text-lg w-8"></i>
          CodeChef
        </NavLink>
        
        <NavLink to="/sde-sheet" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
          <i className="fa-solid fa-layer-group text-lg w-8"></i>
          SDE Sheet
        </NavLink>
        
        <NavLink to="/qod" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
          <i className="fa-solid fa-calendar-day text-lg w-8"></i>
          QOD
        </NavLink>
      </div>

      <div className="px-4 py-3 text-xs text-gray-400 font-medium mt-4">ACCOUNT</div>
      <div className="py-2 px-2">
        <NavLink to="/settings" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
          <i className="fa-solid fa-gear text-lg w-8"></i>
          Settings
        </NavLink>
        
        <button className={inactiveStyle + " w-full text-left"}>
          <i className="fa-solid fa-right-from-bracket text-lg w-8"></i>
          Log Out
        </button>
      </div>

      <div className="absolute bottom-0 w-full border-t p-4 bg-gray-50">
        <div className="flex items-center">
          <img src="https://randomuser.me/api/portraits/men/44.jpg" alt="User" className="w-10 h-10 rounded-full object-cover border-2 border-teal-500" />
          <div className="ml-3">
            <div className="font-medium">Ronald Richards</div>
            <div className="text-xs text-gray-400">ronaldrich@gmail.com</div>
          </div>
          <div className="ml-auto bg-white p-1.5 rounded-full shadow-sm">
            <i className="fa-solid fa-ellipsis text-gray-400"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 