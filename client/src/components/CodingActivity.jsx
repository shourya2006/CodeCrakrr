import React from 'react';

const CodingActivity = () => {
  const generateActivityData = () => {
    const data = [];
    for (let week = 0; week < 26; week++) {
      const weekData = [];
      for (let day = 0; day < 7; day++) {
        const activityLevel = Math.floor(Math.random() * 5);
        weekData.push(activityLevel);
      }
      data.push(weekData);
    }
    return data;
  };

  const getLast6Months = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    const last6Months = [];
    
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      last6Months.push(months[monthIndex]);
    }
    
    return last6Months;
  };

  const activityData = generateActivityData();
  const monthLabels = getLast6Months();
  
  const recentQuestions = [
    {
      title: "Two Sum",
      platform: "Leetcode",
      difficulty: "Easy",
      tag: "Arrays",
      solvedAt: "2 hours ago",
      platformColor: "bg-yellow-500"
    },
    {
      title: "Maximum Subarray",
      platform: "Leetcode",
      difficulty: "Medium",
      tag: "Dynamic Programming",
      solvedAt: "Yesterday",
      platformColor: "bg-yellow-500"
    },
    {
      title: "Valid Parentheses",
      platform: "Leetcode",
      difficulty: "Easy",
      tag: "Stack",
      solvedAt: "2 days ago",
      platformColor: "bg-yellow-500"
    },
  ];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty.toLowerCase()) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-600';
      case 'hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <span className="mr-2">Coding Activity</span>
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
                  {week.map((level, dayIndex) => (
                    <div 
                      key={`${weekIndex}-${dayIndex}`} 
                      className={`w-3.5 h-3.5 ${getActivityColor(level)} rounded-sm mb-1 border border-opacity-40 ${getBorderColor(level)}`}
                      title={`${level > 0 ? level + (level === 1 ? ' problem' : ' problems') : 'No activity'} on Week ${weekIndex + 1}, Day ${dayIndex + 1}`}
                    ></div>
                  ))}
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
                <span className="font-semibold text-emerald-600">542</span> contributions in the last 6 months
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Recent Questions Solved</h2>
          <button className="text-teal-500 hover:text-teal-600 flex items-center">
            <span className="mr-1">View All</span>
            <i className="fa-solid fa-arrow-right text-sm"></i>
          </button>
        </div>
        
        <div className="space-y-4">
          {recentQuestions.map((question, index) => (
            <div key={index} className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100 hover:border-gray-200">
              <div className={`w-10 h-10 ${question.platformColor} rounded-lg flex items-center justify-center text-white mr-4 shadow-md`}>
                <i className={question.platform === "Leetcode" ? "fa-solid fa-code" : "fa-solid fa-trophy"}></i>
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{question.title}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <span className={`mr-2 font-medium ${getDifficultyColor(question.difficulty)}`}>{question.difficulty}</span>
                  <span className="mr-2 text-gray-400">•</span>
                  <span>{question.tag}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">{question.solvedAt}</div>
                <div className="mt-1 flex justify-end">
                  <div className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">{question.platform}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodingActivity; 