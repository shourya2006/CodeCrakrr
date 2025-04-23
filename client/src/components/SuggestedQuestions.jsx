import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderBar from "./HeaderBar";
import LoadingState from "./SQ/LoadingState";
import ErrorState from "./SQ/ErrorState";
import Filter from "./SQ/Filter";
import Questions from "./SQ/Questions";

const SuggestedQuestions = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    difficulty: [],
    topics: [],
    searchQuery: "",
  });
  const [availableTopics, setAvailableTopics] = useState([]);
  const [recommendationsError, setRecommendationsError] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [username, setUsername] = useState(null);

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

  const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || "";

  const fetchUserSkills = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/skillStats/${username}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch user skill stats (status ${response.status})`
        );
      }

      const data = await response.json();

      if (!data.data?.matchedUser?.tagProblemCounts) {
        throw new Error("Invalid user data format");
      }

      return data.data.matchedUser.tagProblemCounts;
    } catch (err) {
      console.error("Error fetching user skills:", err);
      setError(err.message);
      return null;
    }
  };

  const callDeepSeekAI = async (prompt) => {
    try {
      setIsGenerating(true);
      setRecommendationsError(null);

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "CodeCracker",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-r1:free",
            messages: [
              {
                role: "system",
                content:
                  "You are an AI assistant that recommends LeetCode questions based on a user's skill level. Your responses should be formatted as valid JSON arrays with each question containing title, difficulty, and topics fields.",
              },
              { role: "user", content: prompt },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `DeepSeek AI Error: ${
            errorData.error?.message ||
            JSON.stringify(errorData) ||
            "Unknown error"
          }`
        );
      }

      const data = await response.json();

      // console.log("DeepSeek API response:", data);

      if (data.choices && data.choices[0] && data.choices[0].message) {
        return data;
      } else {
        throw new Error("Unexpected API response format");
      }
    } catch (err) {
      console.error("Error calling DeepSeek AI:", err);
      setRecommendationsError(err.message);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const getRecommendedQuestions = async (skills) => {
    try {
      setRecommendationsError(null);

      const formatSkills = (skillsObj) => {
        let result = [];

        for (const category in skillsObj) {
          skillsObj[category].forEach((tag) => {
            result.push({
              category,
              tagName: tag.tagName,
              problemsSolved: tag.problemsSolved,
            });
          });
        }

        return result.sort((a, b) => a.problemsSolved - b.problemsSolved);
      };

      const formattedSkills = formatSkills(skills);

      const prompt = `I'm a LeetCode user with the following skill stats (sorted by least to most problems solved in each category):
${JSON.stringify(formattedSkills, null, 2)}

Based on my current skills and solved problems, suggest 50 LeetCode questions that would be beneficial for me to tackle next with the following distribution:
- 15 Easy questions
- 25 Medium questions
- 10 Hard questions

