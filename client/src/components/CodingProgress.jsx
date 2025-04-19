
const CodingProgress = () => {

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center">
          <div className="p-3 rounded-lg bg-teal-50 mr-3">
            <i className="fa-solid fa-code text-teal-500 text-lg"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-800">Coding Progress</h2>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-teal-500 mr-2"></div>
              <span className="text-sm text-gray-500">Solved</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
              <span className="text-sm text-gray-500">Attempted</span>
            </div>
          </div>
        </div>
      </div>
      
    
      <div className="h-64 w-full bg-gray-50 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">
            No data available
          </p>
        </div>
      </div>
    </div>
  );
};

export default CodingProgress; 