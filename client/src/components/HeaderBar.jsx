import React from 'react';

const HeaderBar = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 pt-6 md:pt-0">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 break-words">{title}</h1>
        <p className="text-gray-500 mt-1 text-sm md:text-base">{subtitle}</p>
      </div>
    </div>
  );
};

export default HeaderBar; 