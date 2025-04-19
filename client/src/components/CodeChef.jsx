import React, { useState, useEffect } from 'react';
import HeaderBar from './HeaderBar';
import StatCard from './StatCard';
import ActivityHeatmap from './codechef/ActivityHeatmap';
import RatingGraph from './codechef/RatingGraph';
import RecentContests from './codechef/RecentContests';

const CodeChef = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const username = 'algo_x_addict';
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        
        const response = await fetch(`https://codechef-api.vercel.app/handle/${username}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch user data. Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('CodeChef Data:', data);
        setUserData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching CodeChef data:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
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
  
  if (isLoading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          <div className="ml-4 text-lg text-gray-600">Loading CodeChef data...</div>
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
  
  if (!userData) {
    return (
      <div className="p-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <strong className="font-bold">User not found!</strong>
          <span className="block sm:inline"> Could not find user with handle: {username}</span>
        </div>
      </div>
    );
  }
  
  const currentRating = userData.currentRating || 'N/A';
  const highestRating = userData.highestRating || 'N/A';
  const stars = userData.stars || '';
  const contestCount = userData.ratingData?.length || 0;
  
  const stats = [
    {
      title: 'Current Rating',
      value: currentRating.toString(),
      icon: 'fa-solid fa-chart-line text-indigo-500',
      chartIcon: 'fa-solid fa-arrow-trend-up text-indigo-500',
      gradientClass: 'gradient-rating'
    },
    {
      title: 'Highest Rating',
      value: highestRating.toString(),
      icon: 'fa-solid fa-trophy text-yellow-500',
      chartIcon: 'fa-solid fa-medal text-yellow-500',
      gradientClass: 'gradient-maxrating'
    },
    {
      title: 'Contests Participated',
      value: contestCount.toString(),
      icon: 'fa-solid fa-code-compare text-teal-500',
      chartIcon: 'fa-solid fa-check-circle text-teal-500',
      gradientClass: 'gradient-solved'
    }
  ];
  
  return (
    <div className="p-8">
      <HeaderBar 
        title={`CodeChef | ${username}`}
        subtitle={`${stars} ${currentRating !== 'N/A' ? `(${currentRating})` : ''}`}
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
      
      <div className="mb-8">
        <RatingGraph ratingData={userData.ratingData || []} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ActivityHeatmap 
          heatmap={userData.heatMap || []} 
          monthLabels={getLast6Months()}
        />
        
        <RecentContests contests={userData.ratingData || []} />
      </div>
    </div>
  );
};

export default CodeChef; 