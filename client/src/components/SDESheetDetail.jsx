import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import HeaderBar from './HeaderBar';

const SDESheetDetail = () => {
  const { sheetId } = useParams();
  const navigate = useNavigate();
  const [sheetData, setSheetData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const sheetInfo = {
  };
  
  const [currentSheet, setCurrentSheet] = useState(null);
  
  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        setIsLoading(true);
        
        const savedSheets = JSON.parse(localStorage.getItem('sdeSheets')) || [];
        const sheet = savedSheets.find(s => s.id === sheetId);
        
        if (!sheet) {
          if (!sheetInfo[sheetId]) {
            throw new Error('Sheet not found');
          }
          
          setCurrentSheet(sheetInfo[sheetId]);
          
        } else {
          setCurrentSheet({
            name: sheet.name,
            description: sheet.description,
            color: sheet.color,
            icon: sheet.icon
          });
          
          setSheetData({ sections: sheet.sections });
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sheet data:', error);
        setError(error.message);
        setIsLoading(false);
        
        setTimeout(() => {
          navigate('/sde');
        }, 3000);
      }
    };
    
    fetchSheetData();
  }, [sheetId, navigate]);
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <i className="fa-solid fa-circle-check text-green-500"></i>;
      case 'attempted':
        return <i className="fa-solid fa-circle-half-stroke text-yellow-500"></i>;
      case 'pending':
        return <i className="fa-regular fa-circle text-gray-300"></i>;
      default:
        return <i className="fa-regular fa-circle text-gray-300"></i>;
    }
  };

  const updateProblemStatus = (sectionIndex, problemIndex, newStatus) => {
    if (!sheetData) return;
    
    const updatedData = JSON.parse(JSON.stringify(sheetData));
    
    updatedData.sections[sectionIndex].problems[problemIndex].status = newStatus;
    
    setSheetData(updatedData);
    
    const savedSheets = JSON.parse(localStorage.getItem('sdeSheets')) || [];
    const sheetIndex = savedSheets.findIndex(s => s.id === sheetId);
    
    if (sheetIndex !== -1) {
      savedSheets[sheetIndex].sections = updatedData.sections;
      localStorage.setItem('sdeSheets', JSON.stringify(savedSheets));
    }
  };

  if (isLoading || !currentSheet) {
    return (
      <div className="p-8 flex items-center justify-center" style={{ minHeight: '75vh' }}>
        <div className="bg-white p-10 rounded-xl shadow-sm flex flex-col items-center justify-center w-96 max-w-full">
          <div className={`mb-8 p-4 bg-gray-50 rounded-full`}>
            <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${currentSheet?.color || 'from-gray-500 to-gray-600'} flex items-center justify-center shadow-md`}>
              <i className={`${currentSheet?.icon || 'fa-solid fa-spinner fa-spin'} text-white text-xl`}></i>
            </div>
          </div>
          
          <h2 className="text-2xl font-medium text-gray-800 mb-8">{currentSheet?.name || 'Loading Sheet...'}</h2>
          
          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-indigo-500 rounded-full w-2/3" 
                 style={{ 
                   animation: 'progress-loading 1.5s ease-in-out infinite',
                   transformOrigin: 'left center'
                 }}>
            </div>
          </div>
          
          <div className="text-sm text-gray-500 mt-2">
            Loading problems...
          </div>
          
          <style jsx>{`
            @keyframes progress-loading {
              0% { width: 0%; }
              50% { width: 60%; }
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
          <p className="mt-2">Please try again later. Redirecting back to sheets...</p>
        </div>
      </div>
    );
  }
  
  if (!sheetData || !sheetData.sections) {
    return (
      <div className="p-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <strong className="font-bold">No data found!</strong>
          <span className="block sm:inline"> This sheet does not contain any problems.</span>
          <Link to="/sde" className="text-yellow-800 underline mt-2 inline-block">Return to all sheets</Link>
        </div>
      </div>
    );
  }
  
  const totalProblems = sheetData.sections.reduce((total, section) => total + section.problems.length, 0) || 0;
  const completedProblems = sheetData.sections.reduce((total, section) => {
    return total + section.problems.filter(problem => problem.status === 'completed').length;
  }, 0) || 0;
  const completionPercentage = totalProblems ? Math.round((completedProblems / totalProblems) * 100) : 0;
  
  return (
    <div className="p-8">
      <HeaderBar 
        title={currentSheet.name}
        subtitle={currentSheet.description}
      />
      
      <div className="mb-8">
        <Link 
          to="/sde" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-4"
        >
          <i className="fa-solid fa-arrow-left mr-2"></i>
          Back to All Sheets
        </Link>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${currentSheet.color} flex items-center justify-center shadow-sm mr-4`}>
                <i className={`${currentSheet.icon} text-white text-lg`}></i>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{currentSheet.name}</h2>
                <p className="text-gray-600">{currentSheet.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-indigo-600">{completionPercentage}%</div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
          </div>
          
          <div className="text-sm text-gray-600">
            {completedProblems} of {totalProblems} problems solved
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Problems</h2>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PROBLEM</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-28">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sheetData.sections.flatMap((section, sectionIndex) => 
                  section.problems.map((problem, problemIndex) => (
                    <tr key={`${sectionIndex}-${problem.id}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center cursor-pointer" 
                          onClick={() => {
                            const nextStatus = {
                              'pending': 'attempted',
                              'attempted': 'completed',
                              'completed': 'pending'
                            };
                            updateProblemStatus(sectionIndex, problemIndex, nextStatus[problem.status] || 'pending');
                          }}
                        >
                          {getStatusIcon(problem.status)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{problem.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href={problem.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
                          <i className="fa-solid fa-external-link"></i> Solve
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SDESheetDetail; 