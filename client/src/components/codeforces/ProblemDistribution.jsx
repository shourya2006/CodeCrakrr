import React from 'react';

const ProblemDistribution = ({ problemsByDifficulty, problemsByTags }) => {

  const getDifficultyColor = (difficulty) => {
    if (difficulty < 1000) return 'bg-gray-400';
    if (difficulty < 1200) return 'bg-green-400';
    if (difficulty < 1500) return 'bg-cyan-400';
    if (difficulty < 1800) return 'bg-blue-400';
    if (difficulty < 2100) return 'bg-violet-400';
    if (difficulty < 2400) return 'bg-orange-400';
    return 'bg-red-400';
  };


  const sortedDifficulties = Object.keys(problemsByDifficulty || {})
    .map(Number)
    .sort((a, b) => a - b);


  const maxDifficultyCount = Math.max(
    ...Object.values(problemsByDifficulty || {}).map((count) => count),
    1
  );


  const topTags = Object.entries(problemsByTags || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const maxTagCount = Math.max(...topTags.map(([, count]) => count), 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Problems by Difficulty</h3>
        
        <div className="space-y-3">
          {sortedDifficulties.map((difficulty) => (
            <div key={difficulty} className="flex items-center">
              <span className="w-12 text-sm text-gray-500">{difficulty}</span>
              <div className="flex-grow">
                <div 
                  className={`h-5 rounded ${getDifficultyColor(difficulty)}`} 
                  style={{ width: `${(problemsByDifficulty[difficulty] / maxDifficultyCount) * 100}%` }}
                ></div>
              </div>
              <span className="w-10 text-right text-sm text-gray-600">{problemsByDifficulty[difficulty]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Problems by Tags</h3>
        
        <div className="space-y-3">
          {topTags.map(([tag, count]) => (
            <div key={tag} className="flex items-center">
              <span className="w-24 text-sm text-gray-500 truncate" title={tag}>
                {tag}
              </span>
              <div className="flex-grow">
                <div 
                  className="h-5 rounded bg-blue-400" 
                  style={{ width: `${(count / maxTagCount) * 100}%` }}
                ></div>
              </div>
              <span className="w-10 text-right text-sm text-gray-600">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemDistribution; 