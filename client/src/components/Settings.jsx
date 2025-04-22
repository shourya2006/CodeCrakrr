import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  ChartBar,
  Code,
  ChefHat,
  Save,
  RefreshCw,
  BadgeCheck,
  AlertCircle,
  CheckCircle,
  Edit,
} from "lucide-react";

const PlatformInput = ({
  platform,
  value,
  onChange,
  error,
  isValid,
  isValidating,
}) => {
  const { id, label, icon: Icon, color, description, placeholder } = platform;

  return (
    <div
      className={`group bg-white rounded-xl p-6 transition-all duration-300 border border-gray-100 
                   hover:shadow-lg hover:shadow-${color}-100 hover:border-${color}-200 relative overflow-hidden`}
    >
      <div
        className={`absolute top-0 right-0 h-20 w-20 bg-gradient-to-br from-${color}-100/40 to-${color}-200/40 
                     rounded-bl-full opacity-0 group-hover:opacity-100 transition-all duration-500`}
      ></div>

      <div className="flex items-center mb-5">
        <div
          className={`bg-gradient-to-br from-${color}-500 to-${color}-700 p-3 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="ml-4">
          <label
            htmlFor={id}
            className="font-semibold text-gray-800 block mb-1 text-lg"
          >
            {label} <span className="text-red-500">*</span>
          </label>
          <span className="text-xs text-gray-500 font-medium">
            {description}
          </span>
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          required
          placeholder={placeholder}
          className={`w-full px-5 py-3 rounded-lg border ${
            error
              ? "border-red-300"
              : isValid
              ? "border-green-300"
              : "border-gray-200"
          } 
                   focus:ring-2 focus:ring-${
                     error ? "red" : isValid ? "green" : color
                   }-500 
                   focus:border-transparent outline-none transition-all text-gray-700 bg-gray-50 
                   group-hover:bg-white`}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {isValidating ? (
            <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
          ) : error ? (
            <AlertCircle className="h-5 w-5 text-red-500" />
          ) : isValid ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <BadgeCheck
              className={`h-5 w-5 text-gray-300 group-hover:text-${color}-500 transition-colors duration-300`}
            />
          )}
        </div>
      </div>

      {error && (
        <p className="mt-2 text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
};

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    codeforces: "",
    leetcode: "",
    codechef: "",
  });
  const [validation, setValidation] = useState({
    codeforces: { isValid: false, error: null, isValidating: false },
    leetcode: { isValid: false, error: null, isValidating: false },
    codechef: { isValid: false, error: null, isValidating: false },
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasData, setHasData] = useState(false);

  const timersRef = useRef({});

  useEffect(() => {
    const savedPlatformData = localStorage.getItem("platformSettings");
    if (savedPlatformData) {
      try {
        const parsedData = JSON.parse(savedPlatformData);
        setFormData(parsedData);

        const hasAnyData = Object.values(parsedData).some((value) => value);
        setHasData(hasAnyData);
        setIsEditMode(!hasAnyData);

        if (isEditMode) {
          Object.entries(parsedData).forEach(([platform, value]) => {
            if (value) {
              debounce(platform, value);
            }
          });
        }
      } catch (error) {
        console.error("Error loading saved platform settings:", error);
        setIsEditMode(true);
      }
    } else {
      setIsEditMode(true);
    }
  }, []);

  const platformInfo = {
    codeforces: { name: "Codeforces", icon: ChartBar, color: "purple" },
    leetcode: { name: "LeetCode", icon: Code, color: "orange" },
    codechef: { name: "CodeChef", icon: ChefHat, color: "teal" },
  };

  const platforms = [
    {
      id: "codeforces",
      label: "Codeforces Handle",
      icon: ChartBar,
      color: "purple",
      description: "Track your contest performances",
      placeholder: "Enter your Codeforces Handle",
      validate: async (handle) => {
        if (!handle) return { isValid: false, error: null };
        if (!/^[a-zA-Z0-9._-]{3,24}$/.test(handle)) {
          return {
            isValid: false,
            error: "Invalid handle format. Use 3-24 alphanumeric characters.",
          };
        }

        try {
          const response = await fetch(
            `https://codeforces.com/api/user.info?handles=${handle}`
          );
          const data = await response.json();

          if (data.status === "OK") {
            return { isValid: true, error: null };
          } else {
            return { isValid: false, error: "Handle not found on Codeforces." };
          }
        } catch (error) {
          console.error("Codeforces API error:", error);
          return {
            isValid: false,
            error: "Error connecting to Codeforces API. Please try again.",
          };
        }
      },
    },
    {
      id: "leetcode",
      label: "LeetCode Username",
      icon: Code,
      color: "orange",
      description: "Sync problems and submissions",
      placeholder: "Enter your LeetCode Username",
      validate: async (username) => {
        if (!username) return { isValid: false, error: null };
        if (!/^[a-zA-Z0-9_-]{3,25}$/.test(username)) {
          return {
            isValid: false,
            error:
              "Invalid username format. Use 3-25 alphanumeric characters, underscore or hyphen.",
          };
        }

        try {
          const response = await fetch(`http://localhost:3000/${username}`);
          const data = await response.json();
          if (
            data.errors &&
            data.errors.some(
              (error) => error.message === "That user does not exist."
            )
          ) {
            return { isValid: false, error: "Username not found on LeetCode." };
          } else if (!response.ok) {
            return {
              isValid: false,
              error: "Error validating LeetCode username.",
            };
          } else {
            return { isValid: true, error: null };
          }
        } catch (error) {
          console.error("LeetCode API error:", error);
          return {
            isValid: false,
            error: "Error connecting to LeetCode API. Please try again.",
          };
        }
      },
    },
    {
      id: "codechef",
      label: "CodeChef Username",
      icon: ChefHat,
      color: "teal",
      description: "Track ratings and contest history",
      placeholder: "Enter your CodeChef Username",
      validate: async (username) => {
        if (!username) return { isValid: false, error: null };

        if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
          return {
            isValid: false,
            error:
              "Invalid username format. Use 3-20 alphanumeric characters or underscore.",
          };
        }

        try {
          const response = await fetch(
            `https://codechef-api.vercel.app/handle/${username}`
          );
          const data = await response.json();

          if (data.success === true) {
            return { isValid: true, error: null };
          } else {
            return { isValid: false, error: "Username not found on CodeChef." };
          }
        } catch (error) {
          console.error("CodeChef API error:", error);
          return {
            isValid: false,
            error: "Error connecting to CodeChef API. Please try again.",
          };
        }
      },
    },
  ];

  const debounce = useCallback((id, value) => {
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
    }

    setValidation((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        error: null,
        isValid: false,
        isValidating: true,
      },
    }));

    timersRef.current[id] = setTimeout(async () => {
      const platform = platforms.find((p) => p.id === id);
      if (!platform) return;

      try {
        const result = await platform.validate(value);

        setValidation((prev) => ({
          ...prev,
          [id]: {
            isValid: result.isValid,
            error: result.error,
            isValidating: false,
          },
        }));
      } catch (err) {
        setValidation((prev) => ({
          ...prev,
          [id]: {
            isValid: false,
            error: `Error validating handle: ${
              err.message || "Please try again"
            }`,
            isValidating: false,
          },
        }));
      }
    }, 3000);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (!value) {
      if (timersRef.current[name]) {
        clearTimeout(timersRef.current[name]);
      }

      setValidation((prev) => ({
        ...prev,
        [name]: { isValid: false, error: null, isValidating: false },
      }));
      return;
    }

    debounce(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasErrors = Object.values(validation).some((v) => v.error);
    if (hasErrors) {
      alert("Please fix validation errors before saving.");
      return;
    }

    const emptyFields = Object.keys(formData).filter((key) => !formData[key]);
    if (emptyFields.length > 0) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      localStorage.setItem("platformSettings", JSON.stringify(formData));

      setTimeout(() => {
        setLoading(false);
        setSaved(true);
        setHasData(true);
        setIsEditMode(false);
        setTimeout(() => setSaved(false), 3000);
      }, 1000);
    } catch (error) {
      console.error("Error saving settings to localStorage:", error);
      alert("There was an error saving your settings. Please try again.");
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCancelClick = () => {
    const savedPlatformData = localStorage.getItem("platformSettings");

    if (savedPlatformData) {
      try {
        const parsedData = JSON.parse(savedPlatformData);
        setFormData(parsedData);
      } catch (error) {
        console.error("Error loading saved platform settings:", error);
      }
    }

    setIsEditMode(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
            Platform Settings
          </h1>
          <p className="text-gray-600 text-lg">
            Connect your competitive programming accounts to supercharge your
            coding journey
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4"></div>
        </div>

        {hasData && !isEditMode ? (
          <div>
            <div className="space-y-6">
              {Object.entries(formData)
                .filter(([, value]) => value)
                .map(([platform, handle]) => {
                  const { name, icon: Icon, color } = platformInfo[platform];
                  return (
                    <div
                      key={platform}
                      className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
                    >
                      <div className="flex items-center">
                        <div className={`bg-${color}-100 p-2 rounded-lg`}>
                          <Icon className={`h-5 w-5 text-${color}-600`} />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="font-medium text-gray-800">{name}</h3>
                          <p className="text-gray-600 text-sm font-mono mt-1">
                            {handle}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="mt-10 flex justify-end">
              <button
                onClick={handleEditClick}
                className="inline-flex items-center px-6 py-2.5 rounded-lg border border-blue-500 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Handles
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {platforms.map((platform) => (
                <PlatformInput
                  key={platform.id}
                  platform={platform}
                  value={formData[platform.id] || ""}
                  onChange={handleChange}
                  error={validation[platform.id]?.error}
                  isValid={validation[platform.id]?.isValid}
                  isValidating={validation[platform.id]?.isValidating}
                />
              ))}
            </div>

            <div className="mt-10 flex justify-end space-x-4">
              {hasData && (
                <button
                  type="button"
                  onClick={handleCancelClick}
                  className="inline-flex items-center px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className={`relative inline-flex items-center px-8 py-3 rounded-lg overflow-hidden cursor-pointer font-medium
                          bg-blue-600 hover:bg-blue-700
                          text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                          transition-all duration-300 transform hover:-translate-y-1 ${Object.values(validation).some(v => v.isValidating) ? 'opacity-70' : ''}`}
                disabled={loading || Object.values(validation).some(v => v.isValidating)}
              >
                <span className="absolute top-0 left-0 w-full h-full bg-white/10 opacity-0 hover:opacity-20 transition-opacity"></span>
                {loading ? (
                  <RefreshCw className="h-5 w-5 mr-3 animate-spin" />
                ) : saved ? (
                  <CheckCircle className="h-5 w-5 mr-3" />
                ) : (
                  <Save className="h-5 w-5 mr-3" />
                )}
                {loading ? "Saving..." : Object.values(validation).some(v => v.isValidating) ? "Validating..." : saved ? "Saved!" : "Save Settings"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Settings;
