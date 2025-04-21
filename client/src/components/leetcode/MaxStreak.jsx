import React from "react";

const MaxStreak = ({ submissionCalendar, isCompact = false }) => {
  const calculateMaxStreak = () => {
    if (!submissionCalendar) {
      return { currentStreak: 0, maxStreak: 0 };
    }

    const calendar =
      typeof submissionCalendar === "string"
        ? JSON.parse(submissionCalendar)
        : submissionCalendar;

    const submissions = Object.entries(calendar)
      .map(([timestamp, count]) => ({
        date: new Date(parseInt(timestamp) * 1000),
        count,
      }))
      .sort((a, b) => a.date - b.date);

    if (submissions.length === 0) {
      return { currentStreak: 0, maxStreak: 0 };
    }

    let maxStreak = 0;
    let currentStreak = 0;
    let previousDate = null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    submissions.forEach(({ date, count }) => {
      date.setHours(0, 0, 0, 0);

      if (count > 0) {
        if (!previousDate) {
          currentStreak = 1;
        } else {
          const dayDiff = Math.floor(
            (date - previousDate) / (1000 * 60 * 60 * 24)
          );

          if (dayDiff === 1) {
            currentStreak++;
          } else if (dayDiff > 1) {
            currentStreak = 1;
          }
        }

        maxStreak = Math.max(maxStreak, currentStreak);
        previousDate = new Date(date);
      }
    });

    let activeStreak = 0;
    if (previousDate) {
      const daysSinceLastSubmission = Math.floor(
        (today - previousDate) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceLastSubmission <= 1) {
        activeStreak = currentStreak;
      }
    }

    return { currentStreak: activeStreak, maxStreak };
  };

  const { currentStreak, maxStreak } = calculateMaxStreak();

  if (isCompact) {
    return maxStreak.toString();
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Coding Streaks</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200">
          <div className="text-amber-800 text-xs uppercase font-semibold mb-1">
            Max Streak
          </div>
          <div className="flex items-center">
            <div className="text-3xl font-bold text-amber-700">{maxStreak}</div>
            <div className="ml-2 text-amber-600">
              <i className="fa-solid fa-fire text-2xl"></i>
            </div>
          </div>
          <div className="text-xs text-amber-600 mt-1">days in a row</div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-lg border border-emerald-200">
          <div className="text-emerald-800 text-xs uppercase font-semibold mb-1">
            Current Streak
          </div>
          <div className="flex items-center">
            <div className="text-3xl font-bold text-emerald-700">
              {currentStreak}
            </div>
            <div className="ml-2 text-emerald-600">
              <i className="fa-solid fa-calendar-check text-2xl"></i>
            </div>
          </div>
          <div className="text-xs text-emerald-600 mt-1">active days</div>
        </div>
      </div>
    </div>
  );
};

export default MaxStreak;