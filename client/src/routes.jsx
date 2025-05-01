import React from "react";
import Layout from "./components/Layout";
import CodeForces from "./components/CodeForces";
import CodeChef from "./components/CodeChef";
import LeetCode from "./components/LeetCode";
import QuestionOfTheDayPage from "./components/QuestionOfTheDayPage";
import SuggestedQuestions from "./components/SuggestedQuestions";
import LandingPage from "./components/LandingPage";
import Settings from "./components/Settings";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
  const {token} = useContext(AuthContext);
  if(!token){
    return <Navigate to="/login" />;
  }
  return children;
}

const ComingSoon = ({ title }) => (
  <div className="p-8">
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
      <p className="text-gray-600">
        This feature is coming soon. We're working hard to bring you the best
        experience!
      </p>

      <div className="mt-8 flex items-center justify-center">
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full animate-pulse opacity-20"></div>
          <div className="absolute inset-4 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full animate-pulse opacity-30 delay-300"></div>
          <div className="absolute inset-8 bg-gradient-to-r from-teal-600 to-emerald-700 rounded-full animate-pulse opacity-50 delay-700"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-teal-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <p className="text-center text-gray-500 mt-8">
        Check back soon for updates!
      </p>
    </div>
  </div>
);

const NotFound = () => (
  <div className="p-8">
    <div className="bg-white rounded-xl p-8 shadow-sm text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-medium text-gray-700 mb-8">
        Page Not Found
      </h2>
      <p className="text-gray-600 max-w-md mx-auto mb-8">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <a
        href="/"
        className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
      >
        Go Back Home
      </a>
    </div>
  </div>
);

const routes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      {
        path: "/codeforces",
        element: <CodeForces />,
      },
      {
        path: "/leetcode",
        element: <LeetCode />,
      },
      {
        path: "/codechef",
        element: <CodeChef />,
      },
      {
        path: "/suggested-questions",
        element: <SuggestedQuestions />,
      },
      {
        path: "/qod",
        element: <QuestionOfTheDayPage />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default routes;
