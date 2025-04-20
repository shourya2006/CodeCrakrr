import React, { useState, useEffect } from 'react';

const difficultyColors = {
  Easy: 'text-green-600 bg-green-50',
  Medium: 'text-yellow-600 bg-yellow-50',
  Hard: 'text-red-600 bg-red-50'
};

const DailyQuestion = () => {
  const [dailyQuestion, setDailyQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchDailyQuestion = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://alfa-leetcode-api.onrender.com/daily');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch daily question: ${response.status}`);
        }
        
        const data = await response.json();
        setDailyQuestion(data);
      } catch (err) {
        console.error('Error fetching daily question:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDailyQuestion();
  }, []);
  
  // Function to decode HTML entities and format properly for display
  const formatQuestionHTML = (html) => {
    if (!html) return '';
    
    // Replace common LeetCode HTML patterns with proper React/JSX friendly format
    let formattedHTML = html
      // Fix code blocks and elements
      .replace(/<code>/g, '<span class="bg-gray-100 px-1 py-0.5 rounded text-pink-600 font-mono">')
      .replace(/<\/code>/g, '</span>')
      .replace(/<pre>/g, '<div class="bg-gray-100 p-3 rounded my-3 font-mono text-sm overflow-x-auto">')
      .replace(/<\/pre>/g, '</div>')
      
      // Fix emphasis
      .replace(/<strong>/g, '<span class="font-bold">')
      .replace(/<\/strong>/g, '</span>')
      .replace(/<em>/g, '<span class="italic">')
      .replace(/<\/em>/g, '</span>')
      
      // Fix lists
      .replace(/<ul>/g, '<ul class="list-disc pl-6 my-2">')
      .replace(/<ol>/g, '<ol class="list-decimal pl-6 my-2">')
      
      // Fix paragraphs
      .replace(/<p>/g, '<p class="my-2">')
      
      // Format examples
      .replace(/<strong class="example">Example \d+:<\/strong>/g, match => 
        `<div class="bg-gray-50 p-4 rounded-lg my-4 border border-gray-200"><h4 class="font-bold text-gray-700 mb-3">${match.replace(/<\/?strong[^>]*>/g, '')}</h4>`)
      

      
      // Display Output and Explanation on new lines
      .replace(/Output:/g, '<br /><br />Output:')
      .replace(/Explanation:/g, '<br /><br />Explanation:')
      
      // Close any open example divs
      .replace(/<\/pre>\s*<p>&nbsp;<\/p>/g, '</pre></div><p>&nbsp;</p>')
      .replace(/<p>&nbsp;<\/p>\s*<p><strong>/g, '</div><p>&nbsp;</p><p><strong>');
    
    // Ensure all example sections are closed properly
    if (formattedHTML.includes('<div class="bg-gray-50 p-4 rounded-lg my-4 border border-gray-200">') && 
        !formattedHTML.endsWith('</div>')) {
      formattedHTML += '</div>';
    }
    
    return formattedHTML;
  };
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-indigo-500 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-indigo-500 rounded-full animate-pulse delay-75"></div>
          <div className="w-4 h-4 bg-indigo-500 rounded-full animate-pulse delay-150"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-red-500">
          <h3 className="font-medium">Unable to load daily question</h3>
          <p className="text-sm">Please try again later.</p>
        </div>
      </div>
    );
  }
  
  if (!dailyQuestion) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-gray-500">
          <h3 className="font-medium">No question available</h3>
          <p className="text-sm">Check back later for today's challenge.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">{dailyQuestion.questionTitle}</h2>
        <div className={`rounded-full px-3 py-1 text-xs font-medium ${difficultyColors[dailyQuestion.difficulty]}`}>
          {dailyQuestion.difficulty}
        </div>
      </div>
      
      
      <div className="text-gray-700 text-sm mb-4 overflow-y-auto max-h-[500px] pr-2 leetcode-content" 
           dangerouslySetInnerHTML={{ __html: formatQuestionHTML(dailyQuestion.question) }}>
      </div>
      
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center space-x-3 flex-wrap">
          {dailyQuestion.topicTags?.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700 mb-2">
              {tag.name}
            </span>
          ))}
          {dailyQuestion.topicTags?.length > 3 && (
            <span className="text-xs text-gray-500 mb-2">+{dailyQuestion.topicTags.length - 3} more</span>
          )}
        </div>
        
        <a 
          href={dailyQuestion.questionLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Solve Challenge
        </a>
      </div>
      
      <div className="mt-4 text-xs text-gray-500 flex justify-end items-center">
        <span className="flex items-center space-x-1">
          <i className="fa-regular fa-thumbs-up"></i>
          <span>{dailyQuestion.likes}</span>
        </span>
        <span className="mx-2">•</span>
        <span className="flex items-center space-x-1">
          <i className="fa-regular fa-thumbs-down"></i>
          <span>{dailyQuestion.dislikes}</span>
        </span>
      </div>
      
      <style jsx>{`
        .leetcode-content pre {
          white-space: pre-wrap;
          word-break: break-word;
        }
      `}</style>
    </div>
  );
};

export default DailyQuestion; 