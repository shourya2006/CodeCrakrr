import React from 'react';
import DailyQuestion from './leetcode/DailyQuestion';
import HeaderBar from './HeaderBar';

const QuestionOfTheDayPage = () => {
  return (
    <div className="p-8">
      <HeaderBar 
        title="Question of the Day" 
        subtitle="Tackle a new LeetCode challenge every day to enhance your problem-solving skills"
      />
      
      <div className="mt-6 max-w-4xl mx-auto">
        <DailyQuestion />
      </div>
      
      <div className="mt-8 bg-white rounded-xl shadow-sm p-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Why Daily Practice Matters</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <i className="fa-solid fa-brain text-blue-500 mr-2"></i>
              <h3 className="font-medium text-blue-700">Cognitive Benefits</h3>
            </div>
            <p className="text-sm text-blue-600">Solving a problem daily keeps your algorithmic thinking sharp and reinforces pattern recognition in your brain.</p>
          </div>
          
          <div className="bg-emerald-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <i className="fa-solid fa-chart-line text-emerald-500 mr-2"></i>
              <h3 className="font-medium text-emerald-700">Consistent Growth</h3>
            </div>
            <p className="text-sm text-emerald-600">Daily practice creates a habit of continuous improvement, leading to steady skill development over time.</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <i className="fa-solid fa-briefcase text-purple-500 mr-2"></i>
              <h3 className="font-medium text-purple-700">Interview Readiness</h3>
            </div>
            <p className="text-sm text-purple-600">Regular practice means you'll always be prepared for technical interviews, reducing stress when opportunities arise.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionOfTheDayPage; 