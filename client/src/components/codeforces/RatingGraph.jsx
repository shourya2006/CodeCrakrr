import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  Area
} from 'recharts';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { TrendingUp, Award } from 'lucide-react';


const CustomDot = (props) => {
  const { cx, cy, payload } = props;
  
  let dotColor = '#3b82f6'; // Default blue
  if (payload.change > 0) {
    dotColor = '#22c55e'; // green-500 for positive change
  } else if (payload.change < 0) {
    dotColor = '#ef4444'; // red-500 for negative change
  }

  const isActive = props.isActive || false;
  const dotRadius = isActive ? 6 : 4;
  const strokeWidth = isActive ? 3 : 2;

  return (
    <circle 
      cx={cx}
      cy={cy}
      r={dotRadius}
      stroke={dotColor}
      strokeWidth={strokeWidth}
      fill="white"
    />
  );
};

const RatingGraph = ({ ratingData, userRating }) => {
  const processedData = ratingData.map(item => ({
    date: formatDate(item.date),
    rating: item.rating,
    change: item.change,
    fullDate: item.date
  }));

  const getRatingColor = (rating) => {
    if (!rating) return '#94a3b8'; 
    if (rating < 1200) return '#94a3b8'; 
    if (rating < 1400) return '#22c55e'; // green-500 - Pupil
    if (rating < 1600) return '#06b6d4'; // cyan-500 - Specialist
    if (rating < 1900) return '#3b82f6'; // blue-500 - Expert
    if (rating < 2100) return '#a855f7'; // purple-500 - Candidate Master
    if (rating < 2400) return '#f97316'; // orange-500 - Master
    if (rating < 2600) return '#ea580c'; // orange-600 - International Master
    if (rating < 2900) return '#ef4444'; // red-500 - Grandmaster
    return '#b91c1c'; // red-700 - International Grandmaster
  };

  const getRankName = (rating) => {
    if (!rating || rating < 1200) return 'Newbie';
    if (rating < 1400) return 'Pupil';
    if (rating < 1600) return 'Specialist';
    if (rating < 1900) return 'Expert';
    if (rating < 2100) return 'Candidate Master';
    if (rating < 2400) return 'Master';
    if (rating < 2600) return 'International Master';
    if (rating < 2900) return 'Grandmaster';
    return 'International Grandmaster';
  };

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  }

  const getRankBadgeClasses = (rating) => {
    if (!rating) return 'bg-slate-100 text-slate-500';
    if (rating < 1200) return 'bg-slate-100 text-slate-500';
    if (rating < 1400) return 'bg-green-100 text-green-700';
    if (rating < 1600) return 'bg-cyan-100 text-cyan-700';
    if (rating < 1900) return 'bg-blue-100 text-blue-700';
    if (rating < 2100) return 'bg-purple-100 text-purple-700';
    if (rating < 2400) return 'bg-orange-100 text-orange-700';
    if (rating < 2600) return 'bg-orange-100 text-orange-700';
    if (rating < 2900) return 'bg-red-100 text-red-700';
    return 'bg-red-100 text-red-700';
  };

  const findBestRating = () => {
    if (ratingData.length === 0) return userRating || 0;
    return Math.max(...ratingData.map(item => item.rating));
  };

  const bestRating = findBestRating();
  const ratingColor = getRatingColor(userRating);
  const rankName = getRankName(userRating);
  const rankBadgeClasses = getRankBadgeClasses(userRating);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const changeColor = data.change > 0 
        ? 'text-green-500' 
        : data.change < 0 
          ? 'text-red-500' 
          : 'text-slate-400';
      const changeText = data.change > 0 
        ? `+${data.change}` 
        : data.change;

      return (
        <div className="bg-white rounded-lg shadow-lg p-3 border border-slate-200">
          <p className="text-sm font-medium text-slate-900">{data.date}</p>
          <p className="text-lg font-bold text-slate-900">{data.rating}</p>
          <p className={`text-sm font-medium ${changeColor}`}>{changeText}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-slate-500" />
            Rating History
          </h2>
          <div className="text-sm text-slate-500">
            {ratingData.length} contests participated
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold" style={{ color: ratingColor }}>
              {userRating || 'Unrated'}
            </div>
            <div className={`px-2 py-1 rounded-full text-xs ${rankBadgeClasses}`}>
              {rankName}
            </div>
          </div>

          {userRating && ratingData.length > 0 && (
            <div className="text-sm text-slate-500 mt-1 flex items-center gap-1">
              <Award className="w-4 h-4 text-amber-500" />
              Best: <span className="font-medium">{bestRating}</span>
            </div>
          )}
        </div>
      </div>
      
      {ratingData.length === 0 ? (
        <div className="flex justify-center items-center h-72 rounded-lg bg-slate-50 border border-slate-100">
          <div className="text-slate-500 text-center">
            <svg className="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p>No rating data available yet</p>
            <p className="text-sm mt-1">Participate in contests to see your rating graph</p>
          </div>
        </div>
      ) : (
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={processedData}
              margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
            >
              <defs>
                <linearGradient id="ratingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={1} />
                </linearGradient>
                <linearGradient id="ratingAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="#e2e8f0" 
              />
              
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickMargin={10}
                tickFormatter={(value, index) => {
                  return index % Math.ceil(processedData.length / 5) === 0 
                    ? value : '';
                }}
              />
              
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickMargin={10}
                domain={['dataMin - 100', 'dataMax + 100']}
                tickCount={6}
              />
              
              <RechartsTooltip content={<CustomTooltip />} />
              
              <Area
                type="monotone"
                dataKey="rating"
                stroke="none"
                fill="url(#ratingAreaGradient)"
                fillOpacity={1}
              />
              
              <Line
                type="monotone"
                dataKey="rating"
                stroke="url(#ratingGradient)"
                strokeWidth={2.5}
                dot={<CustomDot />}
                activeDot={<CustomDot isActive={true} />}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default RatingGraph; 