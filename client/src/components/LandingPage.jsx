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
import dashboard from "../Static/dashboard.png";

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
          <div className="md:w-1/2 mb-12 md:mb-0 md:pr-10 fade-in-left">
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
                <button className="bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors flex items-center cursor-pointer hover:scale-105 transform transition-transform duration-300 ease-in-out">
                  Get Started <ArrowRight className="w-4 h-4 ml-2 bounce-right" />
                </button>
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 fade-in-right">
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-white rounded-xl pulse-slow"></div>
              <div className="relative z-10 bg-gray-900 p-2 rounded-xl shadow-2xl overflow-hidden hover-shadow-glow transition-shadow duration-700">
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
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl font-bold mb-4">About SolveIQ</h2>
            <div className="w-16 h-1 bg-white mx-auto mb-8 grow-width"></div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Simplifying competitive programming tracking across LeetCode,
              CodeForces, and CodeChef.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="fade-in-left">
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

            <div className="fade-in-right">
              <h3 className="text-2xl font-bold mb-6">Our Journey</h3>
              <div className="space-y-8">
                {journeySteps.map((step) => (
                  <div className="flex journey-step" key={step.id}>
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold step-number">
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

          <div className="mt-20 text-center fade-in-up">
            <h3 className="text-2xl font-bold mb-8">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  className="feature-card border border-gray-800 p-8 rounded-xl"
                  style={{ animationDelay: `${index * 150}ms` }}
                  key={feature.id}
                >
                  <div className="feature-icon w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-6">
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

      <style jsx>{`
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceRight {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes growWidth {
          from { width: 0; }
          to { width: 4rem; }
        }
        @keyframes shadowGlow {
          0%, 100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.3); }
          50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.6); }
        }
        
        .fade-in-left {
          animation: fadeInLeft 1s ease-out forwards;
        }
        .fade-in-right {
          animation: fadeInRight 1s ease-out forwards;
        }
        .fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        .bounce-right {
          animation: bounceRight 1.5s infinite;
        }
        .pulse-slow {
          animation: pulseSlow 3s infinite;
        }
        .grow-width {
          animation: growWidth 1.5s ease-out forwards;
        }
        .hover-shadow-glow:hover {
          animation: shadowGlow 2s infinite;
        }
        
        .feature-card {
          animation: fadeInUp 1s ease-out forwards;
          transition: all 0.3s ease;
        }
        
        .feature-card:hover {
          border-color: white;
          background-color: rgba(31, 41, 55, 0.5);
          transform: translateY(-8px);
        }
        
        .feature-icon {
          transition: transform 0.3s ease;
        }
        
        .feature-card:hover .feature-icon {
          transform: rotate(12deg);
        }
        
        .journey-step {
          transition: transform 0.3s ease-in-out;
        }
        
        .journey-step:hover {
          transform: translateX(8px);
        }
        
        .step-number {
          transition: transform 0.3s ease;
        }
        
        .journey-step:hover .step-number {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
