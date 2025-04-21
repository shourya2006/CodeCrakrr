import React from "react";

const LoadingState = ({ isGenerating }) => {
  return (
    <div
      className="p-8 flex items-center justify-center"
      style={{ minHeight: "75vh" }}
    >
      <div className="bg-white p-10 rounded-xl shadow-sm flex flex-col items-center justify-center w-96 max-w-full">
        <div className="mb-8 p-4 bg-red-50 rounded-full">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-md">
            <i className="fa-solid fa-laptop-code text-white text-xl"></i>
          </div>
        </div>

        <h2 className="text-2xl font-medium text-gray-800 mb-8">
          Suggested Questions
        </h2>

        <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-red-500 rounded-full w-2/3"
            style={{
              animation: "progress-loading 3s ease-in-out infinite",
              transformOrigin: "left center",
            }}
          ></div>
        </div>

        <div className="text-sm text-gray-500 mt-2">
          {isGenerating
            ? "Generating AI Recommendations..."
            : "Loading Questions..."}
        </div>

        <style jsx>{`
          @keyframes progress-loading {
            0% {
              width: 0%;
            }
            100% {
              width: 100%;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default LoadingState;
