import React from "react";

const difficultyColor = {
  Easy: "bg-green-100 text-green-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Hard: "bg-red-100 text-red-800",
};

const RecentQuestions = ({ recentSubmissions }) => {
  if (!recentSubmissions || recentSubmissions.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Recent Solved Problems
          </h2>
          <a
            href="https://leetcode.com/submissions/#/1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
          >
            View All
            <i className="fa-solid fa-external-link-alt text-xs ml-1"></i>
          </a>
        </div>
        <div className="flex justify-center items-center h-[220px] bg-gray-50 rounded-lg">
          <p className="text-gray-500">No solved problems found</p>
        </div>
      </div>
    );
  }

  const uniqueProblemIds = new Set();
  const uniqueSubmissions = [];

  recentSubmissions.forEach((submission) => {
    const problemId = submission.id || submission.questionId;
    if (!uniqueProblemIds.has(problemId)) {
      uniqueProblemIds.add(problemId);
      uniqueSubmissions.push(submission);
    }
  });

  const recentThreeSubmissions = uniqueSubmissions.slice(0, 3);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Recent Solved Problems
        </h2>
        <a
          href="https://leetcode.com/submissions/#/1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
        >
          View All
          <i className="fa-solid fa-external-link-alt text-xs ml-1"></i>
        </a>
      </div>

      <div className="space-y-3">
        {recentThreeSubmissions.map((submission, index) => (
          <div
            key={index}
            className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100 hover:border-gray-200 relative overflow-hidden group"
          >
            {/* Left color accent based on difficulty */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-1 ${
                submission.difficulty === "Easy"
                  ? "bg-green-500"
                  : submission.difficulty === "Medium"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            ></div>

            <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center text-white mr-4 shadow-md group-hover:bg-indigo-600 transition-colors">
              <i className="fa-solid fa-code"></i>
            </div>
            <div className="flex-1 overflow-hidden">
              <h3 className="font-medium truncate">{submission.title}</h3>
              <div className="flex items-center text-xs mt-1">
                <span
                  className={`px-2 py-1 rounded-full ${
                    difficultyColor[submission.difficulty]
                  }`}
                >
                  {submission.difficulty}
                </span>
                {submission.tags && submission.tags.length > 0 && (
                  <span className="ml-2 text-gray-500">
                    {submission.tags[0]}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right ml-2">
              <div className="text-xs text-gray-500">
                {new Date(submission.timestamp * 1000).toLocaleDateString()}
              </div>
              <div className="mt-1 text-xs font-medium text-gray-600">
                {submission.status === "Accepted" ? (
                  <span className="text-green-600">Accepted</span>
                ) : (
                  <span className="text-red-600">{submission.status}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentQuestions;