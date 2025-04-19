import React from 'react';

const ProblemStats = ({ userStats }) => {
  if (!userStats) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Problem Stats</h2>
        </div>
        <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No stats available</p>
        </div>
      </div>
    );
  }
  
  const { totalSolved, totalQuestions, easySolved, totalEasy, mediumSolved, totalMedium, hardSolved, totalHard } = userStats;
  
  const totalPercentage = Math.round((totalSolved / totalQuestions) * 100) || 0;
  const easyPercentage = Math.round((easySolved / totalEasy) * 100) || 0;
  const mediumPercentage = Math.round((mediumSolved / totalMedium) * 100) || 0;
  const hardPercentage = Math.round((hardSolved / totalHard) * 100) || 0;
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-5">Problem Stats</h2>
      
      <div className="space-y-5">
        {/* Total Problems */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">All Problems</span>
            <span className="text-sm font-medium text-gray-700">{totalSolved} / {totalQuestions}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full" 
              style={{ width: `${totalPercentage}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1 text-right">{totalPercentage}%</div>
        </div>
        
        {/* Easy Problems */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-green-700">Easy</span>
            <span className="text-sm font-medium text-gray-700">{easySolved} / {totalEasy}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-green-500 h-2.5 rounded-full" 
              style={{ width: `${easyPercentage}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1 text-right">{easyPercentage}%</div>
        </div>
        
        {/* Medium Problems */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-yellow-700">Medium</span>
            <span className="text-sm font-medium text-gray-700">{mediumSolved} / {totalMedium}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-yellow-500 h-2.5 rounded-full" 
              style={{ width: `${mediumPercentage}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1 text-right">{mediumPercentage}%</div>
        </div>
        
        {/* Hard Problems */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-red-700">Hard</span>
            <span className="text-sm font-medium text-gray-700">{hardSolved} / {totalHard}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-red-500 h-2.5 rounded-full" 
              style={{ width: `${hardPercentage}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1 text-right">{hardPercentage}%</div>
        </div>
      </div>
    </div>
  );
};

export default ProblemStats; 