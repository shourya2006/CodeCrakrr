import React from 'react';

const HeaderBar = ({ title, subtitle }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  );
};

export default HeaderBar; 