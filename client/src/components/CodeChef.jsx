import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderBar from './HeaderBar';
import StatCard from './StatCard';
import ActivityHeatmap from './codechef/ActivityHeatmap';
import RatingGraph from './codechef/RatingGraph';
import RecentContests from './codechef/RecentContests';

const CodeChef = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    try {
      const settings = localStorage.getItem("platformSettings");
      if (!settings) {
        throw new Error("Platform settings not found");
      }
      
      const parsedSettings = JSON.parse(settings);
      if (!parsedSettings.codechef) {
        throw new Error("CodeChef username not found");
      }
      
      setUsername(parsedSettings.codechef);
    } catch (error) {
      console.error("Error retrieving CodeChef username:", error);
      alert("User Details Not Found");
      navigate("/settings");
    }
  }, [navigate]);
  
  useEffect(() => {
    if (!username) return;
    
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
  }, [username]);
  
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
      <div className="p-8 flex items-center justify-center" style={{ minHeight: '75vh' }}>
        <div className="bg-white p-10 rounded-xl shadow-sm flex flex-col items-center justify-center w-96 max-w-full">
          <div className="mb-8 p-4 bg-red-50 rounded-full">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-md">
              <i className="fa-solid fa-utensils text-white text-xl"></i>
            </div>
          </div>
          

          <h2 className="text-2xl font-medium text-gray-800 mb-8">CodeChef</h2>
      
          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-red-500 rounded-full w-2/3" 
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