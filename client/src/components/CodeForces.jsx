import React, { useState, useEffect } from 'react';
import HeaderBar from './HeaderBar';
import StatCard from './StatCard';
import ProblemDistribution from './codeforces/ProblemDistribution';
import ActivityHeatmap from './codeforces/ActivityHeatmap';
import RatingGraph from './codeforces/RatingGraph';

const CodeForces = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userSubmissions, setUserSubmissions] = useState([]);
  const [ratingHistory, setRatingHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const username = 'one_unknown';
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        

        const userInfoResponse = await fetch(`https://codeforces.com/api/user.info?handles=${username}`);
        const userInfoData = await userInfoResponse.json();
        
        if (userInfoData.status !== 'OK') {
          throw new Error('Failed to fetch user info');
        }
        
        setUserInfo(userInfoData.result[0]);
        

        const submissionsResponse = await fetch(`https://codeforces.com/api/user.status?handle=${username}`);
        const submissionsData = await submissionsResponse.json();
        
        if (submissionsData.status !== 'OK') {
          throw new Error('Failed to fetch user submissions');
        }
        
        setUserSubmissions(submissionsData.result);
        
        const ratingResponse = await fetch(`https://codeforces.com/api/user.rating?handle=${username}`);
        const ratingData = await ratingResponse.json();
        
        if (ratingData.status !== 'OK') {
          throw new Error('Failed to fetch rating history');
        }
        
        setRatingHistory(ratingData.result);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [username]);
  
  const calculateTotalSolved = () => {
    if (!userSubmissions || userSubmissions.length === 0) return 0;
    
    const solvedProblems = new Set();
    
    userSubmissions.forEach(submission => {
      if (submission.verdict === 'OK') {
        const problemId = `${submission.problem.contestId}-${submission.problem.index}`;
        solvedProblems.add(problemId);
      }
    });
    
    return solvedProblems.size;
  };
  
  const generateActivityData = () => {
    if (!userSubmissions || userSubmissions.length === 0) {
      return { grid: Array(26).fill().map(() => Array(7).fill(0)), rawCounts: Array(26).fill().map(() => Array(7).fill(0)) };
    }
    
    const activityGrid = Array(26).fill().map(() => Array(7).fill(0));
    const rawCountsGrid = Array(26).fill().map(() => Array(7).fill(0)); 
    
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    
    const problemsByDay = {};
    
    userSubmissions.forEach(submission => {
      const submissionDate = new Date(submission.creationTimeSeconds * 1000);
      
      if (submissionDate >= sixMonthsAgo && submission.verdict === 'OK') {
        const dateKey = submissionDate.toISOString().split('T')[0];
        const problemId = `${submission.problem.contestId}-${submission.problem.index}`;
        
        if (!problemsByDay[dateKey]) {
          problemsByDay[dateKey] = new Set();
        }
        
        problemsByDay[dateKey].add(problemId);
      }
    });
    
    Object.entries(problemsByDay).forEach(([dateKey, problems]) => {
      const date = new Date(dateKey);
      const diffDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));
      
      if (diffDays < 182) { 
        const weekIndex = Math.floor(diffDays / 7);
        const dayIndex = date.getDay(); 
        
        if (weekIndex < 26) {
          rawCountsGrid[weekIndex][dayIndex] = problems.size;
        }
      }
    });
    
    const rawCounts = JSON.parse(JSON.stringify(rawCountsGrid));
    
    const maxActivity = Math.max(...rawCountsGrid.flatMap(week => Math.max(...week)));
    
    if (maxActivity > 0) {
      for (let w = 0; w < 26; w++) {
        for (let d = 0; d < 7; d++) {
          if (rawCountsGrid[w][d] > 0) {
            activityGrid[w][d] = Math.min(4, Math.ceil((rawCountsGrid[w][d] / maxActivity) * 4));
          }
        }
      }
    }
    
    return { grid: activityGrid, rawCounts };
  };
  
  const getRecentContests = () => {
    if (!ratingHistory || ratingHistory.length === 0) return [];
    
    return ratingHistory
      .slice(-3) 
      .map(contest => ({
        name: contest.contestName,
        date: new Date(contest.ratingUpdateTimeSeconds * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        ratingChange: contest.newRating - contest.oldRating,
        rank: contest.rank,
        solved: 0
      }))
      .reverse(); 
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
  
  const prepareRatingData = () => {
    if (!ratingHistory || ratingHistory.length === 0) {
      return [];
    }
    
    return ratingHistory.slice(-20).map(item => ({
      date: new Date(item.ratingUpdateTimeSeconds * 1000).toISOString().split('T')[0],
      rating: item.newRating,
      change: item.newRating - item.oldRating
    }));
  };

  const calculateProblemsByDifficulty = () => {
    if (!userSubmissions || userSubmissions.length === 0) return {};
    
    const problemsByDifficulty = {};
    const solvedProblems = new Set();
    
    userSubmissions.forEach(submission => {
      if (submission.verdict === 'OK') {
        const problemId = `${submission.problem.contestId}-${submission.problem.index}`;
        
        if (!solvedProblems.has(problemId) && submission.problem.rating) {
          solvedProblems.add(problemId);
          
          const difficulty = submission.problem.rating;
          problemsByDifficulty[difficulty] = (problemsByDifficulty[difficulty] || 0) + 1;
        }
      }
    });
    
    return problemsByDifficulty;
  };
  
  const calculateProblemsByTags = () => {
    if (!userSubmissions || userSubmissions.length === 0) return {};
    
    const problemsByTags = {};
    const solvedProblems = new Set();
    
    userSubmissions.forEach(submission => {
      if (submission.verdict === 'OK') {
        const problemId = `${submission.problem.contestId}-${submission.problem.index}`;
        
        if (!solvedProblems.has(problemId) && submission.problem.tags) {
          solvedProblems.add(problemId);
          
          submission.problem.tags.forEach(tag => {
            problemsByTags[tag] = (problemsByTags[tag] || 0) + 1;
          });
        }
      }
    });
    
    return problemsByTags;
  };

  const totalSolved = calculateTotalSolved();
  const { grid: activityData, rawCounts: activityRawCounts } = generateActivityData();
  const monthLabels = getLast6Months();
  const recentContests = getRecentContests();
  const ratingData = prepareRatingData();
  const problemsByDifficulty = calculateProblemsByDifficulty();
  const problemsByTags = calculateProblemsByTags();

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center" style={{ minHeight: '75vh' }}>
        <div className="bg-white p-10 rounded-xl shadow-sm flex flex-col items-center justify-center w-96 max-w-full">
          <div className="mb-8 p-4 bg-blue-50 rounded-full">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
              <i className="fa-solid fa-chart-line text-white text-xl"></i>
            </div>
          </div>
          
          <h2 className="text-2xl font-medium text-gray-800 mb-8">CodeForces</h2>
          
          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-blue-500 rounded-full w-2/3" 
                 style={{ 
                   animation: 'progress-loading 3s ease-in-out infinite',
                   transformOrigin: 'left center'
                 }}>
            </div>
          </div>
          
          <div className="text-sm text-gray-500 mt-2">
            Loading user data...
          </div>
          
          <style jsx>{`
            @keyframes progress-loading {
              0% { width: 0%; }
              100% { width: 100%; }
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
          <p className="mt-2">Please check if the user exists or try again later.</p>
        </div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="p-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <strong className="font-bold">User not found!</strong>
          <span className="block sm:inline"> Could not find user with handle: {username}</span>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Current Rating',
      value: userInfo.rating?.toString() || 'Unrated',
      icon: 'fa-solid fa-chart-line text-indigo-500',
      chartIcon: 'fa-solid fa-arrow-trend-up text-indigo-500',
      gradientClass: 'gradient-rating'
    },
    {
      title: 'Max Rating',
      value: userInfo.maxRating?.toString() || 'Unrated',
      icon: 'fa-solid fa-trophy text-yellow-500',
      chartIcon: 'fa-solid fa-medal text-yellow-500',
      gradientClass: 'gradient-maxrating'
    },
    {
      title: 'Problems Solved',
      value: totalSolved.toString(),
      icon: 'fa-solid fa-code text-teal-500',
      chartIcon: 'fa-solid fa-check-circle text-teal-500',
      gradientClass: 'gradient-solved'
    }
  ];

  return (
    <div className="p-8">
      <HeaderBar 
        title={`Codeforces | ${userInfo.handle}`}
        subtitle={`${userInfo.rank || 'Unrated'} ${userInfo.rating ? `(${userInfo.rating})` : ''}`}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard 
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            chartIcon={stat.chartIcon}
            gradientClass={stat.gradientClass}
          />
        ))}
      </div>


      <RatingGraph ratingData={ratingData} userRating={userInfo.rating} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        <ActivityHeatmap 
          activityData={activityData}
          activityRawCounts={activityRawCounts}
          monthLabels={monthLabels}
          totalSolved={totalSolved}
        />

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Contests</h2>
            <button className="text-indigo-500 hover:text-indigo-600 flex items-center">
              <span className="mr-1">View All</span>
              <i className="fa-solid fa-arrow-right text-sm"></i>
            </button>
          </div>
          
          {recentContests.length === 0 ? (
            <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No contest data available for this user</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentContests.map((contest, index) => (
                <div key={index} className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100 hover:border-gray-200">
                  <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center text-white mr-4 shadow-md">
                    <i className="fa-solid fa-code-branch"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{contest.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-2">Rank: {contest.rank}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">{contest.date}</div>
                    <div className={`mt-1 font-medium ${contest.ratingChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {contest.ratingChange >= 0 ? '+' : ''}{contest.ratingChange}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ProblemDistribution 
        problemsByDifficulty={problemsByDifficulty}
        problemsByTags={problemsByTags}
      />
    </div>
  );
};

export default CodeForces; 