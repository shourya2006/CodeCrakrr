import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderBar from "./HeaderBar";
import StatCard from "./StatCard";
import ActivityHeatmap from "./leetcode/ActivityHeatmap";
import ProblemStats from "./leetcode/ProblemStats";
import RecentQuestions from "./leetcode/RecentQuestions";
import MaxStreak from "./leetcode/MaxStreak";

const LEETCODE_API_BASE = "https://leetcode-api-faisalshohag.vercel.app";

const LeetCode = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const settings = localStorage.getItem("platformSettings");
      if (!settings) {
        throw new Error("Platform settings not found");
      }
      
      const parsedSettings = JSON.parse(settings);
      if (!parsedSettings.leetcode) {
        throw new Error("LeetCode username not found");
      }
      
      setUsername(parsedSettings.leetcode);
    } catch (error) {
      console.error("Error retrieving LeetCode username:", error);
      alert("User Details Not Found");
      navigate("/settings");
    }
  }, [navigate]);

  useEffect(() => {
    if (!username) return;

    const fetchUserData = async () => {
      try {
        setIsLoading(true);

        const apiUrl = `${LEETCODE_API_BASE}/${username}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (!data || Object.keys(data).length === 0) {
          throw new Error("No data received from LeetCode API");
        }

        const transformedData = {
          matchedUser: {
            username: username,
            submitStats: {
              acSubmissionNum: data.matchedUserStats.acSubmissionNum || [],
            },
            profile: {
              ranking: data.ranking || "N/A",
              reputation: data.reputation || 0,
            },
            activeBadge: {
              displayName: "LeetCoder",
            },
            profileCalendar: data.submissionCalendar || "{}",
          },
          allQuestionsCount: [
            { difficulty: "All", count: data.totalQuestions },
            { difficulty: "Easy", count: data.totalEasy },
            { difficulty: "Medium", count: data.totalMedium },
            { difficulty: "Hard", count: data.totalHard },
          ],
          recentSubmissionList: (data.recentSubmissions || []).map(
            (submission) => ({
              ...submission,
              question: {
                difficulty: getDifficultyFromTitle(submission.title),
                questionId: getQuestionIdFromTitle(submission.title),
                topicTags: [{ name: "Algorithm" }],
              },
            })
          ),
        };

        setUserData(transformedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  const getDifficultyFromTitle = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("easy")) return "Easy";
    if (lowerTitle.includes("hard")) return "Hard";
    return "Medium";
  };

  const getQuestionIdFromTitle = (title) => {
    const match = title.match(/^(\d+)\./);
    return match ? match[1] : "0";
  };

  const getLast6Months = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentMonth = new Date().getMonth();
    const last6Months = [];

    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      last6Months.push(months[monthIndex]);
    }

    return last6Months;
  };

  const processUserStats = () => {
    if (!userData || !userData.matchedUser) return null;

    const { matchedUser, allQuestionsCount } = userData;
    const submitStats = matchedUser.submitStats?.acSubmissionNum || [];

    const totalSolved =
      submitStats.find((stat) => stat.difficulty === "All")?.count || 0;
    const easySolved =
      submitStats.find((stat) => stat.difficulty === "Easy")?.count || 0;
    const mediumSolved =
      submitStats.find((stat) => stat.difficulty === "Medium")?.count || 0;
    const hardSolved =
      submitStats.find((stat) => stat.difficulty === "Hard")?.count || 0;

    const totalQuestions =
      allQuestionsCount?.find((q) => q.difficulty === "All")?.count || 0;
    const totalEasy =
      allQuestionsCount?.find((q) => q.difficulty === "Easy")?.count || 0;
    const totalMedium =
      allQuestionsCount?.find((q) => q.difficulty === "Medium")?.count || 0;
    const totalHard =
      allQuestionsCount?.find((q) => q.difficulty === "Hard")?.count || 0;

    return {
      totalSolved,
      totalQuestions,
      easySolved,
      totalEasy,
      mediumSolved,
      totalMedium,
      hardSolved,
      totalHard,
    };
  };

  const processRecentSubmissions = () => {
    if (!userData || !userData.recentSubmissionList) return [];

    return userData.recentSubmissionList
      .filter((submission) => submission.statusDisplay === "Accepted")
      .map((submission) => ({
        id: submission.titleSlug || submission.title,
        title: submission.title,
        timestamp: submission.timestamp,
        status: submission.statusDisplay,
        language: submission.lang,
        difficulty: submission.question?.difficulty || "Medium",
        questionId: submission.question?.questionId || "0",
        tags: submission.question?.topicTags?.map((tag) => tag.name) || [
          "Algorithm",
        ],
      }));
  };

  if (isLoading) {
    return (
      <div
        className="p-8 flex items-center justify-center"
        style={{ minHeight: "75vh" }}
      >
        <div className="bg-white p-10 rounded-xl shadow-sm flex flex-col items-center justify-center w-96 max-w-full">
          <div className="mb-8 p-4 bg-yellow-50 rounded-full">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-md">
              <i className="fa-solid fa-code text-white text-xl"></i>
            </div>
          </div>

          <h2 className="text-2xl font-medium text-gray-800 mb-8">LeetCode</h2>

          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-yellow-500 rounded-full w-2/3"
              style={{
                animation: "progress-loading 3s ease-in-out infinite",
                transformOrigin: "left center",
              }}
            ></div>
          </div>

          <div className="text-sm text-gray-500 mt-2">Loading user data...</div>

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
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
          <p className="mt-2">
            Please check if the LeetCode API is available or try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!userData || !userData.matchedUser) {
    return (
      <div className="p-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <strong className="font-bold">User not found!</strong>
          <span className="block sm:inline">
            {" "}
            Could not find user with handle: {username}
          </span>
        </div>
      </div>
    );
  }

  const userStats = processUserStats();
  const processedSubmissions = processRecentSubmissions();
  const ranking = userData.matchedUser.profile?.ranking || "N/A";
  const totalSolved = userStats?.totalSolved || 0;
  const profileCalendar = userData.matchedUser.profileCalendar;

  const stats = [
    {
      title: "Problems Solved",
      value: totalSolved.toString(),
      icon: "fa-solid fa-code text-green-500",
      chartIcon: "fa-solid fa-check-circle text-green-500",
      gradientClass: "gradient-solved",
    },
    {
      title: "Global Ranking",
      value: ranking.toString(),
      icon: "fa-solid fa-trophy text-yellow-500",
      chartIcon: "fa-solid fa-medal text-yellow-500",
      gradientClass: "gradient-ranking",
    },
    {
      title: "Max Streak",
      value: (
        <MaxStreak submissionCalendar={profileCalendar} isCompact={true} />
      ),
      icon: "fa-solid fa-fire text-orange-500",
      chartIcon: "fa-solid fa-fire text-orange-500",
      gradientClass: "gradient-streak",
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <HeaderBar
        title={`LeetCode | ${username || 'Loading...'}`}
        subtitle={userData?.matchedUser?.activeBadge?.displayName || ""}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            chartIcon={stat.chartIcon}
            gradientClass={stat.gradientClass}
          />
        ))}
      </div>

      <div className="mb-6 sm:mb-8 overflow-x-auto">
        <ProblemStats userStats={userStats} />
      </div>

      <div className="mb-6 sm:mb-8">
        <MaxStreak submissionCalendar={profileCalendar} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="overflow-x-auto">
          <ActivityHeatmap
            submissionCalendar={profileCalendar}
            monthLabels={getLast6Months()}
          />
        </div>

        <RecentQuestions recentSubmissions={processedSubmissions} />
      </div>
    </div>
  );
};

export default LeetCode;
