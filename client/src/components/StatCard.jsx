import React from 'react';

const StatCard = ({ title, value, icon, chartIcon, gradientClass }) => {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm stat-card ${gradientClass}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-lg bg-white shadow-sm">
          <i className={`${icon} text-lg`}></i>
        </div>
        <div className="flex items-center">
          <i className={`${chartIcon} text-xl`}></i>
        </div>
      </div>
      <div className="text-sm text-gray-500 font-medium">{title}</div>
      <div className="text-3xl font-bold text-gray-800 mt-1">{value}</div>
    </div>
  );
};

export default StatCard; 