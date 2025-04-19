import React, { useState, useRef } from 'react';

const RatingGraph = ({ ratingData }) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const svgRef = useRef(null);
  
  if (!ratingData || ratingData.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Rating Progress</h2>
        </div>
        <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No rating data available for this user</p>
        </div>
      </div>
    );
  }
  
  const sortedData = [...ratingData].sort((a, b) => {
    const dateA = new Date(`${a.getyear}-${a.getmonth}-${a.getday}`);
    const dateB = new Date(`${b.getyear}-${b.getmonth}-${b.getday}`);
    return dateA - dateB;
  });
  
  const width = 800;
  const height = 380;
  const padding = { top: 20, right: 30, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  const ratings = sortedData.map(d => parseInt(d.rating));
  const minRating = Math.floor(Math.min(...ratings) / 100) * 100;
  const maxRating = Math.ceil(Math.max(...ratings) / 100) * 100;
  
  const points = sortedData.map((d, i) => {
    const x = padding.left + (i * (chartWidth / (sortedData.length - 1 || 1)));
    const y = padding.top + chartHeight - ((parseInt(d.rating) - minRating) / (maxRating - minRating) * chartHeight);
    return { 
      x, 
      y, 
      data: {
        name: d.name,
        rating: parseInt(d.rating),
        rank: d.rank,
        formattedDate: `${d.getmonth}/${d.getday}/${d.getyear}`
      },
      index: i 
    };
  });
  
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    pathD += ` L ${points[i].x} ${points[i].y}`;
  }
  
  const handleMouseOver = (point) => {
    setHoveredPoint(point);
  };
  
  const handleMouseOut = () => {
    setHoveredPoint(null);
  };
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Rating Progress</h2>
        <div className="text-sm text-gray-500">Hover over points for details</div>
      </div>
      
      <div className="h-[400px] w-full overflow-hidden relative" ref={svgRef}>
        <div className="overflow-x-auto h-full">
          <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="mx-auto">
            {Array.from({ length: 6 }).map((_, i) => {
              const y = padding.top + i * (chartHeight / 5);
              const label = Math.round(maxRating - i * ((maxRating - minRating) / 5));
              return (
                <g key={i}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={width - padding.right}
                    y2={y}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                  <text
                    x={padding.left - 10}
                    y={y}
                    textAnchor="end"
                    dominantBaseline="middle"
                    fontSize="12"
                    fill="#6b7280"
                  >
                    {label}
                  </text>
                </g>
              );
            })}
            
            {sortedData.map((d, i) => {
              if (i % Math.ceil(sortedData.length / 5) === 0 || i === sortedData.length - 1) {
                const x = padding.left + (i * (chartWidth / (sortedData.length - 1 || 1)));
                const label = `${d.getmonth}/${d.getyear.slice(-2)}`;
                return (
                  <text
                    key={i}
                    x={x}
                    y={height - padding.bottom + 20}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#6b7280"
                  >
                    {label}
                  </text>
                );
              }
              return null;
            })}
            
            <path
              d={pathD}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            
            {points.map((point, i) => {
              const isHovered = hoveredPoint && hoveredPoint.index === i;
              return (
                <g key={i}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="12"
                    fill="transparent"
                    onMouseOver={() => handleMouseOver(point)}
                    onMouseOut={handleMouseOut}
                    style={{ cursor: 'pointer' }}
                  />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={isHovered ? "6" : "4"}
                    fill={isHovered ? "#2563eb" : "#3b82f6"}
                    stroke="#ffffff"
                    strokeWidth="2"
                    onMouseOver={() => handleMouseOver(point)}
                    onMouseOut={handleMouseOut}
                    style={{ cursor: 'pointer', transition: 'r 0.2s' }}
                  />
                </g>
              );
            })}
            
            {hoveredPoint && (
              <g>
                <line
                  x1={hoveredPoint.x}
                  y1={hoveredPoint.y}
                  x2={hoveredPoint.x}
                  y2={padding.top + chartHeight}
                  stroke="#9ca3af"
                  strokeWidth="1"
                  strokeDasharray="4"
                />
                <line
                  x1={padding.left}
                  y1={hoveredPoint.y}
                  x2={hoveredPoint.x}
                  y2={hoveredPoint.y}
                  stroke="#9ca3af"
                  strokeWidth="1"
                  strokeDasharray="4"
                />
                
                <rect
                  x={hoveredPoint.x + (hoveredPoint.x > width - 200 ? -190 : 10)}
                  y={hoveredPoint.y < 90 ? hoveredPoint.y + 10 : hoveredPoint.y - 70}
                  width="180"
                  height="80"
                  rx="4"
                  fill="rgba(255, 255, 255, 0.95)"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
                
                <text 
                  x={hoveredPoint.x + (hoveredPoint.x > width - 200 ? -180 : 20)} 
                  y={hoveredPoint.y < 90 ? hoveredPoint.y + 35 : hoveredPoint.y - 45} 
                  fontSize="12" 
                  fill="#111827" 
                  fontWeight="bold">
                  {hoveredPoint.data.name}
                </text>
                <text 
                  x={hoveredPoint.x + (hoveredPoint.x > width - 200 ? -180 : 20)} 
                  y={hoveredPoint.y < 90 ? hoveredPoint.y + 55 : hoveredPoint.y - 25} 
                  fontSize="12" 
                  fill="#4b5563">
                  Date: {hoveredPoint.data.formattedDate}
                </text>
                <text 
                  x={hoveredPoint.x + (hoveredPoint.x > width - 200 ? -180 : 20)} 
                  y={hoveredPoint.y < 90 ? hoveredPoint.y + 75 : hoveredPoint.y - 5} 
                  fontSize="12" 
                  fill="#4b5563">
                  Rating: {hoveredPoint.data.rating}
                </text>
                <text 
                  x={hoveredPoint.x + (hoveredPoint.x > width - 200 ? -180 : 20)} 
                  y={hoveredPoint.y < 90 ? hoveredPoint.y + 95 : hoveredPoint.y + 15} 
                  fontSize="12" 
                  fill="#4b5563">
                  Rank: {hoveredPoint.data.rank}
                </text>
              </g>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default RatingGraph; 