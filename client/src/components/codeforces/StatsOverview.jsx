import React from 'react';

const StatsOverview = ({ userInfo, stats }) => {
  const getRatingColorClass = (rating) => {
    if (rating < 1200) return 'text-gray-500';
    if (rating < 1400) return 'text-green-500';
    if (rating < 1600) return 'text-cyan-500';
    if (rating < 1900) return 'text-blue-500';
    if (rating < 2100) return 'text-violet-500';
    if (rating < 2400) return 'text-orange-500';
    return 'text-red-500';
  };
  
  const getRankName = (rating) => {
    if (rating < 1200) return 'Newbie';
    if (rating < 1400) return 'Pupil';
    if (rating < 1600) return 'Specialist';
    if (rating < 1900) return 'Expert';
    if (rating < 2100) return 'Candidate Master';
    if (rating < 2400) return 'Master';
    if (rating < 2600) return 'International Master';
    if (rating < 3000) return 'Grandmaster';
    return 'Legendary Grandmaster';
  };

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <div className={`${color} w-10 h-10 mb-3 rounded-lg flex items-center justify-center`}>
        <i className={`fas ${icon} text-white`}></i>
      </div>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  );

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img 
            src={userInfo.avatar || "https://userpic.codeforces.org/no-avatar.jpg"} 
            alt={userInfo.handle} 
            className="w-14 h-14 rounded-lg object-cover mr-4 border-2 border-gray-100"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              {userInfo.handle}
              <span className={`ml-2 text-sm font-normal ${getRatingColorClass(userInfo.rating)}`}>
                {getRankName(userInfo.rating)}
              </span>
            </h2>
            <p className="text-gray-500 text-sm">{userInfo.country}{userInfo.city ? `, ${userInfo.city}` : ''}</p>
          </div>
        </div>
        <div className="bg-gray-50 px-3 py-1 rounded-lg flex items-center">
          <span className={`font-bold ${getRatingColorClass(userInfo.rating)}`}>{userInfo.rating}</span>
          <span className="text-xs text-gray-500 ml-1">Rating</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard 
          title="Problems Solved"
          value={stats.totalSolved}
          icon="fa-code"
          color="bg-emerald-500"
        />
        <StatCard 
          title="Max Rating"
          value={stats.maxRating}
          icon="fa-chart-line"
          color="bg-blue-500"
        />
        <StatCard 
          title="Contests"
          value={stats.totalContests}
          icon="fa-trophy"
          color="bg-amber-500"
        />
        <StatCard 
          title="Submissions"
          value={stats.totalSubmissions}
          icon="fa-file-code"
          color="bg-purple-500"
        />
      </div>
    </div>
  );
};

export default StatsOverview; 