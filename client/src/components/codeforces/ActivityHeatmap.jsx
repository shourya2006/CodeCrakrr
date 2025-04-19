import React, { useState, useEffect, useRef } from 'react';

const ActivityHeatmap = ({ activityData, activityRawCounts, monthLabels, totalSolved }) => {
  const [hoverInfo, setHoverInfo] = useState(null);
  const tooltipRef = useRef(null);

  const formatDate = (weekIndex, dayIndex) => {
    const today = new Date();
    const daysDiff = weekIndex * 7 + dayIndex;
    const date = new Date(today);
    date.setDate(today.getDate() - daysDiff);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleMouseMove = (e) => {
    if (tooltipRef.current && hoverInfo) {
      const tooltip = tooltipRef.current;
      const x = e.clientX;
      const y = e.clientY;
      
      tooltip.style.left = `${x + 15}px`;
      tooltip.style.top = `${y - 40}px`;
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hoverInfo]);

  const getActivityColor = (level) => {
    switch(level) {
      case 0: return 'bg-gray-100';
      case 1: return 'bg-emerald-200';
      case 2: return 'bg-emerald-300';
      case 3: return 'bg-emerald-400';
      case 4: return 'bg-emerald-500';
      default: return 'bg-gray-100';
    }
  };

  const getBorderColor = (level) => {
    switch(level) {
      case 0: return 'border-gray-200';
      case 1: return 'border-emerald-300';
      case 2: return 'border-emerald-400';
      case 3: return 'border-emerald-500';
      case 4: return 'border-emerald-600';
      default: return 'border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <span className="mr-2">Problems Solved</span>
          <div className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">Last 6 months</div>
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">Less</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-sm bg-gray-100 border border-gray-200"></div>
            <div className="w-3 h-3 rounded-sm bg-emerald-200 border border-emerald-300"></div>
            <div className="w-3 h-3 rounded-sm bg-emerald-300 border border-emerald-400"></div>
            <div className="w-3 h-3 rounded-sm bg-emerald-400 border border-emerald-500"></div>
            <div className="w-3 h-3 rounded-sm bg-emerald-500 border border-emerald-600"></div>
          </div>
          <span className="text-xs text-gray-500">More</span>
        </div>
      </div>
      
      <div className="relative">
        <div className="flex items-center mb-2">
          <div className="w-10 text-xs text-right text-gray-500 mr-2 space-y-1.5">
            <div>Mon</div>
            <div>Wed</div>
            <div>Fri</div>
            <div>Sun</div>
          </div>
          <div className="flex overflow-x-auto pb-4 scrollbar-hide">
            {activityData.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col mr-1">
                {week.map((level, dayIndex) => {
                  const actualCount = activityRawCounts[weekIndex][dayIndex];
                  const dateStr = formatDate(weekIndex, dayIndex);
                  return (
                    <div 
                      key={`${weekIndex}-${dayIndex}`} 
                      className={`w-3.5 h-3.5 ${getActivityColor(level)} rounded-sm mb-1 border border-opacity-40 ${getBorderColor(level)} hover:transform hover:scale-125 transition-transform duration-100 cursor-pointer`}
                      onMouseEnter={() => setHoverInfo({ count: actualCount, date: dateStr })}
                      onMouseLeave={() => setHoverInfo(null)}
                    ></div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 ml-10 pt-1 border-t border-gray-100">
          {monthLabels.map((month, index) => (
            <div key={index} className="w-1/6 text-center font-medium">{month}</div>
          ))}
        </div>
        
        <div className="mt-4 flex items-center justify-center">
          <div className="flex items-center space-x-1 bg-gray-50 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span className="text-xs text-gray-500">
              <span className="font-semibold text-emerald-600">{totalSolved}</span> problems solved in total
            </span>
          </div>
        </div>
      </div>

      {hoverInfo && (
        <div 
          ref={tooltipRef}
          className="fixed p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg z-50 pointer-events-none"
          style={{ transform: 'translate(-50%, -100%)' }}
        >
          <div className="font-semibold">{hoverInfo.count} problem{hoverInfo.count !== 1 ? 's' : ''} solved</div>
          <div className="text-gray-300">{hoverInfo.date}</div>
        </div>
      )}
    </div>
  );
};

export default ActivityHeatmap; 