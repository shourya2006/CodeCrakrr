import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderBar from "./HeaderBar";

const SDESheets = () => {
  const [sheets, setSheets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [sheetToDelete, setSheetToDelete] = useState(null);
  
  useEffect(() => {
    loadSheets();
  }, []);
  
  const loadSheets = () => {
    setIsLoading(true);
    try {
      const userSheets = JSON.parse(localStorage.getItem('sdeSheets')) || [];
      setSheets(userSheets);
    } catch (error) {
      console.error('Error loading sheets:', error);
      setSheets([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteClick = (e, sheet) => {
    e.preventDefault();
    e.stopPropagation();
    setSheetToDelete(sheet);
    setShowConfirmModal(true);
  };
  
  const confirmDelete = () => {
    if (!sheetToDelete) return;
    
    try {
      const updatedSheets = sheets.filter(sheet => sheet.id !== sheetToDelete.id);
      localStorage.setItem('sdeSheets', JSON.stringify(updatedSheets));
      setSheets(updatedSheets);
    } catch (error) {
      console.error('Error deleting sheet:', error);
    } finally {
      setShowConfirmModal(false);
      setSheetToDelete(null);
    }
  };
  
  const cancelDelete = () => {
    setShowConfirmModal(false);
    setSheetToDelete(null);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <HeaderBar 
          title="SDE Sheets" 
          subtitle="Curated problem collections for interview preparation"
        />
        <Link 
          to="/sde/upload"
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center shadow-sm transition-colors duration-200"
        >
          <i className="fa-solid fa-upload mr-2"></i>
          Upload Sheet
        </Link>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {sheets.length !== 0 ? (
            sheets.map((sheet) => (
              <div key={sheet.id} className="relative group">
                <Link 
                  to={`/sde/${sheet.id}`} 
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col h-full"
                >
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${sheet.color} flex items-center justify-center shadow-sm mr-4`}
                    >
                      <i className={`${sheet.icon} text-white text-lg`}></i>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {sheet.name}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4 flex-grow">
                    {sheet.description}
                  </p>
                  
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      <i className="fa-solid fa-list-check text-gray-400 mr-2"></i>
                      <span className="text-gray-600">{sheet.count} problems</span>
                    </div>
                    <div className="rounded-lg px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center">
                      <span className="mr-1">View</span>
                      <i className="fa-solid fa-arrow-right text-xs"></i>
                    </div>
                  </div>
                </Link>
                
                <button 
                  onClick={(e) => handleDeleteClick(e, sheet)}
                  className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50"
                  aria-label="Delete sheet"
                >
                  <i className="fa-solid fa-trash text-red-500"></i>
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <div className="bg-white rounded-xl p-10 shadow-sm text-center flex flex-col items-center">
                <div className="mb-8 p-4 bg-gray-50 rounded-full w-24 h-24 flex items-center justify-center">
                  <i className="fa-solid fa-folder-open text-gray-300 text-4xl"></i>
                </div>
                
                <h3 className="text-2xl font-medium text-gray-700 mb-3">No SDE Sheets Found</h3>
                <p className="text-gray-500 max-w-lg mb-8">
                  You haven't added any SDE sheets yet. Upload your first sheet to get started with your interview preparation.
                </p>
                
                <Link 
                  to="/sde/upload"
                  className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg flex items-center shadow-sm transition-colors duration-200"
                >
                  <i className="fa-solid fa-upload mr-2"></i>
                  Upload Your First Sheet
                </Link>
                
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl text-left">
                  <div className="p-4 bg-teal-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <i className="fa-solid fa-check-circle text-teal-500 mr-2"></i>
                      <span className="font-medium text-teal-700">Track progress</span>
                    </div>
                    <p className="text-sm text-teal-600">Monitor your preparation with visual progress indicators</p>
                  </div>
                  
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <i className="fa-solid fa-list-check text-indigo-500 mr-2"></i>
                      <span className="font-medium text-indigo-700">Stay organized</span>
                    </div>
                    <p className="text-sm text-indigo-600">Keep all your practice problems in one place</p>
                  </div>
                  
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <i className="fa-solid fa-chart-line text-amber-500 mr-2"></i>
                      <span className="font-medium text-amber-700">Measure growth</span>
                    </div>
                    <p className="text-sm text-amber-600">See how your problem-solving skills improve over time</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Delete Sheet</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <span className="font-medium">{sheetToDelete?.name}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SDESheets;