Focus on a balanced approach that addresses my weaker areas while reinforcing strengths.
Return ONLY a JSON array with each question containing title, difficulty, and topics. 
Make sure the response is valid JSON without any markdown formatting or extra text.
Example format:
[{"title": "Two Sum", "difficulty": "Easy", "topics": ["Array", "Hash Table"]}, ...]
`;

      const aiResponse = await callDeepSeekAI(prompt);

      if (!aiResponse) {
        // console.log("AI call failed, returning empty questions");
        return [];
      }

      try {
        let recommendedQuestions = [];
        if (
          typeof aiResponse === "object" &&
          aiResponse.choices &&
          aiResponse.choices[0] &&
          aiResponse.choices[0].message &&
          aiResponse.choices[0].message.content
        ) {
          const content = aiResponse.choices[0].message.content;
          console.log("Raw content from AI:", content);
          
          // Try to extract JSON from the content
          let jsonContent = "";
          
          // Case 1: Content is wrapped in code blocks
          if (content.includes("```json")) {
            jsonContent = content.split("```json")[1].split("```")[0].trim();
          } else if (content.includes("```")) {
            jsonContent = content.split("```")[1].split("```")[0].trim();
          }
          // Case 2: Content has direct JSON array
          else if (content.match(/^\s*\[.*\]\s*$/s)) {
            jsonContent = content.trim();
          }
          // Case 3: Extract JSON array from mixed content
          else if (content.includes("[") && content.includes("]")) {
            const match = content.match(/\[\s*\{[\s\S]*\}\s*\]/);
            if (match) {
              jsonContent = match[0];
            }
          }
          
          if (!jsonContent) {
            jsonContent = content;
          }
          
          try {
            recommendedQuestions = JSON.parse(jsonContent);
            console.log("Successfully parsed JSON:", recommendedQuestions);
          } catch (parseError) {
            console.error("Error parsing extracted JSON:", parseError);
            throw new Error("Failed to parse JSON from AI response: " + parseError.message);
          }
        } else {
          throw new Error("Unexpected AI response format");
        }
        
        if (!Array.isArray(recommendedQuestions) || recommendedQuestions.length === 0) {
          throw new Error("Could not parse a valid array of questions from the AI response");
        }
        
        const processedQuestions = recommendedQuestions.map((question, index) => ({
          id: String(index + 1),
          title: question.title,
          difficulty: question.difficulty || "Medium",
          topics: question.topics || [],
          url: `https://leetcode.com/problems/${question.title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]/g, "-")}/`,
        }));
        
        // Extract unique topics
        const topics = new Set();
        processedQuestions.forEach((q) => {
          q.topics.forEach((topic) => topics.add(topic));
        });

        setAvailableTopics([...topics].sort());
        setQuestions(processedQuestions);
        setFilteredQuestions(processedQuestions);

        return processedQuestions;
      } catch (jsonError) {
        console.error("Error parsing DeepSeek AI response:", jsonError);
        setRecommendationsError("Failed to parse DeepSeek AI response: " + jsonError.message);
        return [];
      }
    } catch (err) {
      console.error("Error getting recommendations:", err);
      setRecommendationsError(err.message);

      const emptyQuestions = [];
      setQuestions(emptyQuestions);
      setFilteredQuestions(emptyQuestions);
      setAvailableTopics([]);

      return emptyQuestions;
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        const cachedQuestions = localStorage.getItem("suggestedQuestions");
        const cachedTopics = localStorage.getItem("availableTopics");
        const cacheTimestamp = localStorage.getItem(
          "suggestedQuestionsTimestamp"
        );

        const isCacheValid =
          cacheTimestamp && Date.now() - parseInt(cacheTimestamp) < 259200000;

        if (cachedQuestions && cachedTopics && isCacheValid) {
          setQuestions(JSON.parse(cachedQuestions));
          setFilteredQuestions(JSON.parse(cachedQuestions));
          setAvailableTopics(JSON.parse(cachedTopics));
          setIsLoading(false);
          return;
        }

        const skills = await fetchUserSkills();
        if (skills) {
          const questionsData = await getRecommendedQuestions(skills);
          if (questionsData && questionsData.length > 0) {
            localStorage.setItem(
              "suggestedQuestions",
              JSON.stringify(questionsData)
            );
            localStorage.setItem(
              "availableTopics",
              JSON.stringify(
                [...new Set(questionsData.flatMap((q) => q.topics))].sort()
              )
            );
            localStorage.setItem(
              "suggestedQuestionsTimestamp",
              Date.now().toString()
            );
          }
        } else {
          setError("Unable to fetch user skills. Please try again later.");
        }
      } catch (err) {
        console.error("Error initializing data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  useEffect(() => {
    let result = [...questions];

    if (filters.difficulty.length > 0) {
      result = result.filter((q) => filters.difficulty.includes(q.difficulty));
    }

    if (filters.topics.length > 0) {
      result = result.filter((q) =>
        filters.topics.some((topic) => q.topics.includes(topic))
      );
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (q) =>
          q.title.toLowerCase().includes(query) ||
          q.topics.some((t) => t.toLowerCase().includes(query))
      );
    }

    setFilteredQuestions(result);
  }, [filters, questions]);

  const handleDifficultyChange = (difficulty) => {
    setFilters((prev) => {
      const newDifficulties = prev.difficulty.includes(difficulty)
        ? prev.difficulty.filter((d) => d !== difficulty)
        : [...prev.difficulty, difficulty];

      return { ...prev, difficulty: newDifficulties };
    });
  };

  const handleTopicChange = (topic) => {
    setFilters((prev) => {
      const newTopics = prev.topics.includes(topic)
        ? prev.topics.filter((t) => t !== topic)
        : [...prev.topics, topic];

      return { ...prev, topics: newTopics };
    });
  };

  const handleSearchChange = (e) => {
    setFilters((prev) => ({ ...prev, searchQuery: e.target.value }));
  };

  const clearAllFilters = () => {
    setFilters({
      difficulty: [],
      topics: [],
      searchQuery: "",
    });
  };

  const refreshQuestions = async () => {
    try {
      setIsLoading(true);

      localStorage.removeItem("suggestedQuestions");
      localStorage.removeItem("availableTopics");
      localStorage.removeItem("suggestedQuestionsTimestamp");

      const skills = await fetchUserSkills();
      if (skills) {
        const questionsData = await getRecommendedQuestions(skills);
        if (questionsData && questionsData.length > 0) {
          localStorage.setItem(
            "suggestedQuestions",
            JSON.stringify(questionsData)
          );
          localStorage.setItem(
            "availableTopics",
            JSON.stringify(
              [...new Set(questionsData.flatMap((q) => q.topics))].sort()
            )
          );
          localStorage.setItem(
            "suggestedQuestionsTimestamp",
            Date.now().toString()
          );
        }
      } else {
        const emptyQuestions = [];
        setQuestions(emptyQuestions);
        setFilteredQuestions(emptyQuestions);
        setError("Unable to fetch user skills. Please try again later.");
      }
    } catch (error) {
      console.error("Error refreshing questions:", error);
      setRecommendationsError("Failed to refresh questions: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingState isGenerating={isGenerating} />;
  }

  if (error && filteredQuestions.length === 0) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <HeaderBar
        title="Suggested Questions"
        subtitle="Personalized recommendations for your skill level"
      />

      {recommendationsError && (
        <div className="mb-4 sm:mb-6 text-xs sm:text-sm text-red-600 bg-red-50 p-2 sm:p-3 rounded-lg border border-red-200">
          <div className="font-medium">Error getting recommendations</div>
          <div>{recommendationsError}</div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 sm:gap-0">
        <div className="text-base sm:text-lg font-semibold text-gray-700">
          Recommended Practice Questions
        </div>
        <button
          onClick={refreshQuestions}
          disabled={isGenerating}
          className={`px-3 py-1 rounded flex items-center text-xs sm:text-sm ${
            isGenerating
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
          }`}
        >
          {isGenerating ? (
            <>
              <div className="animate-spin h-3 w-3 sm:h-4 sm:w-4 border-t-2 border-b-2 border-indigo-500 rounded-full mr-2"></div>
              Refreshing...
            </>
          ) : (
            <>
              <i className="fa-solid fa-rotate mr-1"></i> Refresh
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-4 sm:mt-6">
        <div className="md:col-span-1">
          <Filter
            filters={filters}
            availableTopics={availableTopics}
            handleDifficultyChange={handleDifficultyChange}
            handleTopicChange={handleTopicChange}
            handleSearchChange={handleSearchChange}
            clearAllFilters={clearAllFilters}
          />
        </div>

        <div className="md:col-span-2 lg:col-span-3">
          <Questions filteredQuestions={filteredQuestions} error={error} />
        </div>
      </div>
    </div>
  );
};

export default SuggestedQuestions;
