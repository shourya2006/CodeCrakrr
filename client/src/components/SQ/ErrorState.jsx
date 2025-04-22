import React from "react";
import HeaderBar from "../HeaderBar";
const ErrorState = ({ error }) => {
  return (
    <div className="p-8">
      <HeaderBar
        title="Suggested Questions"
        subtitle="Personalized recommendations for your skill level"
      />
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-6">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
        <p className="mt-2">
          Unable to load suggested questions from LeetCode.
        </p>
      </div>
    </div>
  );
};

export default ErrorState;
