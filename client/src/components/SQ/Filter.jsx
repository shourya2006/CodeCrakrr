import React, { useState } from "react";

const Filter = ({ filters, availableTopics, handleDifficultyChange, handleTopicChange, handleSearchChange, clearAllFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  

  const toggleFilters = () => {
    setIsExpanded(!isExpanded);
  };
  
  const filterContentClasses = isExpanded 
    ? "block" 
    : "hidden md:block";

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">Filters</h3>
        <button 
          className="md:hidden text-gray-500 hover:text-gray-700"
          onClick={toggleFilters}
          aria-label="Toggle filters"
        >
          <i className={`fa-solid ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} text-sm`}></i>
        </button>
      </div>

      <div className={filterContentClasses}>
        <div className="mb-4">
          <div className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Search</div>
          <input
            type="text"
            placeholder="Search by name or topic..."
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            value={filters.searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className="mb-4">
          <div className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Difficulty</div>
          <div className="flex flex-wrap md:flex-col gap-3 md:gap-2">
            {["Easy", "Medium", "Hard"].map((difficulty) => (
              <label key={difficulty} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.difficulty.includes(difficulty)}
                  onChange={() => handleDifficultyChange(difficulty)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-xs sm:text-sm text-gray-700">{difficulty}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Topics</div>
          <div className="max-h-32 sm:max-h-48 overflow-y-auto pr-2 space-y-2">
            {availableTopics.map((topic) => (
              <label key={topic} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.topics.includes(topic)}
                  onChange={() => handleTopicChange(topic)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-xs sm:text-sm text-gray-700 truncate" title={topic}>{topic}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={clearAllFilters}
          className="w-full mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-xs sm:text-sm"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
