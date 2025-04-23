import React from 'react';

const StatCard = ({ title, value, icon, chartIcon, gradientClass }) => {
  return (
    <div className={`bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm stat-card ${gradientClass}`}>
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div className="p-2 md:p-3 rounded-lg bg-white shadow-sm">
          <i className={`${icon} text-base md:text-lg`}></i>
        </div>
        <div className="flex items-center">
          <i className={`${chartIcon} text-lg md:text-xl`}></i>
        </div>
      </div>
      <div className="text-xs sm:text-sm text-gray-500 font-medium line-clamp-1">{title}</div>
      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mt-1 line-clamp-1 break-words">{value}</div>
    </div>
  );
};

export default StatCard; 