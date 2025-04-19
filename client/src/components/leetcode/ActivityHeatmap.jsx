import React, { useState } from "react";

const ActivityHeatmap = ({ submissionCalendar, monthLabels }) => {
  const [hoveredCell, setHoveredCell] = useState(null);

  const createHeatmapGrid = () => {
    const grid = Array(26)
      .fill()
      .map(() => Array(7).fill(0));
    const rawCounts = Array(26)
      .fill()
      .map(() => Array(7).fill(0));

    if (!submissionCalendar) {
      return { grid, rawCounts };
    }

    const today = new Date();
    const calendar =
      typeof submissionCalendar === "string"
        ? JSON.parse(submissionCalendar)
        : submissionCalendar;

    Object.entries(calendar).forEach(([timestamp, count]) => {
      try {
        const date = new Date(parseInt(timestamp) * 1000);
        const diffDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));

        if (diffDays >= 0 && diffDays < 182) {
          const weekIndex = Math.floor(diffDays / 7);
          const dayIndex = date.getDay();

          if (weekIndex < 26) {
            rawCounts[weekIndex][dayIndex] = count;
          }
        }
      } catch (error) {
        console.error(
          "Error processing date from timestamp:",
          timestamp,
          error
        );
      }
    });

    const allValues = rawCounts.flat().filter((val) => val > 0);
    if (allValues.length === 0) return { grid, rawCounts };

    const maxValue = Math.max(...allValues);

    for (let w = 0; w < 26; w++) {
      for (let d = 0; d < 7; d++) {
        if (rawCounts[w][d] > 0) {
          grid[w][d] = Math.min(4, Math.ceil((rawCounts[w][d] / maxValue) * 4));
        }
      }
    }

    return { grid, rawCounts };
  };

  const { grid, rawCounts } = createHeatmapGrid();

  const renderMonthLabels = () => {
    if (!monthLabels || !Array.isArray(monthLabels)) return null;

    return (
      <div className="flex text-xs text-gray-500 mt-1 mb-2">
        {monthLabels.map((month, i) => (
          <div
            key={i}
            className="flex-grow"
            style={{
              marginLeft: i === 0 ? "20px" : "0",
              width: `${100 / 6}%`,
              textAlign: "left",
            }}
          >
            {month}
          </div>
        ))}
      </div>
    );
  };

  const formatDate = (week, day) => {
    const today = new Date();
    const daysAgo = week * 7 + day;
    const date = new Date(today);
    date.setDate(today.getDate() - daysAgo);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleMouseEnter = (weekIndex, dayIndex) => {
    setHoveredCell({ weekIndex, dayIndex });
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Activity Heatmap</h2>
        <div className="flex space-x-1.5 items-center">
          <div className="text-sm text-gray-600 mr-2">Less</div>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-3.5 h-3.5 rounded-sm ${
                level === 0
                  ? "bg-gray-100 border border-gray-200"
                  : level === 1
                  ? "bg-green-200"
                  : level === 2
                  ? "bg-green-300"
                  : level === 3
                  ? "bg-green-500"
                  : "bg-green-700"
              }`}
            ></div>
          ))}
          <div className="text-sm text-gray-600 ml-2">More</div>
        </div>
      </div>

      {renderMonthLabels()}

      <div className="w-full overflow-hidden relative">
        <div className="flex">
          <div className="flex flex-col justify-between text-xs text-gray-500 mr-2 h-[126px]">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          <div className="flex-grow grid grid-cols-26 gap-1">
            {grid.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-4 h-4 rounded-sm ${
                      day === 0
                        ? "bg-gray-100 border border-gray-200"
                        : day === 1
                        ? "bg-green-200"
                        : day === 2
                        ? "bg-green-300"
                        : day === 3
                        ? "bg-green-500"
                        : "bg-green-700"
                    } transition-transform hover:scale-125 cursor-pointer`}
                    title={`${formatDate(weekIndex, dayIndex)}: ${
                      rawCounts[weekIndex][dayIndex]
                    } submissions done`}
                    onMouseEnter={() => handleMouseEnter(weekIndex, dayIndex)}
                    onMouseLeave={handleMouseLeave}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {hoveredCell && (
          <div
            className="absolute bg-white p-2 rounded-md shadow-lg border border-gray-200 z-10 text-xs"
            style={{
              top: `${hoveredCell.dayIndex * 20 + 42}px`,
              left: `${hoveredCell.weekIndex * 20 + 85}px`,
              transform: "translate(-50%, -120%)",
              pointerEvents: "none",
              minWidth: "140px",
            }}
          >
            <div className="font-bold text-gray-800">
              {formatDate(hoveredCell.weekIndex, hoveredCell.dayIndex)}
            </div>
            <div className="mt-1 text-gray-600">
              {rawCounts[hoveredCell.weekIndex][hoveredCell.dayIndex] || 0}{" "}
              submissions done
            </div>
            {rawCounts[hoveredCell.weekIndex][hoveredCell.dayIndex] > 0 && (
              <div className="mt-1 text-green-600 font-medium">
                Activity level:{" "}
                {grid[hoveredCell.weekIndex][hoveredCell.dayIndex]}/4
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityHeatmap;
