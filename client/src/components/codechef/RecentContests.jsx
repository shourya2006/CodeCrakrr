import React from 'react';

const RecentContests = ({ contests }) => {
  if (!contests || contests.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Recent Contests</h2>
        </div>
        <div className="flex justify-center items-center h-[220px] bg-gray-50 rounded-lg">
          <p className="text-gray-500">No contest data available</p>
        </div>
      </div>
    );
  }
  
  const reversedContests = [...contests].reverse();
  
  const processedContests = reversedContests.map((contest, index, arr) => {
    let ratingChange = 0;
    
    if (index < arr.length - 1) {
      const currentRating = parseInt(contest.rating);
      const prevRating = parseInt(arr[index + 1].rating);
      ratingChange = currentRating - prevRating;
    }
    
    return {
      ...contest,
      ratingChange
    };
  });
  
  const recentThreeContests = processedContests.slice(0, 3);
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Recent Contests</h2>
        {contests.length > 3 && (
          <div className="text-xs text-gray-500">
            Showing 3 of {contests.length} contests
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        {recentThreeContests.map((contest, index) => (
          <div key={index} className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100 hover:border-gray-200">
            <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center text-white mr-4 shadow-md">
              <i className="fa-solid fa-trophy"></i>
            </div>
            <div className="flex-1 overflow-hidden">
              <h3 className="font-medium truncate">{contest.name}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-2">Rank: {contest.rank || 'N/A'}</span>
              </div>
            </div>
            <div className="text-right ml-2">
              <div className="text-xs text-gray-500">
                {`${contest.getmonth}/${contest.getday}/${contest.getyear}`}
              </div>
              <div className={`mt-1 font-medium ${index === 0 ? 'text-gray-600' : contest.ratingChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {index === 0 ? contest.rating : (contest.ratingChange >= 0 ? '+' : '') + contest.ratingChange}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentContests; 