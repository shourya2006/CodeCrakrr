import React from "react";

const Filter = ({ filters, availableTopics, handleDifficultyChange, handleTopicChange, handleSearchChange, clearAllFilters }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>

      <div className="mb-4">
        <div className="text-sm font-medium text-gray-700 mb-2">Search</div>
        <input
          type="text"
          placeholder="Search by name or topic..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={filters.searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium text-gray-700 mb-2">Difficulty</div>
        <div className="space-y-2">
          {["Easy", "Medium", "Hard"].map((difficulty) => (
            <label key={difficulty} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.difficulty.includes(difficulty)}
                onChange={() => handleDifficultyChange(difficulty)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{difficulty}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium text-gray-700 mb-2">Topics</div>
        <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
          {availableTopics.map((topic) => (
            <label key={topic} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.topics.includes(topic)}
                onChange={() => handleTopicChange(topic)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{topic}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={clearAllFilters}
        className="w-full mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default Filter;
