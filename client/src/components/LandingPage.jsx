import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Layout,
  BarChart2,
  Lightbulb,
  MonitorSmartphone,
  Cloud,
  Code,
  Medal,
} from "lucide-react";
import dashboard from "../Static/Dashboard.png";

const LandingPage = () => {
  const features = [
    {
      id: 1,
      title: "Cross-Platform Integration",
      description:
        "Track your coding journey across LeetCode, CodeForces, and CodeChef in a single unified dashboard.",
      icon: <Layout className="h-8 w-8" />,
    },
    {
      id: 2,
      title: "Performance Analytics",
      description:
        "Visualize your progress with intuitive statistics and metrics designed for competitive programmers.",
      icon: <BarChart2 className="h-8 w-8" />,
    },
    {
      id: 3,
      title: "Daily Challenges",
      description:
        "Access a daily coding problem to maintain consistent practice and build your problem-solving skills.",
      icon: <Lightbulb className="h-8 w-8" />,
    },
    {
      id: 4,
      title: "AI-Powered Recommendations",
      description:
        "Get personalized problem suggestions based on your skill level using DeepSeek AI technology.",
      icon: <MonitorSmartphone className="h-8 w-8" />,
    },
    {
      id: 5,
      title: "User-Friendly Interface",
      description:
        "Enjoy a clean, minimalist design with a focus on readability and usability for a seamless experience.",
      icon: <Cloud className="h-8 w-8" />,
    },
    {
      id: 6,
      title: "Skill Assessment",
      description:
        "Track your progress with detailed problem categorization, difficulty ratings, and personalized improvement areas.",
      icon: <Medal className="h-8 w-8" />,
    },
  ];

  const journeySteps = [
    {
      id: 1,
      title: "The Problem",
      description:
        "We identified the challenge of tracking progress across multiple competitive programming platforms, creating fragmented experiences for developers.",
    },
    {
      id: 2,
      title: "The Solution",
      description:
        "We developed SolveIQ to unify performance tracking across platforms, bringing analytics and insights into one cohesive dashboard.",
    },
    {
      id: 3,
      title: "Today",
      description:
        "SolveIQ now serves thousands of competitive programmers with advanced analytics and AI-powered recommendations to enhance their coding journey.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0 md:pr-10">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              SolveIQ: Your Competitive Programming Hub
            </h1>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              A comprehensive platform designed to help competitive programmers
              track and visualize their progress across multiple coding
              platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={localStorage.getItem('platformSettings') !== null ? '/codeforces' : '/settings'}>
                <button className="bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors flex items-center cursor-pointer">
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </Link>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-white rounded-xl"></div>
              <div className="relative z-10 bg-gray-900 p-2 rounded-xl shadow-2xl overflow-hidden">
                <img
                  src={dashboard}
                  alt="SolveIQ Dashboard Interface"
                  className="rounded-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-24 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">About SolveIQ</h2>
            <div className="w-16 h-1 bg-white mx-auto mb-8"></div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Simplifying competitive programming tracking across LeetCode,
              CodeForces, and CodeChef.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                At SolveIQ, we're on a mission to simplify the competitive
                programming experience. We believe that programmers should focus
                on solving problems and improving their skills, not managing
                multiple platforms and tracking systems.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Our platform is built to provide a unified dashboard experience
                for LeetCode, CodeForces, and CodeChef performance metrics,
                making it easier for developers to track their growth, identify
                areas for improvement, and discover new challenges tailored to
                their skill level.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Our Journey</h3>
              <div className="space-y-8">
                {journeySteps.map((step) => (
                  <div className="flex" key={step.id}>
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold">
                        {step.id}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold mb-8">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div
                  className="border border-gray-800 p-8 rounded-xl hover:border-white transition-colors"
                  key={feature.id}
                >
                  <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-6">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-4">{feature.title}</h4>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
